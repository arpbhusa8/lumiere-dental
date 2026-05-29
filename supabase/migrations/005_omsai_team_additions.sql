-- Om Sai team additions
-- Adds Dr. Priyesh Kamat (Dental Surgeon) to the bookable practitioner roster.
-- Facts sourced from the #om-sai-dental Slack channel and sanctioned by the client.
-- Renuka Rai (Office Assistant) is intentionally NOT added here — she is non-clinical
-- and not bookable; she is rendered on /team from src/lib/team.ts only.
--
-- Idempotency note: migrations in this project are applied in numeric order and are not
-- generally idempotent, but this insert is guarded with ON CONFLICT so a re-run is safe.
-- Photo is served from public/team/dr-priyesh-kamat.png once the file is added; the
-- column simply stores the path.

begin;

insert into public.practitioners (slug, name, credentials, bio, photo_url, is_active, sort_order)
values (
  'dr-priyesh-kamat',
  'Dr. Priyesh Kamat',
  'BDS (BPKIHS) · Dental Surgeon · NMC No. 43429',
  'Dr. Priyesh Kamat is a dental surgeon at Om Sai Dental Implant Center. He holds a Bachelor of Dental Surgery (BDS) from the B.P. Koirala Institute of Health Sciences (BPKIHS) in Dharan and is registered with the Nepal Medical Council (NMC No. 43429).',
  '/team/dr-priyesh-kamat.png',
  true,
  2
)
on conflict (slug) do update set
  name = excluded.name,
  credentials = excluded.credentials,
  bio = excluded.bio,
  photo_url = excluded.photo_url,
  is_active = excluded.is_active,
  sort_order = excluded.sort_order;

commit;
