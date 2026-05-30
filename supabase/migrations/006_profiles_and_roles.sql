-- 006: customer/admin roles on the EXISTING patient_profiles table
-- Foundation for the customer portal (/account) and admin dashboard (/admin).
--
-- IMPORTANT: this project already has (from 001):
--   * public.patient_profiles (id -> auth.users, full_name, phone, dob, notes)
--   * public.appointments with patient_id = auth.uid() (set by create_appointment),
--     plus self-RLS ("appts self select/update") and anon insert.
-- So we do NOT add a new profiles table or a user_id column — we extend what exists.
--
-- This migration adds:
--   * user_role enum (customer | admin)
--   * patient_profiles.role
--   * is_admin() SECURITY DEFINER helper (used by admin RLS in 007)
--   * handle_new_user() trigger to auto-provision a patient_profiles row on signup
--   * admin_set_role() — the only sanctioned way to change a role
--   * backfill for existing auth users + seed of the initial admin
--
-- Self-escalation is blocked: UPDATE on the role column is revoked from
-- `authenticated`, so role only changes through admin_set_role().
--
-- Apply AFTER 005. Guard clauses make a re-run reasonably safe.

-- ---------------------------------------------------------------------------
-- Role enum
-- ---------------------------------------------------------------------------
do $$
begin
  if not exists (select 1 from pg_type where typname = 'user_role') then
    create type public.user_role as enum ('customer', 'admin');
  end if;
end$$;

-- ---------------------------------------------------------------------------
-- role column on the existing patient_profiles
-- ---------------------------------------------------------------------------
alter table public.patient_profiles
  add column if not exists role public.user_role not null default 'customer';

-- ---------------------------------------------------------------------------
-- is_admin() — SECURITY DEFINER so it bypasses patient_profiles' own RLS
-- (which only exposes the caller's own row) when policies check the role.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.patient_profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Admin read of patient_profiles (customers' contact details for the
-- dashboard). Self read/insert/update policies already exist from 001.
-- ---------------------------------------------------------------------------
drop policy if exists "patient_profiles admin read" on public.patient_profiles;
create policy "patient_profiles admin read"
  on public.patient_profiles for select
  using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Auto-provision a patient_profiles row on signup. First admin by allowlisted
-- email; everyone else defaults to customer.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.patient_profiles (id, full_name, role)
  values (
    new.id,
    nullif(new.raw_user_meta_data->>'full_name', ''),
    case when lower(new.email) = 'codejatraa@gmail.com'
         then 'admin'::public.user_role
         else 'customer'::public.user_role end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------------------
-- admin_set_role() — only an admin may change anyone's role. Sole sanctioned
-- path for role mutation (self UPDATE on role is revoked below).
-- ---------------------------------------------------------------------------
create or replace function public.admin_set_role(target uuid, new_role public.user_role)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'not authorized';
  end if;
  update public.patient_profiles set role = new_role where id = target;
end;
$$;

-- ---------------------------------------------------------------------------
-- Backfill existing auth users + seed the initial admin
-- ---------------------------------------------------------------------------
insert into public.patient_profiles (id, role)
select u.id,
       case when lower(u.email) = 'codejatraa@gmail.com'
            then 'admin'::public.user_role
            else 'customer'::public.user_role end
from auth.users u
on conflict (id) do nothing;

update public.patient_profiles p
  set role = 'admin'
from auth.users u
where u.id = p.id and lower(u.email) = 'codejatraa@gmail.com';

-- ---------------------------------------------------------------------------
-- Grants. patient_profiles already had select/insert/update granted to
-- authenticated (002). Revoke role-column writes so customers can't self-
-- escalate; everything else (full_name/phone/etc.) stays self-editable.
-- ---------------------------------------------------------------------------
revoke update (role) on public.patient_profiles from authenticated;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.admin_set_role(uuid, public.user_role) to authenticated;
