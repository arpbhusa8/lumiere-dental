-- 008: Lock down direct INSERT on appointments.
--
-- SECURITY FIX. Migrations 001/002 left appointments writable directly through
-- PostgREST: `grant insert ... to anon, authenticated` plus the policy
-- "appts anyone insert" with check (true). Because the browser ships the
-- publishable (anon) key, anyone could POST /rest/v1/appointments with arbitrary
-- columns — forging patient_id onto a victim's /dashboard, setting arbitrary
-- status/times, or flooding the clinic schedule — bypassing every invariant the
-- create_appointment RPC was meant to enforce.
--
-- The create_appointment RPC (003) is SECURITY DEFINER and runs as its owner, so
-- it is unaffected by table grants/RLS. Removing the direct write path leaves the
-- RPC as the ONLY way to insert an appointment. Booking keeps working unchanged.
--
-- Note: RLS only takes effect once a table-level grant exists; revoking the INSERT
-- grant closes the PostgREST write path entirely, so dropping the policy is belt
-- and suspenders. SELECT/UPDATE grants for authenticated patients are untouched
-- (dashboard read + future self-service cancel still work, gated by their own
-- self/admin RLS policies).

revoke insert on public.appointments from anon, authenticated;

drop policy if exists "appts anyone insert" on public.appointments;

notify pgrst, 'reload schema';
