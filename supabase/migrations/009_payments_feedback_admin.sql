-- 009: payment status on appointments + feedback system + admin/customer
-- mutation RPCs + a customer-update guard trigger.
--
-- Builds on 006 (is_admin, roles, codejatraa@ = admin) and 007 (admin RLS on
-- appointments). Security model mirrors create_appointment (003): all writes go
-- through SECURITY DEFINER RPCs; we do NOT hand out broad table INSERT/UPDATE
-- grants (that was the 008 bug). A trigger hard-stops customers from editing
-- privileged columns even via the self-update policy.

-- ---------------------------------------------------------------------------
-- 1. payment_status on appointments (manual flag — clinic marks paid)
-- ---------------------------------------------------------------------------
alter table public.appointments
  add column if not exists payment_status text not null default 'unpaid'
  check (payment_status in ('unpaid', 'paid', 'refunded'));

create index if not exists appointments_payment_status_idx
  on public.appointments(payment_status);

-- ---------------------------------------------------------------------------
-- 2. Guard customer self-updates. The "appts self update" policy (001) lets a
-- customer update their own row; without column control they could mark
-- themselves paid / confirmed. This BEFORE UPDATE trigger blocks any non-admin
-- from touching privileged columns and limits status changes to cancellation.
-- Admins (is_admin()) pass through. (Closes the looseness 007 deferred.)
-- ---------------------------------------------------------------------------
create or replace function public.guard_appointment_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if public.is_admin() then
    return new;
  end if;
  -- Non-admin (customer) path: the ONLY change permitted on one's own row is
  -- cancelling. Allowlist by resetting every other column back to its old value
  -- (so adding a new column later defaults to locked-unless-explicitly-allowed
  -- once it is added here). updated_at is left for set_updated_at().
  if new.status is distinct from old.status and new.status <> 'cancelled' then
    raise exception 'customers may only cancel an appointment';
  end if;
  new.payment_status  := old.payment_status;
  new.patient_id      := old.patient_id;
  new.service_id      := old.service_id;
  new.practitioner_id := old.practitioner_id;
  new.starts_at       := old.starts_at;
  new.ends_at         := old.ends_at;
  new.patient_name    := old.patient_name;
  new.patient_email   := old.patient_email;
  new.patient_phone   := old.patient_phone;
  new.patient_type    := old.patient_type;
  new.notes           := old.notes;
  new.created_at      := old.created_at;
  return new;
end;
$$;

drop trigger if exists trg_appts_guard on public.appointments;
create trigger trg_appts_guard
  before update on public.appointments
  for each row execute function public.guard_appointment_update();

-- ---------------------------------------------------------------------------
-- 3. feedback table
-- ---------------------------------------------------------------------------
create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  appointment_id uuid references public.appointments(id) on delete set null,
  patient_id uuid references auth.users(id) on delete set null,
  patient_name text,
  patient_email text,
  rating int not null check (rating between 1 and 5),
  comment text,
  is_public boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists feedback_created_idx on public.feedback(created_at desc);
create index if not exists feedback_public_idx on public.feedback(is_public) where is_public;
create index if not exists feedback_patient_idx on public.feedback(patient_id);
-- One review per (appointment, patient). General feedback (no appointment) is
-- unconstrained. Enforced in the DB so the UI guard can't be bypassed via the API.
create unique index if not exists feedback_one_per_appt
  on public.feedback(appointment_id, patient_id) where appointment_id is not null;

alter table public.feedback enable row level security;

-- Reads: a customer sees their OWN feedback; an admin sees all. Feedback rows
-- carry PII (patient_name + patient_email), so they are NEVER exposed to anon —
-- `is_public` is only an admin-side "approved for testimonial" marker. To show a
-- testimonial publicly, an admin copies a first-name-only quote into the
-- existing `public.testimonials` table (001), which is the public, PII-free
-- store. (Avoids the read-side analogue of the 008 anon-exposure bug.)
drop policy if exists "feedback self read" on public.feedback;
create policy "feedback self read" on public.feedback
  for select using (auth.uid() = patient_id);

