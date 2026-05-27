# Project State — Lumière Dental Studio

_Snapshot: 2026-05-27_

## Status: Live in production

- **Production URL:** https://lumiere-dental-blond.vercel.app
- **Vercel project:** `yantra-s-projects/lumiere-dental` · `prj_1cV4OLQnVwUV6YK95kl1wULe5zta`
- **Supabase project:** `arpbhusa8's Project` · ref `ptearftwlrdifjnirimd` · ap-southeast-2
- **Org slug:** `yantra-PashupatiPly` · `zxhgajncafpapsvxcxfb`
- **Deployment protection:** disabled (public)
- **Domain:** `lumiere-dental-blond.vercel.app` (default `lumiere-dental.vercel.app` was taken)

## What is built

### Frontend
- Next.js 16.2 App Router with Turbopack, React 19, Tailwind v4, shadcn/ui (Nova preset, neutral base overridden to warm ivory + sage)
- Design system: Fraunces + Inter, OKLCH tokens, editorial motion primitives (`Reveal`, `Stagger`, `WordStagger`)
- 9 routes: `/`, `/services`, `/team`, `/about`, `/contact`, `/booking`, `/login`, `/signup`, `/dashboard` plus `/auth/callback`, `/auth/signout`
- Responsive (single mobile-first layout per page; nav collapses to drawer at `md`)
- All hero/portrait imagery is inline SVG (no external image dependencies)

### Backend (Supabase)
- Schema: `services`, `practitioners`, `appointments`, `patient_profiles`, `testimonials`
- RLS enabled on all tables
- Public reads on `services`, `practitioners`, `testimonials`
- `create_appointment(...)` SECURITY DEFINER RPC handles anon booking (RLS-safe insert)
- Magic-link auth via `signInWithOtp`; callback exchanges code → session
- Seed data: 8 services, 4 practitioners, 3 featured testimonials
- Migrations applied via MCP and mirrored in `supabase/migrations/`

### Testing
- Playwright 1.60 — 15 tests across homepage, navigation, booking, auth
- Desktop (Chromium) + Mobile (iPhone 14) projects configured
- Run with `pnpm test:e2e` (uses `webServer`) or against any URL via `PLAYWRIGHT_BASE_URL`
- Last local run: 15/15 passing (against `pnpm start` on :3100)
- Last prod smoke (homepage + navigation): 10/10 passing against live URL

### Tooling
- shadcn components installed: button, card, input, label, form, textarea, select, dialog, sheet, dropdown-menu, avatar, badge, separator, tabs, sonner, navigation-menu, accordion, popover, scroll-area, skeleton
- Vercel CLI linked, env vars set for production
- Build is clean — no TypeScript errors, no lint blocks

## Known issues / limitations

1. **Magic-link auth blocked on `example.com` test emails.** Supabase enforces real-domain validation and per-email rate limit. Tests tolerate this with a fallback assertion. Real signups work; use a real email when testing manually.
2. **`metadataBase` is hardcoded.** `src/app/layout.tsx` uses `https://lumiere-dental.vercel.app` — should be moved to `process.env.NEXT_PUBLIC_SITE_URL`.
3. **Practitioner photos are SVG placeholders.** No real headshots — replace `<PortraitTile>` / `<PractitionerPortrait>` with `next/image` + real assets when available.
4. **Hero illustration is an SVG composition** — works editorially but a real photographic hero would deepen the premium feel.
5. **`lumiere-dental.vercel.app` was unavailable** — we got `lumiere-dental-blond.vercel.app`. Custom domain not yet attached.
6. **Supabase Auth redirect URL** — needs `https://lumiere-dental-blond.vercel.app/auth/callback` added in Supabase dashboard (Auth → URL Configuration) so prod magic links resolve correctly.

## Files of note

| Path | Purpose |
| --- | --- |
| `DESIGN.md` | Design system reference |
| `AGENTS.md` / `CLAUDE.md` | Next 16 agent hints (read bundled docs) |
| `src/app/booking/actions.ts` | Booking server action — calls `create_appointment` RPC |
| `src/lib/supabase/*.ts` | Browser / RSC / middleware Supabase clients |
| `middleware.ts` | Session refresher |
| `supabase/migrations/` | Versioned SQL migrations |
| `tests/e2e/` | Playwright specs |

## How to reproduce

1. Clone the repo.
2. `pnpm install && npx playwright install --with-deps chromium`
3. Create a Supabase project (or reuse `ptearftwlrdifjnirimd`).
4. Apply migrations in `supabase/migrations/` in numerical order.
5. Copy `.env.example` → `.env.local` and fill in values.
6. `pnpm dev`.

See `NEXT.md` for the roadmap.
