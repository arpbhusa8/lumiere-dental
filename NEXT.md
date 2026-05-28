# Roadmap — What To Build Next

_Last reviewed: 2026-05-28_

Prioritised so blockers to a credible public launch sit at the top. The Om Sai rebrand is shipped; what gates the real "go live" is **proof, not pixels** — owner-supplied evidence that backs the four messaging pillars (Academic Authority, Transparent Pricing, Patient-First Comfort, Local Specialist).

---

## P0 — Owner deliverables (proof-gap unblocking)

These come from Dr. Ajit / the clinic team. Nothing about the site is invented; until each lands, the corresponding section ships as a neutral placeholder.

1. **Approve published implant price band**
   Owner signs off on the NPR range for single implant + crown to publish on `/pricing-guide`. Draft band held in `.brief/SOURCE.md` — do **not** publish until written approval.

2. **Secure Nobel Medical College lecturer screenshot**
   Faculty-page screenshot or appointment letter, served as the visual proof anchor for the "Academic Authority" pillar on `/` and `/implants`.

3. **Collect 3–5 patient testimonials with written consent**
   Quotes + first name + treatment + consent on file. Repopulates the empty `testimonials` table (cleared in migration `004`) and unhides the homepage testimonial section.

4. **Commission Dr. Ajit clinical photo**
   Editorial-lit portrait (chair-side or environmental), warm white balance ~5200K, 4:5 ratio. Replaces the SVG `PortraitTile` / `PractitionerPortrait` placeholders.

5. **Confirm clinic equipment + implant systems used**
   CBCT? digital X-ray? intra-oral camera? Which implant system(s)? Unlocks specific copy on `/implants` and FAQ #4; until then `/implants` says "Digital X-rays today; CBCT planned."

6. **Confirm operating hours**
   Current `/contact` shows placeholder Sun–Fri 9am–6pm, Sat closed. Owner-confirm before public launch.

---

## P0 — Engineering (required before real launch)

7. **Wire `metadataBase` to env**
   `src/app/layout.tsx` currently hardcodes the old `lumiere-dental.vercel.app` URL. Change to `new URL(process.env.NEXT_PUBLIC_SITE_URL!)` so previews and the custom domain resolve OG/Twitter assets correctly.

8. **Apply migration `004_om_sai_reseed.sql` to the remote Supabase project**
   Mirrors the local reseed (Dr. Ajit as sole practitioner + implant/periodontal services + cleared testimonials) onto `ptearftwlrdifjnirimd`. Confirm with `list_migrations` after apply.

