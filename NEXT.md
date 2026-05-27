# Roadmap — What To Build Next

_Last reviewed: 2026-05-27_

Prioritised so the highest-value, lowest-effort items are at the top. Each item is small enough to ship in a single session.

---

## P0 — Required before real launch

1. **Wire `metadataBase` to env**
   `src/app/layout.tsx` currently hardcodes `https://lumiere-dental.vercel.app`. Change to `new URL(process.env.NEXT_PUBLIC_SITE_URL!)`.

2. **Add Supabase Auth redirect URL**
   In Supabase dashboard → **Auth → URL Configuration → Redirect URLs**, add:
   - `https://lumiere-dental-blond.vercel.app/auth/callback`
   - Any custom domain once attached.

3. **Real photography**
   Replace SVG placeholders with real images (`next/image`):
   - Hero photo (4:5, warm-light interior or close-up botanical/instrument)
   - Practitioner headshots (4 portraits, editorial lighting)
   - About page secondary image
   - Contact studio interior
   Drop into `public/images/` and update `Hero`, `TeamGrid`, `PortraitTile`, `PractitionerPortrait`, `AboutPage`.

4. **Custom domain**
   Attach `lumiere.dental` or `lumiere-dental.com` via Vercel → Domains. Update `NEXT_PUBLIC_SITE_URL` + Supabase redirect URLs after.

5. **Brand rename (if needed)**
   "Lumière Dental Studio" is placeholder. Search-replace across `src/app/layout.tsx`, `README.md`, `STATE.md`, `DESIGN.md`, site nav/footer, and meta tags.

---

## P1 — High-leverage features

6. **Email + SMS confirmation on booking**
   Wire Resend (or Supabase Edge Function) into `create_appointment` to:
   - Email the patient a confirmation + `.ics` calendar attachment.
   - Email/SMS the concierge inbox so the studio can call to confirm.
   - Reuse the Vercel Marketplace Resend integration.

7. **Stripe deposit hold**
   £50 refundable deposit in the booking flow (research brief recommendation):
   - Add Stripe Payment Intent before final confirm step.
   - Store `stripe_payment_intent_id` on `appointments`.
   - Refund/forfeit logic in cancellation route.

8. **Admin dashboard for the studio**
   `/admin` route (gated by Supabase RLS role or service-key middleware):
   - Calendar view of upcoming appointments.
   - Confirm / cancel / no-show actions (writes status).
   - Edit `services` + `practitioners` inline.

9. **Real availability**
   Replace the static `TIME_SLOTS` in `booking-flow.tsx` with practitioner-specific availability:
   - New table `practitioner_availability(practitioner_id, weekday, start_time, end_time)`.
   - Exclude already-booked slots from the date/time step.

10. **Before/after gallery**
    `/portfolio` (or `/results`) with a draggable compare-slider (research brief recommendation). Add `case_studies` table with `before_image`, `after_image`, `treatment_id`, `patient_quote`.

---

## P2 — Polish & content

11. **Real treatment detail pages**
    `/services/[slug]` — long-form pages with photography, FAQ, before/after, related treatments. Generate from `services` rows.

12. **Press strip with real wordmarks**
    Replace text fallbacks in `PressStrip` with greyscale SVG logos at low opacity. Source legitimately or drop the strip until coverage is real.

13. **Cookie banner + privacy/terms pages**
    GDPR-friendly. Use `cookies-next` + simple consent state.

14. **Sustainability micro-section**
    Pick one ethos (sustainability / longevity / biomimetic) and thread it through home + about. Research brief recommended this for differentiation.

15. **Membership / concierge plan card**
    Homepage CTA-block alternative or new `/membership` route. Monthly retainer copy + Stripe Checkout.

16. **Video hero loop**
    8–12 second silent muted loop of studio interior — replace the SVG hero illustration on viewports `>= md`. Use `next/video` or a plain `<video>` with poster fallback.

17. **Virtual tour video on /about**
    Same pattern, inside the "ritual" section.

---

## P3 — Engineering hygiene

18. **CI on GitHub Actions**
    - `pnpm install --frozen-lockfile`
    - `pnpm build`
    - `pnpm test:e2e` against a preview deploy URL.
    Block merges to `main` on failure.

19. **Sentry or Vercel Analytics**
    Already-installed Vercel project; add `@vercel/analytics` + `@vercel/speed-insights` and Sentry SDK for error reporting.

20. **Storybook for design system**
    Document `Reveal`, `Stagger`, `WordStagger`, buttons, cards. Helps maintain consistency as new pages are added.

21. **Lighthouse + accessibility audit**
    Target ≥95 on Lighthouse Performance / Accessibility / SEO / Best Practices on the homepage. Run `pnpm exec playwright test` with `@axe-core/playwright` once added.

22. **Image optimisation**
    Once real photos land, ensure all `next/image` `priority` flags are set for above-fold images and sizes are tuned.

23. **i18n (optional)**
    If the studio caters to international clients, add `next-intl` with `en-GB` + `ar` (Marylebone draws Gulf patients).

---

## P4 — Stretch ideas

24. **Patient portal expansion**
    - View treatment plan (PDF render server-side).
    - Pay invoices.
    - Re-book aftercare.
    - Message the studio (Supabase Realtime).

25. **Editorial blog `/journal`**
    Long-form posts on procedures, recovery, oral wellness. Sanity or just MDX in-repo.

26. **AI consultation triage**
    "Describe your concern" → LLM (claude-haiku-4-5) → suggested treatments + practitioner match. Booking pre-filled.

27. **3D smile simulator**
    Upload front-facing photo, ML overlay of veneer/whitening result. Premium differentiator.

---

## Where to start

If shipping for a real client this week, go in order:
1. Items 1–5 (P0) — required to launch.
2. Item 6 (P1) — confirmation emails are the single biggest patient-experience gap.
3. Item 8 (P1) — the studio cannot operate the site without admin tooling.

Everything else can roll out post-launch.
