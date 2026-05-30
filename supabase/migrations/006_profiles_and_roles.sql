-- 006: customer profiles + admin roles
-- Foundation for the customer portal (/account) and admin dashboard (/admin).
--
-- Adds:
--   * user_role enum (customer | admin)
--   * profiles table linked 1:1 to auth.users
--   * is_admin() SECURITY DEFINER helper used by RLS policies elsewhere
--   * auto-provisioning trigger that creates a profile on signup
--   * admin_set_role() — the ONLY way to change a role (admin-gated)
--   * backfill for existing auth users + seed of the initial admin
--
-- Security model:
--   * Self-escalation is impossible: customers can update full_name/phone ONLY
--     (column grant), never role. Role changes go through admin_set_role().
--   * Apply AFTER 005. Not idempotent beyond the guards written here.

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
-- profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text not null,
  full_name   text,
  phone       text,
  role        public.user_role not null default 'customer',
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- ---------------------------------------------------------------------------
-- is_admin() — SECURITY DEFINER so policies can check role without recursing
-- through profiles' own RLS.
-- ---------------------------------------------------------------------------
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- RLS policies
--   read:   self or admin
--   update: self (column-restricted to full_name/phone via grant below)
--   insert: none — rows are created by the SECURITY DEFINER trigger only
-- ---------------------------------------------------------------------------
create policy "profiles self or admin read"
  on public.profiles for select
  using (id = auth.uid() or public.is_admin());

create policy "profiles self update"
  on public.profiles for update
  using (id = auth.uid())
  with check (id = auth.uid());

-- ---------------------------------------------------------------------------
-- Auto-provision a profile on signup. First admin is granted by allowlisted
-- email; everyone else defaults to customer.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    new.email,
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
-- updated_at touch
-- ---------------------------------------------------------------------------
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- admin_set_role() — only an admin may change anyone's role. This is the sole
-- sanctioned path for role mutation (the self update policy can't touch role).
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
  update public.profiles set role = new_role where id = target;
end;
$$;

-- ---------------------------------------------------------------------------
-- Backfill existing auth users + seed initial admin
-- ---------------------------------------------------------------------------
insert into public.profiles (id, email, role)
select u.id,
       u.email,
       case when lower(u.email) = 'codejatraa@gmail.com'
            then 'admin'::public.user_role
            else 'customer'::public.user_role end
from auth.users u
on conflict (id) do nothing;

update public.profiles
  set role = 'admin'
  where lower(email) = 'codejatraa@gmail.com';

-- ---------------------------------------------------------------------------
-- Grants (RLS still applies). Customers may update only full_name/phone.
-- ---------------------------------------------------------------------------
grant select on public.profiles to authenticated;
grant update (full_name, phone) on public.profiles to authenticated;
grant execute on function public.is_admin() to authenticated, anon;
grant execute on function public.admin_set_role(uuid, public.user_role) to authenticated;
