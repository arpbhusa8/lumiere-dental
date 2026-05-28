# Om Sai Dental Implant Center — Design System

> Specialist implant + periodontal clinic in Dharan, Nepal. Editorial, calm, clinically authoritative. Brand name: `Om Sai Dental Implant Center` (short: `Om Sai Dental`).

## Brand Positioning
- **Tone:** authoritative-warm. Expert, reassuring, professional. Academic voice softened by patient-first warmth.
- **Audience:** adults 35–65 in Dharan and the wider Sunsari district who need a reliable tooth-replacement (implants) or gum-disease (periodontal) solution — typically professionals, parents, and elders weighing local care vs. travelling to Kathmandu or India.
- **Positioning (Lumen):** for adults 35–65 in Dharan, Om Sai Dental Implant Center is the specialist-consultant clinic that pairs academic authority with transparent, locally-delivered care — unlike generic dental shops or distant hospital departments — because Dr. Ajit Yadav is an MDS-qualified Periodontist, Implantologist, and Nobel Medical College (Biratnagar) lecturer.
- **4 messaging pillars:**
  1. **Academic Authority** — MDS Periodontology + Nobel Medical College lecturer.
  2. **Transparent Pricing** — a published guide answers "how much" before the chair.
  3. **Patient-First Comfort** — dedicated post-op hotline, plain-language explanations.
  4. **Local Specialist, No Travel** — specialist care without trips to Kathmandu or India.
- **DO words:** expert, guide, explain, reassure, trusted, clear, specialist, consult, MDS, periodontist, implantologist.
- **BANNED words (hard reject in copy, meta, alt text, captions):** `discount`, `cheapest`, `best`, `miracle`, `guarantee`, `elite`, `50% off`, `limited offer`, `painless guarantee`, `100% success`, `Nepal's #1`, `smile makeover`, `smile journey`, `transform your smile`, `dream smile`, `luxury`, `premier`, `top-tier`, `world-class`, `exclusive`.
- **Anti-pattern visuals:** cartoon teeth, neon blue, "smile" wordmarks, comic-sans warmth, stock thumbs-up patient shots, deal/discount badges.
- **Architectural rule:** brand-first, location-agnostic titles/nav/meta. "Dharan" appears in body content, not as part of the wordmark. Locations module is built to accept N clinics (future Kathmandu branch) — today renders one card for Dharan-2, Desi Line, Sunsari.

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
| `/` | Hero (Dr. Ajit, expert implantologist in Dharan) → credentials strip → 3 value props → services tease → team → testimonial → FAQ → CTA |
| `/services` | Treatment menu with sticky horizontal scroll detail |
| `/implants` | Pillar page — Dental Implant Specialist in Dharan (Dr. Ajit Yadav, MDS) |
| `/pricing-guide` | Pillar page — Dental Implant Cost Guide (transparent ranges, owner-approved only) |
| `/gum-disease` | Pillar page — Gum Disease Treatment in Dharan, expert periodontal care |
| `/journal` | Editorial articles — pricing, procedure walk-throughs, gum-health guides |
| `/team` | Editorial portraits, credentials |
| `/about` | Clinic philosophy, MDS-led care narrative |
| `/booking` | Multi-step: visit type → focus → date/time → details → confirm |
| `/login` | Email magic-link via Supabase |
| `/signup` | Same, with name fields |
| `/dashboard` | Patient appointments + records |
| `/contact` | Address (Dharan-2, Desi Line, Sunsari), hours, map, phone, WhatsApp |

## Booking Flow
1. **Visit type** — New patient / Returning / Specialist consult (implant or periodontal).
2. **Focus** — Implant consultation / Periodontal (gum-disease) assessment / Restoration follow-up / General assessment.
3. **Date & Time** — calendar + slot grid (real availability table planned; see `NEXT.md`).
4. **Details** — name, phone, email, optional notes (e.g. previous X-rays, referral, language preference).
5. **Confirm** — review + submit → email + WhatsApp confirmation (Resend integration planned). Phone fallback: `025-538312`.

## Accessibility
- WCAG AA on all text pairs. Sage on ivory passes for `>=18px` only — body uses ink on ivory.
- `prefers-reduced-motion` disables reveals + masks.
- Focus rings brass `2px offset 2px`.
- All interactive ≥44×44px touch.
