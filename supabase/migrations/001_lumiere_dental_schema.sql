-- Lumière Dental schema
create extension if not exists "pgcrypto";

-- Services catalog
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  category text not null check (category in ('general','cosmetic','restorative','orthodontics','implants','whitening','specialist')),
  duration_minutes int not null default 60,
  price_from numeric(10,2),
  description text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Practitioners
create table if not exists public.practitioners (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  credentials text not null,
  bio text,
  photo_url text,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

-- Patient profile linked to auth.users
create table if not exists public.patient_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  phone text,
  date_of_birth date,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Appointments
create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid references auth.users(id) on delete set null,
  service_id uuid references public.services(id),
  practitioner_id uuid references public.practitioners(id),
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status text not null default 'pending' check (status in ('pending','confirmed','completed','cancelled','no_show')),
  patient_name text not null,
  patient_email text not null,
  patient_phone text not null,
  patient_type text not null default 'new' check (patient_type in ('new','returning')),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists appointments_starts_at_idx on public.appointments(starts_at);
create index if not exists appointments_patient_idx on public.appointments(patient_id);
create index if not exists appointments_status_idx on public.appointments(status);

-- Testimonials
create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  patient_first_name text not null,
  treatment text,
  quote text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_featured boolean not null default false,
  created_at timestamptz not null default now()
);

-- Updated-at trigger
create or replace function public.set_updated_at() returns trigger as $$
begin
  new.updated_at = now();
  return new;
end $$ language plpgsql;

drop trigger if exists trg_appts_updated on public.appointments;
create trigger trg_appts_updated before update on public.appointments
for each row execute function public.set_updated_at();

drop trigger if exists trg_profiles_updated on public.patient_profiles;
create trigger trg_profiles_updated before update on public.patient_profiles
for each row execute function public.set_updated_at();

-- RLS
alter table public.services enable row level security;
alter table public.practitioners enable row level security;
alter table public.testimonials enable row level security;
alter table public.patient_profiles enable row level security;
alter table public.appointments enable row level security;

drop policy if exists "services public read" on public.services;
create policy "services public read" on public.services for select using (is_active = true);

drop policy if exists "practitioners public read" on public.practitioners;
create policy "practitioners public read" on public.practitioners for select using (is_active = true);

drop policy if exists "testimonials public read" on public.testimonials;
create policy "testimonials public read" on public.testimonials for select using (true);

drop policy if exists "profile self select" on public.patient_profiles;
create policy "profile self select" on public.patient_profiles for select using (auth.uid() = id);
drop policy if exists "profile self upsert" on public.patient_profiles;
create policy "profile self upsert" on public.patient_profiles for insert with check (auth.uid() = id);
drop policy if exists "profile self update" on public.patient_profiles;
create policy "profile self update" on public.patient_profiles for update using (auth.uid() = id);

-- Anonymous booking allowed (insert only); patients see only their own.
drop policy if exists "appts anyone insert" on public.appointments;
create policy "appts anyone insert" on public.appointments for insert with check (true);
drop policy if exists "appts self select" on public.appointments;
create policy "appts self select" on public.appointments for select using (auth.uid() = patient_id);
drop policy if exists "appts self update" on public.appointments;
create policy "appts self update" on public.appointments for update using (auth.uid() = patient_id);

-- Seed services
insert into public.services (slug, name, category, duration_minutes, price_from, description, sort_order) values
('hygiene-cleaning','Hygiene & Cleaning','general',45,180,'Comprehensive prophylaxis with air-polish and intra-oral camera review.',1),
('consultation','New Patient Consultation','general',60,220,'Full examination, intra-oral photography, and personalised treatment plan.',2),
('porcelain-veneers','Porcelain Veneers','cosmetic',120,1850,'Hand-layered ceramic veneers crafted by master ceramists.',3),
('professional-whitening','Professional Whitening','whitening',90,650,'In-chair Enlighten Evolution whitening for lasting, natural luminosity.',4),
('invisalign','Invisalign Clear Aligners','orthodontics',60,4200,'Discreet, removable orthodontic correction with iTero scanning.',5),
('composite-bonding','Composite Edge Bonding','cosmetic',90,420,'Same-day artistic restoration using nano-hybrid composite.',6),
('dental-implants','Dental Implants','implants',150,3200,'Single-stage zirconia and titanium implants with digital guided surgery.',7),
('root-canal','Endodontic Care','restorative',90,820,'Microscope-assisted root canal therapy by specialist endodontists.',8)
on conflict (slug) do nothing;

-- Seed practitioners
insert into public.practitioners (slug, name, credentials, bio, photo_url, sort_order) values
('dr-amara-okafor','Dr Amara Okafor','BDS, MSc Aesthetic Dentistry','Founding clinician. Trained at King''s College London with post-graduate work in minimally invasive cosmetic dentistry. Patron of the British Academy of Cosmetic Dentistry.','/images/practitioners/amara.jpg',1),
('dr-rohan-mehta','Dr Rohan Mehta','BDS, MClinDent Prosthodontics','Specialist prosthodontist. Lectures internationally on full-mouth rehabilitation and digital workflows.','/images/practitioners/rohan.jpg',2),
('dr-elena-vasquez','Dr Elena Vásquez','DDS, Cert. Endodontics','Specialist endodontist. Twenty years of microscope-assisted root canal therapy.','/images/practitioners/elena.jpg',3),
('mira-larsen','Mira Larsen','RDH, Dip. Dental Hygiene','Lead hygienist. Air-polish and biofilm specialist; trained in Sweden.','/images/practitioners/mira.jpg',4)
on conflict (slug) do nothing;

-- Seed testimonials
insert into public.testimonials (patient_first_name, treatment, quote, rating, is_featured) values
('Helena','Porcelain Veneers','Lumière reframed what dental care could feel like. The result is the most natural I''ve seen — friends ask what changed and never guess.',5,true),
('James','Invisalign','Three years of hesitation undone in one consultation. The team treats you like you are the only patient that day.',5,true),
('Priya','Whitening & Hygiene','I leave every visit feeling like I have stepped out of a spa, not a surgery. The attention to detail is unmatched.',5,true)
on conflict do nothing;
