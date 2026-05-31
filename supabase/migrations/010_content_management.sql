-- 010: admin-managed content — journal posts, promotions, FAQs.
--
-- Security pattern: each table has a PUBLIC read policy (only published/active
-- rows) and an ADMIN-ONLY write policy (is_admin() from 006). No PII in any of
-- these tables. anon is write-locked (Supabase default privileges auto-grant new
-- public tables to anon, so we revoke ALL from anon then re-grant SELECT only).
-- authenticated keeps write grants, but the admin RLS policy is the real gate —
-- a non-admin authenticated user fails is_admin() and cannot write.

-- ---------------------------------------------------------------------------
-- journal_posts — DB-backed editorial posts shown on /journal
-- ---------------------------------------------------------------------------
create table if not exists public.journal_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image text,
  author text,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists journal_posts_published_idx
  on public.journal_posts(is_published, published_at desc);

-- ---------------------------------------------------------------------------
-- promotions — time-bound offers shown on the customer site
-- ---------------------------------------------------------------------------
create table if not exists public.promotions (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  discount_label text,
  starts_on date,
  ends_on date,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists promotions_active_idx on public.promotions(is_active, sort_order);

-- ---------------------------------------------------------------------------
-- faqs — power the guided FAQ chatbot + any FAQ page
-- ---------------------------------------------------------------------------
create table if not exists public.faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  category text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists faqs_active_idx on public.faqs(is_active, sort_order);

-- updated_at triggers (reuse set_updated_at from 001)
drop trigger if exists trg_journal_updated on public.journal_posts;
create trigger trg_journal_updated before update on public.journal_posts
  for each row execute function public.set_updated_at();
drop trigger if exists trg_promotions_updated on public.promotions;
create trigger trg_promotions_updated before update on public.promotions
  for each row execute function public.set_updated_at();
drop trigger if exists trg_faqs_updated on public.faqs;
create trigger trg_faqs_updated before update on public.faqs
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- RLS — public reads published/active rows; admins do everything.
-- ---------------------------------------------------------------------------
alter table public.journal_posts enable row level security;
alter table public.promotions enable row level security;
alter table public.faqs enable row level security;

drop policy if exists "journal public read" on public.journal_posts;
create policy "journal public read" on public.journal_posts
  for select using (is_published = true);
drop policy if exists "journal admin all" on public.journal_posts;
create policy "journal admin all" on public.journal_posts
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "promotions public read" on public.promotions;
create policy "promotions public read" on public.promotions
  for select using (
    is_active = true
    and (starts_on is null or starts_on <= current_date)
    and (ends_on is null or ends_on >= current_date)
  );
drop policy if exists "promotions admin all" on public.promotions;
create policy "promotions admin all" on public.promotions
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists "faqs public read" on public.faqs;
create policy "faqs public read" on public.faqs
  for select using (is_active = true);
drop policy if exists "faqs admin all" on public.faqs;
create policy "faqs admin all" on public.faqs
  for all using (public.is_admin()) with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Grants. Revoke ALL from anon (default-privs auto-grant), re-grant SELECT.
-- authenticated keeps writes, but the admin RLS policy is the real gate.
-- ---------------------------------------------------------------------------
revoke all on public.journal_posts from anon;
revoke all on public.promotions from anon;
revoke all on public.faqs from anon;

grant select on public.journal_posts to anon;
grant select on public.promotions to anon;
grant select on public.faqs to anon;

grant select, insert, update, delete on public.journal_posts to authenticated;
grant select, insert, update, delete on public.promotions to authenticated;
grant select, insert, update, delete on public.faqs to authenticated;

-- ---------------------------------------------------------------------------
-- Admin practitioner management. practitioners (001) currently only has a
-- public read policy. Add an admin-write policy so /admin can CRUD doctors.
-- (Google Calendar credentials live in a SEPARATE admin-only table added in a
-- later migration — never here, never customer-visible.)
-- ---------------------------------------------------------------------------
drop policy if exists "practitioners admin all" on public.practitioners;
create policy "practitioners admin all" on public.practitioners
  for all using (public.is_admin()) with check (public.is_admin());
grant select, insert, update, delete on public.practitioners to authenticated;

-- seed a few starter FAQs so the chatbot is useful out of the box
insert into public.faqs (question, answer, category, sort_order) values
  ('Where is the clinic located?', 'Om Sai Dental Implant Center is in Dharan-2, Desi Line, Sunsari district, Nepal.', 'Visiting', 1),
  ('How do I book an appointment?', 'Use the Book a consultation button on any page, call 025-538312, or message us on WhatsApp.', 'Booking', 2),
  ('Who is the lead dentist?', 'Dr. Ajit Yadav, MDS — Consultant Periodontist & Implantologist, and a lecturer at Nobel Medical College.', 'About', 3),
  ('Do you place dental implants?', 'Yes. Implants and periodontal (gum) care are our core focus. Book a consultation to discuss your case.', 'Treatments', 4)
on conflict do nothing;

notify pgrst, 'reload schema';
