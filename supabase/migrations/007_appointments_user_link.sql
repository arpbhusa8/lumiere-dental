-- 007: link appointments to customer accounts + RLS for portal & admin
--
-- Guests still book exactly as before: the create_appointment RPC (003,
-- SECURITY DEFINER) inserts rows with user_id = null. Logged-in customers get
-- user_id attached in the booking server action (Phase 3) — the RPC change is
-- deliberately NOT in this migration so guest booking is untouched here.
--
-- Adds:
--   * appointments.user_id (nullable FK; existing guest rows stay null)
--   * indexes for the admin dashboard filters
--   * RLS: owner/admin read, admin-only write
--   * request_cancellation() — the only customer-facing write, ownership-gated
--
-- Apply AFTER 006 (needs is_admin()).

-- ---------------------------------------------------------------------------
-- Column + indexes
-- ---------------------------------------------------------------------------
alter table public.appointments
  add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists appointments_user_id_idx        on public.appointments(user_id);
create index if not exists appointments_status_idx         on public.appointments(status);
create index if not exists appointments_preferred_date_idx on public.appointments(preferred_date);

-- ---------------------------------------------------------------------------
-- RLS
--   read:   a customer sees their own rows; an admin sees everything.
--   update: admins only (status / notes from the dashboard). Customers never
--           UPDATE directly — see request_cancellation() below.
--   insert: still none — guest + customer inserts flow through the RPC.
-- ---------------------------------------------------------------------------
create policy "appointments owner or admin read"
  on public.appointments for select
  using (user_id = auth.uid() or public.is_admin());

create policy "appointments admin update"
  on public.appointments for update
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- request_cancellation() — a customer flags their OWN appointment for
-- cancellation. SECURITY DEFINER + explicit ownership check so we don't have
-- to grant customers a direct UPDATE policy (which would let them edit other
-- columns). Admin then confirms/cancels from the dashboard.
-- ---------------------------------------------------------------------------
create or replace function public.request_cancellation(appointment uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  owner uuid;
begin
  select user_id into owner from public.appointments where id = appointment;
  if owner is null or owner <> auth.uid() then
    raise exception 'not authorized';
  end if;
  update public.appointments
    set status = 'cancellation_requested'
    where id = appointment and status in ('pending', 'confirmed');
end;
$$;

-- ---------------------------------------------------------------------------
-- Grants (RLS still applies; only admins satisfy the update policy)
-- ---------------------------------------------------------------------------
grant select, update on public.appointments to authenticated;
grant execute on function public.request_cancellation(uuid) to authenticated;
