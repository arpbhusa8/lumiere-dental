# Lumière Dental Studio

A premium boutique dental clinic website. Editorial, calm, clinical-luxe — built with Next.js 16, Tailwind 4, shadcn/ui, Motion.dev, and Supabase.

**Live:** https://lumiere-dental-blond.vercel.app

## Stack

- **Framework:** Next.js 16.2 (App Router, Turbopack), React 19
- **Styling:** Tailwind CSS v4, shadcn/ui (Nova preset · Geist + Lucide)
- **Type:** Fraunces (display, variable) + Inter (body) via `next/font/google`
- **Motion:** Motion.dev (editorial easing `[0.22, 1, 0.36, 1]`)
- **Auth + DB:** Supabase (magic-link auth, Postgres + RLS)
- **Forms:** react-hook-form + Zod
- **Tests:** Playwright (Chromium + iPhone 14 mobile project)
- **Deploy:** Vercel (deployment protection disabled)

## Brand & Design System

See [`DESIGN.md`](./DESIGN.md) for the full design system — palette, typography, spacing, motion, components, accessibility.

**Palette — Warm Ivory + Sage**
- Ivory `#F7F3EC` · Bone `#FBFAF6` · Sage `#7A8B7A` · Forest `#2F3E2E` · Brass `#B89968` · Warm Ink `#1A1814`

## Routes

| Path | Purpose |
| --- | --- |
| `/` | Hero, press strip, philosophy, services, team, testimonial, CTA |
| `/services` | Categorised treatment menu |
| `/team` | Editorial portraits + credentials |
| `/about` | Studio philosophy + ritual narrative |
| `/contact` | Address, hours, hand-drawn map |
| `/booking` | 5-step reservation flow (Type → Treatment → Date/Time → Details → Review) |
| `/login` `/signup` | Magic-link sign-in |
| `/dashboard` | Patient appointments + history (auth-gated) |
| `/auth/callback` | Supabase OTP exchange |
| `/auth/signout` | POST → sign out + redirect |

## Local development

### 1. Install

```bash
pnpm install
npx playwright install --with-deps chromium
```

### 2. Environment

Copy `.env.example` → `.env.local` and fill in your Supabase project credentials.

```bash
cp .env.example .env.local
```

Required:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` (publishable / anon)
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

### 3. Supabase schema

The schema is committed as Supabase migrations in [`supabase/migrations/`](./supabase/migrations/):
- `001_lumiere_dental_schema.sql` — tables, RLS, seed data
- `002_fix_appointment_grants.sql` — anon/authenticated grants
- `003_create_appointment_rpc.sql` — SECURITY DEFINER booking RPC

Apply them via the Supabase CLI, SQL editor, or MCP, in numerical order.

### 4. Run

```bash
pnpm dev          # http://localhost:3000
pnpm build        # production build
pnpm start        # production server
pnpm test:e2e     # Playwright suite (boots a dev server)
```

## Database schema

- `services` — treatment catalogue (8 seeded)
- `practitioners` — clinician roster (4 seeded)
- `appointments` — booking records (status: pending / confirmed / completed / cancelled / no_show)
- `patient_profiles` — auth.users-linked patient data
- `testimonials` — featured patient quotes

RLS is enforced on all tables. Anonymous bookings are accepted via the `create_appointment(...)` RPC (SECURITY DEFINER), which sidesteps the role-level INSERT block.

## Auth flow

1. User enters email on `/login` or `/signup`.
2. Supabase sends a magic link → `…/auth/callback?code=…`.
3. Callback exchanges code for session, redirects to `?next` (default `/dashboard`).
4. Middleware refreshes session cookies on every navigation.

> **Production setup:** add `https://<your-domain>/auth/callback` to **Supabase → Auth → URL Configuration → Redirect URLs**.

## Testing

```bash
pnpm test:e2e                                      # local dev
PLAYWRIGHT_BASE_URL=https://your-deploy pnpm exec playwright test --project=chromium
```

15 tests across homepage, navigation, booking, and auth flows. Mobile project (iPhone 14) available via `--project=mobile`.

## Deployment

Linked to Vercel project `yantra-s-projects/lumiere-dental`.

```bash
vercel deploy --prod
```

Environment variables for production must be set via `vercel env add` or the dashboard.

## Project layout

```
src/
├── app/
│   ├── about/
│   ├── auth/
│   │   ├── callback/route.ts
│   │   └── signout/route.ts
│   ├── booking/
│   │   ├── actions.ts         # Server action → create_appointment RPC
│   │   └── page.tsx
│   ├── contact/
│   ├── dashboard/
│   ├── login/
│   ├── services/
│   ├── signup/
│   ├── team/
│   ├── globals.css            # Tailwind v4 tokens — warm ivory + sage
│   ├── layout.tsx
│   └── page.tsx               # Home
├── components/
│   ├── auth/login-form.tsx
│   ├── booking/booking-flow.tsx
│   ├── home/                  # Hero, philosophy, services, team, testimonial, CTA
│   ├── motion/                # Reveal, Stagger, WordStagger primitives
│   ├── site/                  # Nav + Footer
│   └── ui/                    # shadcn primitives
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── types.ts
│   └── utils.ts
└── middleware.ts
supabase/
└── migrations/
tests/e2e/
├── auth.spec.ts
├── booking.spec.ts
├── homepage.spec.ts
└── navigation.spec.ts
DESIGN.md                       # Brand + design system spec
STATE.md                        # Current project state snapshot
NEXT.md                         # Roadmap — what to build next
```

## Further reading

- [`DESIGN.md`](./DESIGN.md) — palette, typography, motion patterns, accessibility
- [`STATE.md`](./STATE.md) — what is built, known issues, how to reproduce
- [`NEXT.md`](./NEXT.md) — prioritised roadmap
