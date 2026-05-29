# Project State — Om Sai Dental Implant Center

_Snapshot: 2026-05-28_

## Status: Live in production (rebranded from Lumière placeholder → Om Sai)

- **Brand:** Om Sai Dental Implant Center Pvt. Ltd. (short: Om Sai Dental)
- **Owner / lead clinician:** Dr. Ajit Yadav, MDS (Periodontology) — Consultant Periodontist, Implantologist, Lecturer at Nobel Medical College (Biratnagar)
- **Phone:** `025-538312` · **WhatsApp:** `9852057909` (`https://wa.me/9779852057909`)
- **Address:** Dharan-2, Desi Line, Sunsari district, Nepal
- **Operating hours:** placeholder — Sun–Fri 9am–6pm, Sat closed (owner-confirm before publish)
- **Production URL:** https://lumiere-dental-blond.vercel.app *(custom domain pending — see `NEXT.md`)*
- **Vercel project:** `yantra-s-projects/lumiere-dental` · `prj_1cV4OLQnVwUV6YK95kl1wULe5zta`
- **Supabase project:** `arpbhusa8's Project` · ref `ptearftwlrdifjnirimd` · ap-southeast-2
- **Org slug:** `yantra-PashupatiPly` · `zxhgajncafpapsvxcxfb`
- **Deployment protection:** disabled (public)

> Source of truth for brand copy and proof gaps: [`.brief/SOURCE.md`](./.brief/SOURCE.md). Banned words are enforced at every copy layer.

## What is built

### Frontend
- Next.js 16.2 App Router with Turbopack, React 19, Tailwind v4, shadcn/ui (Nova preset, neutral base overridden to warm ivory + sage)
- Design system unchanged from launch: Fraunces + Inter, OKLCH tokens, editorial motion primitives (`Reveal`, `Stagger`, `WordStagger`). See `DESIGN.md`.
- Routes: `/`, `/services`, `/implants`, `/pricing-guide`, `/gum-disease`, `/journal`, `/team`, `/about`, `/contact`, `/booking`, `/login`, `/signup`, `/dashboard`, plus `/auth/callback`, `/auth/signout`
- 3 pillar pages added in the rebrand (`/implants`, `/pricing-guide`, `/gum-disease`) + editorial `/journal` index ready to receive the 30-day content calendar
- Hero H1: "Dr. Ajit Yadav, Expert Implantologist in Dharan"
- Primary CTA: `Book a consultation` → `tel:025538312` · Secondary CTA: WhatsApp Dr. Ajit → `https://wa.me/9779852057909`
- Responsive (mobile-first, drawer nav at `md`)
- Imagery: hero/portrait still SVG placeholders pending owner-commissioned photography

### Backend (Supabase)
- Schema: `services`, `practitioners`, `appointments`, `patient_profiles`, `testimonials`
- RLS enabled on all tables; public reads on `services`, `practitioners`, `testimonials`
- `create_appointment(...)` SECURITY DEFINER RPC handles anon booking (RLS-safe insert)
- Magic-link auth via `signInWithOtp`; callback exchanges code → session
- **Reseed migration `004_om_sai_reseed.sql`** added: replaces Lumière sample roster with the real Om Sai practitioner (Dr. Ajit Yadav, MDS) and the implant + periodontal service catalogue. Testimonials table cleared until consented patient quotes arrive. Schema itself is unchanged.
- Migrations applied via MCP and mirrored in `supabase/migrations/`

### Testing
- Playwright 1.60 — 15 tests across homepage, navigation, booking, auth
- Desktop (Chromium) + Mobile (iPhone 14) projects configured
- Run with `pnpm test:e2e` or against any URL via `PLAYWRIGHT_BASE_URL`
- Last local run: 15/15 passing (against `pnpm start` on :3100)
- Last prod smoke (homepage + navigation): 10/10 passing against live URL

### Tooling
- shadcn components installed: button, card, input, label, form, textarea, select, dialog, sheet, dropdown-menu, avatar, badge, separator, tabs, sonner, navigation-menu, accordion, popover, scroll-area, skeleton
- Vercel CLI linked, env vars set for production
- Build is clean — no TypeScript errors, no lint blocks

