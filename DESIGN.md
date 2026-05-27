# Lumière Dental Studio — Design System

> Premium boutique dental clinic. Editorial, calm, clinical-luxe. Default rename: `Lumière Dental Studio`.

## Brand Positioning
- **Tone:** quiet luxury, spa-meets-clinic, magazine-editorial.
- **Audience:** affluent professionals 30–60, cosmetic + general dentistry.
- **Anti-pattern:** cartoon teeth, neon blue, "smile" wordmarks, comic-sans warmth.

## Color Palette — "Warm Ivory + Sage"

OKLCH used for Tailwind v4 tokens.

| Token | Hex | OKLCH | Use |
|---|---|---|---|
| `--bg` ivory | `#F7F3EC` | `oklch(0.957 0.014 85)` | Page background |
| `--surface` bone | `#FBFAF6` | `oklch(0.978 0.008 90)` | Cards |
| `--ink` warm black | `#1A1814` | `oklch(0.183 0.006 65)` | Body text |
| `--ink-soft` | `#3D3A33` | `oklch(0.358 0.008 75)` | Secondary text |
| `--primary` sage | `#7A8B7A` | `oklch(0.581 0.022 145)` | Primary CTAs, accents |
| `--primary-deep` forest | `#2F3E2E` | `oklch(0.301 0.025 145)` | Hover, dark sections |
| `--accent` brass | `#B89968` | `oklch(0.679 0.058 75)` | Dividers, gold details |
| `--muted` | `#E8E1D2` | `oklch(0.892 0.018 85)` | Subtle backgrounds |
| `--border` | `#D8CFBE` | `oklch(0.831 0.022 85)` | Hairlines |

Charts: sage scale (5 steps from primary to forest).

## Typography
- **Display:** `Fraunces` variable (opsz, soft axis) — `next/font/google`.
  - H1 `clamp(48px, 7vw, 112px)` / weight 300 / tracking `-0.02em` / line `0.95`.
  - H2 `clamp(36px, 5vw, 64px)` / weight 350.
  - Eyebrow: Inter caps `0.75rem` / tracking `0.18em`.
- **Body:** `Inter` variable — `next/font/google`.
  - Body `1rem` (16/26), large body `1.125rem` (18/30).
  - Line length 62ch max.

## Spacing & Layout
- 12-col grid, gap 24px desktop / 16 mobile.
- Max width 1280, gutters 24/40/80 at sm/md/lg.
- Section padding `py-24 md:py-32 lg:py-40`.
- Radius scale (4–28px). Default `--radius: 0.5rem`. Use `rounded-2xl` for cards, `rounded-full` for pills.

## Motion (Motion.dev)
- **Default ease:** `[0.22, 1, 0.36, 1]` ("editorial").
- **Default duration:** 0.7s (reveal), 0.3s (state).
- Patterns:
  1. Scroll reveal — Y 24px + opacity, stagger 60ms.
  2. Image mask — `clipPath: inset(0 0 0 100%) → inset(0)`.
  3. Word-by-word headline stagger.
  4. Sticky horizontal scroll for service menu.
  5. Cursor halo over before/after.
- Forbidden: spring bounce, confetti, mascots, lottie loops, parallax tilt cards.

## Components
- **Buttons:** primary sage on ivory; outline sage 1px; ghost ink. No shadows. Radius `rounded-full` for CTAs.
- **Cards:** bone surface, 1px border, no shadow at rest; on hover lift `-2px` + brass underline.
- **Inputs:** transparent bg, bottom-border only (1px ink-soft), focus brass 2px.
- **Nav:** sticky, transparent → ivory on scroll; serif wordmark left, sans menu center, sage pill CTA right.
- **Footer:** single-column ivory, brass hairlines, GDC-style registration line, 3 social icons.

## Imagery Rules
- Ratios: 16:9 / 4:5 only. Never square.
- Lighting: f/2.0 softness, warm white balance ~5200K.
- Subjects: hands on chair, fresh flowers, instrument macros, candid practitioner.
- Forbidden: stock smile teeth close-ups, blue gloves, "thumbs up" patient shots.

## Pages
| Route | Purpose |
|---|---|
| `/` | Hero film → press strip → philosophy → services tease → team grid → testimonial → CTA |
| `/services` | Treatment menu with sticky horizontal scroll detail |
| `/team` | Editorial portraits, credentials |
| `/about` | Studio philosophy, virtual tour video |
| `/booking` | Multi-step: type → date/time → details → confirm |
| `/login` | Email magic-link via Supabase |
| `/signup` | Same, with name fields |
| `/dashboard` | Patient appointments + records |
| `/contact` | Address, hours, map, WhatsApp |

## Booking Flow
1. **Type** — New patient / Returning / Specialist consult.
2. **Service** — General / Cosmetic / Implants / Orthodontics / Whitening.
3. **Date & Time** — calendar + slot grid.
4. **Details** — name, phone, email, notes.
5. **Confirm** — review + submit + email confirmation.

## Accessibility
- WCAG AA on all text pairs. Sage on ivory passes for `>=18px` only — body uses ink on ivory.
- `prefers-reduced-motion` disables reveals + masks.
- Focus rings brass `2px offset 2px`.
- All interactive ≥44×44px touch.
