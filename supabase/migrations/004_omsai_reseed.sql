-- Om Sai Dental Implant Center reseed
-- Replaces Lumière placeholder seed data in services, practitioners, testimonials.
-- Schema is NOT modified. Existing appointments references are nulled first so the
-- legacy seed rows can be deleted without tripping the FK constraints (services.id,
-- practitioners.id are referenced by public.appointments with default NO ACTION).
--
-- Category mapping note: services.category has a CHECK constraint limited to
-- ('general','cosmetic','restorative','orthodontics','implants','whitening','specialist').
-- Periodontal procedures are filed under 'specialist' (no dedicated periodontal value).

begin;

-- Detach only appointments that reference rows we are about to delete.
-- Scoped form is safe in environments that already have real bookings against
-- the new (Om Sai) data — those rows will not match the subselects.
update public.appointments
   set service_id = null
 where service_id in (select id from public.services);
update public.appointments
   set practitioner_id = null
 where practitioner_id in (select id from public.practitioners);

-- Clear placeholder seed data.
delete from public.testimonials;
delete from public.practitioners;
delete from public.services;

-- Seed services (12 rows): implants, periodontal, general, cosmetic.
insert into public.services (slug, name, category, duration_minutes, price_from, description, is_active, sort_order) values
('single-implant-placement','Single Implant Placement','implants',90,null,'Replacement of a single missing tooth using a titanium implant fixture and a restorative crown.',true,1),
('multi-tooth-implants','Multi-Tooth Implants','implants',150,null,'Replacement of several adjacent missing teeth using implant-supported bridges or multiple implants.',true,2),
('full-mouth-rehabilitation','Full-Mouth Rehabilitation','implants',240,null,'Comprehensive restoration of an entire arch or both arches using implant-supported prosthetics.',true,3),
('implant-supported-denture','Implant-Supported Denture','implants',180,null,'Removable or fixed denture stabilised by dental implants for improved retention and function.',true,4),
('scaling-root-planing','Gum Disease Treatment (Scaling & Root Planing)','specialist',60,null,'Non-surgical deep cleaning of tooth roots to manage early to moderate gum disease.',true,5),
('periodontal-surgery','Periodontal Surgery','specialist',120,null,'Surgical management of advanced gum disease, including flap procedures and bone regeneration where indicated.',true,6),
('gum-recession-treatment','Gum Recession Treatment','specialist',90,null,'Soft-tissue grafting and related procedures to address receded gum margins.',true,7),
('periodontal-maintenance','Periodontal Maintenance','specialist',45,null,'Scheduled follow-up cleanings and assessments for patients with a history of gum disease.',true,8),
('routine-exam-clean','Routine Examination & Clean','general',45,null,'Standard oral health check-up with scaling, polish and review of preventive care.',true,9),
('composite-filling','Composite Filling','general',45,null,'Tooth-coloured restoration of cavities or minor chips using composite resin.',true,10),
('tooth-extraction','Tooth Extraction','general',45,null,'Removal of a non-restorable or impacted tooth under local anaesthesia.',true,11),
('teeth-whitening','Teeth Whitening','cosmetic',60,null,'In-clinic whitening procedure to lighten the shade of natural teeth.',true,12);

-- Seed practitioner (1 row): Dr. Ajit Yadav. Photo URL left NULL (proof gap: clinical photo pending).
insert into public.practitioners (slug, name, credentials, bio, photo_url, is_active, sort_order) values
('dr-ajit-yadav','Dr. Ajit Yadav','MDS, Consultant Periodontist & Implantologist','Dr. Ajit Yadav is a Consultant Periodontist and Implantologist holding an MDS in Periodontology. He also serves as a Lecturer at Nobel Medical College, Biratnagar. His clinical focus is dental implants and the management of periodontal conditions.',null,true,1);

-- Testimonials: intentionally empty.
-- proof-gap: testimonials — no patient quotes have been collected with consent yet.
-- Owner to provide 3–5 patient testimonials before any rows are inserted here.

commit;