## Proof gaps (do not invent — block publish until resolved)

These are the artifacts the site is waiting on. Each is reflected as a placeholder or neutral phrasing in the live UI; nothing is fabricated.

1. **Published implant price band (HIGH)** — `/pricing-guide` shows the "depends on system + bone + restoration" explainer with a placeholder for the NPR range. Do not publish a figure until Dr. Ajit signs off (target band held in `.brief/SOURCE.md`).
2. **Nobel Medical College lecturer screenshot (HIGH)** — credentials strip cites the role; visual proof anchor (faculty page screenshot or letter) is not yet attached.
3. **Patient testimonials with written consent (HIGH)** — `testimonials` table is empty post-reseed. Need 3–5 quotes with patient consent on file before the testimonial section unhides.
4. **Dr. Ajit clinical photo (MED)** — practitioner portrait is an SVG placeholder. Commissioned editorial-lit photo required (chair-side or portrait, warm white balance).
5. **Clinic equipment confirmation (MED)** — FAQ + services copy currently says "Digital X-rays today; CBCT planned." Confirm CBCT / intra-oral camera / implant system(s) before publishing specifics.
6. **Operating hours (LOW)** — `/contact` shows placeholder Sun–Fri 9am–6pm, Sat closed. Owner to confirm true hours before publish.
7. **Team photos: Dr. Priyesh Kamat + Renuka Rai (MED)** — photos exist in the `#om-sai-dental` Slack channel but could not be pulled into the repo (claude.ai Slack MCP returns images as rendered blocks, no local token / download URL). `/team` + home grid render an initials-avatar fallback until the files land. Drop `public/team/dr-priyesh-kamat.png` and `public/team/renuka-rai.png` — the server resolver (`src/lib/team.ts → resolveTeam`) auto-swaps the avatar for the photo, no code change needed.
8. **Team LinkedIn URLs (LOW)** — `src/lib/team.ts` keeps `linkedin: null` for all members. Web research found no confirmed profiles (incl. Dr. Priyesh Kamat, NMC No. 43429). Do NOT fabricate — set the field to a confirmed URL only; the LinkedIn link renders conditionally when present.

### Team roster (added 2026-05-29)
- **Dr. Ajit Yadav** — MDS, lead clinician (existing).
- **Dr. Priyesh Kamat** — BDS (BPKIHS), Dental Surgeon, NMC No. 43429. Added as a bookable practitioner via migration `005_omsai_team_additions.sql` (applied to remote). Facts sourced from Slack.
- **Renuka Rai** — B.Ed, Office Assistant. Non-clinical / not bookable; rendered on `/team` from `src/lib/team.ts` only (not in the `practitioners` table).
- New: real Google Maps embed (`src/components/site/clinic-map.tsx`, keyless) on `/contact` and a "Find us" section on the home page; replaces the old SVG map placeholder.

## Files of note

| Path | Purpose |
| --- | --- |
| `.brief/SOURCE.md` | Brand source brief — single source of truth for copy, banned words, proof gaps |
| `DESIGN.md` | Design system reference (palette, type, motion, components) |
| `AGENTS.md` / `CLAUDE.md` | Next 16 agent hints (read bundled docs) |
| `src/app/booking/actions.ts` | Booking server action — calls `create_appointment` RPC |
| `src/lib/supabase/*.ts` | Browser / RSC / middleware Supabase clients |
| `middleware.ts` | Session refresher |
| `supabase/migrations/004_om_sai_reseed.sql` | Reseed of practitioners + services for Om Sai brand |
| `supabase/migrations/` | Full versioned SQL migrations |
| `tests/e2e/` | Playwright specs |

## How to reproduce

1. Clone the repo.
2. `pnpm install && npx playwright install --with-deps chromium`
3. Create a Supabase project (or reuse `ptearftwlrdifjnirimd`).
4. Apply migrations in `supabase/migrations/` in numerical order — `004_om_sai_reseed.sql` must run after the original Lumière seed in `001_*` so the reseed takes effect.
5. Copy `.env.example` → `.env.local` and fill in values.
6. `pnpm dev`.

See `NEXT.md` for the roadmap (proof-gap unblocking is at the top).
