-- 007: admin access to appointments for the /admin dashboard
--
-- Builds on what 001 already provides:
--   * appointments.patient_id = auth.uid() (set by create_appointment), so a
--     logged-in customer's bookings are already linked — NO new column needed.
--   * "appts self select" / "appts self update" already scope a customer to
--     their own rows; "appts anyone insert" + the SECURITY DEFINER RPC keep
--     guest booking working untouched.
--
-- This migration only ADDS admin-wide visibility/control. PostgreSQL combines
-- multiple permissive policies with OR, so these sit alongside the self
-- policies: a customer still sees only their rows; an admin sees all.
--
-- Status stays the existing CHECK set (pending/confirmed/completed/cancelled/
-- no_show) — no new status value is introduced. Customer-initiated
-- cancellation reuses the existing "appts self update" policy (status ->
-- 'cancelled'); tightening that to status-only is tracked for Phase 5.
--
-- Apply AFTER 006 (needs is_admin()).

-- Admin can read every appointment.
drop policy if exists "appointments admin read" on public.appointments;
create policy "appointments admin read"
  on public.appointments for select
  using (public.is_admin());

-- Admin can update any appointment (confirm / complete / cancel / notes).
drop policy if exists "appointments admin update" on public.appointments;
create policy "appointments admin update"
  on public.appointments for update
  using (public.is_admin())
  with check (public.is_admin());

-- select/update on appointments are already granted to authenticated (002);
-- RLS above is what actually gates row visibility. Reload PostgREST cache.
notify pgrst, 'reload schema';
