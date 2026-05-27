-- Grant anon and authenticated the minimum privileges to read public data and create bookings.
grant select on public.services to anon, authenticated;
grant select on public.practitioners to anon, authenticated;
grant select on public.testimonials to anon, authenticated;
grant insert on public.appointments to anon, authenticated;
grant select, update on public.appointments to authenticated;
grant select, insert, update on public.patient_profiles to authenticated;

-- Explicitly target the insert policy at anon + authenticated.
drop policy if exists "appts anyone insert" on public.appointments;
create policy "appts anyone insert" on public.appointments
  for insert
  to anon, authenticated
  with check (true);