9. **Add Supabase Auth redirect URL for production**
   In Supabase dashboard → **Auth → URL Configuration → Redirect URLs**, add:
   - `https://lumiere-dental-blond.vercel.app/auth/callback`
   - Any custom domain once attached (see #10).

10. **Custom domain**
    Attach an Om Sai-branded domain (e.g. `omsaidental.com.np` or `omsaidental.com`) via Vercel → Domains. Update `NEXT_PUBLIC_SITE_URL` + Supabase redirect URLs after.

---

## P1 — High-leverage features

11. **Email + .ics confirmation on booking (Resend)**
    Wire Resend (via the Vercel Marketplace integration) into the `create_appointment` flow to:
    - Email the patient a confirmation with `.ics` calendar attachment.
    - Email the clinic inbox + WhatsApp link so staff can call to confirm.
    - Include the post-op hotline number (Patient-First Comfort pillar).

12. **Admin dashboard for the clinic**
    `/admin` route (gated by Supabase RLS role or service-key middleware):
    - Calendar view of upcoming appointments.
    - Confirm / cancel / no-show actions (writes status).
    - Edit `services` + `practitioners` inline.
    - Capture and toggle testimonial publish state once consent is on file.

13. **Real availability**
    Replace the static `TIME_SLOTS` in `booking-flow.tsx` with practitioner-specific availability:
    - New table `practitioner_availability(practitioner_id, weekday, start_time, end_time)`.
    - Seed Dr. Ajit's schedule once #6 confirms hours.
    - Exclude already-booked slots from the date/time step.

14. **Before/after gallery (post-consent only)**
    `/results` with a draggable compare-slider for implant + periodontal cases. New `case_studies` table with `before_image`, `after_image`, `treatment_id`, `patient_quote`, `consent_signed_at`. Nothing renders without a signed consent record.

15. **Bilingual Nepali editor pass on top 3 pages**
    `[NEPALI-TRANSLATION-TBD]` placeholders converted to verified Nepali copy on `/`, `/implants`, `/pricing-guide` (highest commercial intent). Translator-of-record review, no auto-translation.

---

## P2 — Polish & content

16. **Real treatment detail pages**
    `/services/[slug]` — long-form pages with photography, FAQ, before/after, related treatments. Generate from `services` rows. Prioritise implant + periodontal slugs.

17. **30-day content calendar published to `/journal`**
    Per `.brief/SOURCE.md`, four pillar posts on Tuesdays — implant cost, procedure walkthrough, gum disease guide, signs of gum disease. Internal-link each to its pillar page + one adjacent pillar.

18. **Credentials proof strip with real assets**
    Once #2 lands, swap text fallbacks for greyscale screenshots / logos at low opacity (Nobel Medical College, MDS registration, professional bodies). No deal/discount badges — banned word adjacency.

19. **Cookie banner + privacy / terms pages**
    Privacy notice covering Supabase storage, WhatsApp opt-in, and image consent for testimonials/before-after. Plain Nepali + English.

20. **Post-op hotline micro-section**
    Dedicated card/CTA threading the Patient-First Comfort pillar through `/` and `/implants`. Surface the WhatsApp number prominently and explain what the hotline covers.

21. **Membership / annual check-up plan**
    Optional CTA-block or `/membership` route once the clinic decides pricing. Monthly or annual retainer covering hygiene + periodontal review.

22. **Video hero loop**
    8–12 second silent muted loop of the Dharan-2 clinic interior — replace the SVG hero illustration on viewports `>= md`. Use `next/video` or plain `<video>` with poster fallback.

---

## P3 — Engineering hygiene

23. **CI on GitHub Actions**
    - `pnpm install --frozen-lockfile`
    - `pnpm build`
    - `pnpm test:e2e` against a preview deploy URL.
    Block merges to `main` on failure.

24. **Sentry or Vercel Analytics**
    Add `@vercel/analytics` + `@vercel/speed-insights` and Sentry SDK for error reporting.

25. **Storybook for design system**
    Document `Reveal`, `Stagger`, `WordStagger`, buttons, cards.

26. **Lighthouse + accessibility audit**
    Target ≥95 on Lighthouse Performance / Accessibility / SEO / Best Practices on the homepage. Run `pnpm exec playwright test` with `@axe-core/playwright` once added.

27. **Image optimisation**
    Once real photos land, set `next/image` `priority` flags for above-fold images and tune `sizes`.

---

## P4 — Stretch ideas

28. **Patient portal expansion**
    - View treatment plan (PDF render server-side).
    - Pay invoices / deposits.
    - Re-book aftercare.
    - Message the clinic (Supabase Realtime).

29. **AI consultation triage**
    "Describe your concern" → LLM (claude-haiku) → suggested specialist focus (implant vs. periodontal) + booking pre-filled. Must always defer to Dr. Ajit's chair-side assessment; no diagnosis claims.

30. **Second clinic location (Kathmandu)**
    The locations module already accepts N entries — when/if a Kathmandu branch opens, add a second card without re-architecting nav or `/contact`.

---

## Where to start

If shipping a credible public launch this week:

1. **Items 1–6 (owner deliverables)** — without these, the site cannot fully unblock the homepage testimonials, `/pricing-guide`, and the lecturer proof anchor. Push the owner; do not invent.
2. **Items 7–10 (engineering P0)** — the technical bar for a real launch.
3. **Item 11 (Resend confirmations)** — biggest patient-experience gap after the proof gaps close.
4. **Item 12 (admin dashboard)** — the clinic cannot operate the booking funnel without it.

Everything else can roll out post-launch.
