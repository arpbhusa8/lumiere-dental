-- SECURITY DEFINER RPC: lets anonymous patients book without tripping the
-- appointments RLS check (which keeps direct INSERTs locked down).
create or replace function public.create_appointment(
  p_service_id uuid,
  p_practitioner_id uuid,
  p_starts_at timestamptz,
  p_duration_minutes int,
  p_patient_name text,
  p_patient_email text,
  p_patient_phone text,
  p_patient_type text,
  p_notes text
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_uid uuid := auth.uid();
begin
  if p_patient_type not in ('new','returning') then
    raise exception 'invalid patient_type';
  end if;

  insert into public.appointments (
    patient_id, service_id, practitioner_id,
    starts_at, ends_at,
    patient_name, patient_email, patient_phone, patient_type, notes
  ) values (
    v_uid, p_service_id, p_practitioner_id,
    p_starts_at, p_starts_at + (p_duration_minutes || ' minutes')::interval,
    p_patient_name, p_patient_email, p_patient_phone, p_patient_type, p_notes
  ) returning id into v_id;

  return v_id;
end $$;

revoke all on function public.create_appointment(uuid,uuid,timestamptz,int,text,text,text,text,text) from public;
grant execute on function public.create_appointment(uuid,uuid,timestamptz,int,text,text,text,text,text) to anon, authenticated;

notify pgrst, 'reload schema';