drop policy if exists "feedback admin read" on public.feedback;
create policy "feedback admin read" on public.feedback
  for select using (public.is_admin());

-- Explicitly ensure no lingering public-read policy exposes PII to anon.
drop policy if exists "feedback public read" on public.feedback;

-- No INSERT/UPDATE grants or policies (writes go through SECURITY DEFINER RPCs).
-- SELECT only to authenticated; the self/admin RLS policies above gate rows.
-- Supabase's default privileges auto-grant new public tables to anon, so revoke
-- ALL from anon (not just select) — feedback carries PII and must be invisible
-- to the anon/publishable key.
revoke all on public.feedback from anon;
grant select on public.feedback to authenticated;

-- ---------------------------------------------------------------------------
-- 4. RPCs (sole write paths)
-- ---------------------------------------------------------------------------

-- Customer submits feedback (must be logged in; appointment must be theirs).
create or replace function public.submit_feedback(
  p_appointment_id uuid,
  p_rating int,
  p_comment text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_name text;
  v_email text;
  v_id uuid;
begin
  if v_uid is null then
    raise exception 'must be logged in to leave feedback';
  end if;
  if p_rating is null or p_rating < 1 or p_rating > 5 then
    raise exception 'rating must be between 1 and 5';
  end if;
  if p_appointment_id is not null
     and not exists (select 1 from public.appointments
                     where id = p_appointment_id and patient_id = v_uid) then
    raise exception 'appointment not found';
  end if;
  select full_name into v_name from public.patient_profiles where id = v_uid;
  select email into v_email from auth.users where id = v_uid;
  insert into public.feedback
    (appointment_id, patient_id, patient_name, patient_email, rating, comment)
  values
    (p_appointment_id, v_uid, v_name, v_email, p_rating, nullif(btrim(p_comment), ''))
  on conflict (appointment_id, patient_id) where appointment_id is not null
    do nothing
  returning id into v_id;
  if v_id is null then
    raise exception 'you have already left feedback for this appointment';
  end if;
  return v_id;
end;
$$;

-- Admin marks an appointment paid/unpaid/refunded.
create or replace function public.admin_set_payment_status(
  p_appointment_id uuid,
  p_status text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  if p_status not in ('unpaid', 'paid', 'refunded') then
    raise exception 'invalid payment status';
  end if;
  update public.appointments set payment_status = p_status where id = p_appointment_id;
end;
$$;

-- Admin moves an appointment through its lifecycle.
create or replace function public.admin_set_appointment_status(
  p_appointment_id uuid,
  p_status text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  if p_status not in ('pending','confirmed','completed','cancelled','no_show') then
    raise exception 'invalid status';
  end if;
  update public.appointments set status = p_status where id = p_appointment_id;
end;
$$;

-- Admin toggles whether a piece of feedback may be shown publicly.
create or replace function public.admin_set_feedback_public(
  p_feedback_id uuid,
  p_public boolean
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then raise exception 'not authorized'; end if;
  update public.feedback set is_public = coalesce(p_public, false) where id = p_feedback_id;
end;
$$;

-- ---------------------------------------------------------------------------
-- 5. Grants — execute only; lock the functions down from PUBLIC first.
-- ---------------------------------------------------------------------------
revoke all on function public.submit_feedback(uuid, int, text) from public;
revoke all on function public.admin_set_payment_status(uuid, text) from public;
revoke all on function public.admin_set_appointment_status(uuid, text) from public;
revoke all on function public.admin_set_feedback_public(uuid, boolean) from public;

grant execute on function public.submit_feedback(uuid, int, text) to authenticated;
grant execute on function public.admin_set_payment_status(uuid, text) to authenticated;
grant execute on function public.admin_set_appointment_status(uuid, text) to authenticated;
grant execute on function public.admin_set_feedback_public(uuid, boolean) to authenticated;

notify pgrst, 'reload schema';
