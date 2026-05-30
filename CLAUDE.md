# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (see `pnpm-workspace.yaml`, `pnpm-lock.yaml`). Next.js 16 runs Turbopack by default — no flag needed.

```bash
pnpm install                                            # deps
npx playwright install --with-deps chromium             # one-time browser install
pnpm dev                                                # http://localhost:3000
pnpm build                                              # production build
pnpm start                                              # serve built app
pnpm lint                                               # eslint (flat config, eslint.config.mjs)
pnpm test:e2e                                           # full Playwright suite (boots dev server)
pnpm test:e2e:ui                                        # Playwright UI mode
pnpm exec playwright test tests/e2e/booking.spec.ts     # single spec
pnpm exec playwright test --project=mobile              # iPhone 14 project only
PLAYWRIGHT_BASE_URL=https://… pnpm exec playwright test --project=chromium  # run against deployed URL
```

There is no unit-test runner — only Playwright e2e. Quality gate = `pnpm lint && pnpm build && pnpm test:e2e`.

## Architecture

**Stack:** Next.js 16.2 App Router (Turbopack, React 19) · Tailwind v4 (CSS-tokens-only, no `tailwind.config`) · shadcn/ui Nova preset · Supabase (Postgres + RLS, magic-link auth) · Motion.dev · react-hook-form + Zod · Playwright.

**Auth + session refresh.** `middleware.ts` matches every non-asset request and calls `updateSession` (`src/lib/supabase/middleware.ts`), which constructs a server Supabase client over request cookies and calls `supabase.auth.getUser()` to refresh the session on every navigation. There are three Supabase client factories — keep them separate:
- `src/lib/supabase/client.ts` — browser
- `src/lib/supabase/server.ts` — RSC / server actions
- `src/lib/supabase/middleware.ts` — edge middleware only

**Anon booking flow.** RLS blocks anon INSERT on `appointments`. The booking server action (`src/app/booking/actions.ts`) Zod-validates input, then calls `supabase.rpc("create_appointment", …)` — a `SECURITY DEFINER` RPC added in migration `003`. Never INSERT into `appointments` directly from client/server code — go through the RPC.

**Supabase migrations are ordered and not idempotent.** Apply in numeric order:
1. `001_lumiere_dental_schema.sql` — tables + RLS + initial seed (incl. `patient_profiles`, `appointments` with `patient_id = auth.uid()`)
2. `002_fix_appointment_grants.sql` — anon/authenticated grants
3. `003_create_appointment_rpc.sql` — booking RPC
4. `004_omsai_reseed.sql` — Om Sai brand reseed (replaces practitioner roster + services, clears testimonials)
5. `005_omsai_team_additions.sql` — adds Dr. Priyesh Kamat to bookable roster (`ON CONFLICT`-guarded)
6. `006_profiles_and_roles.sql` — customer/admin roles foundation: `user_role` enum, `patient_profiles.role`, `is_admin()`, `handle_new_user()` signup trigger, `admin_set_role()` (self-escalation blocked — role only changes via this RPC)
7. `007_appointments_admin_access.sql` — admin-wide RLS on `appointments` (sits alongside self policies via permissive-OR; needs `is_admin()` from 006)

`004` overwrites seed data from `001` — applying out of order yields the wrong roster. **Customer portal (`/account`) + admin dashboard (`/admin`) extend the existing schema — they do NOT add a `profiles` table or `appointments.user_id` column; auth-linking reuses the `patient_id = auth.uid()` set by `create_appointment`.** Schema changes go in new numbered migrations; mirror every applied change in `supabase/migrations/`.

**Brand is Om Sai, not Lumière.** Repo name / Vercel project slug / migration `001` still say "Lumière" (placeholder from scaffold). Real client = **Om Sai Dental Implant Center**, Dharan, Nepal; lead = **Dr. Ajit Yadav, MDS**. Single source of truth for copy, banned words, and proof gaps: [`.brief/SOURCE.md`](./.brief/SOURCE.md) — consult before writing UI copy. Do **not** invent prices, credentials, testimonials, or equipment claims; current proof gaps are tracked in `STATE.md` and must be owner-confirmed before publish.

**Motion + design tokens.** Editorial easing `[0.22, 1, 0.36, 1]`. Palette + type + motion primitives (`Reveal`, `Stagger`, `WordStagger` under `src/components/motion/`) documented in [`DESIGN.md`](./DESIGN.md). Tailwind v4 tokens live in `src/app/globals.css` — OKLCH-based, warm ivory + sage, overriding shadcn's neutral base.

**Analytics.** PostHog provider (`src/components/analytics/posthog-provider.tsx`) no-ops when `NEXT_PUBLIC_POSTHOG_KEY` is absent — safe to leave unset locally.

**Path alias:** `@/*` → `src/*` (see `tsconfig.json`, `components.json`).

## Project status pointers

- [`STATE.md`](./STATE.md) — what is built, proof gaps blocking publish, Vercel/Supabase project IDs
- [`NEXT.md`](./NEXT.md) — prioritised roadmap
- [`DESIGN.md`](./DESIGN.md) — design-system spec
- [`README.md`](./README.md) — route map + DB schema overview

<!-- BEGIN BEADS INTEGRATION v:1 profile:minimal hash:7510c1e2 -->
## Beads Issue Tracker

This project uses **bd (beads)** for issue tracking. Run `bd prime` to see full workflow context and commands.

### Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --claim  # Claim work
bd close <id>         # Complete work
```

### Rules

- Use `bd` for ALL task tracking — do NOT use TodoWrite, TaskCreate, or markdown TODO lists
- Run `bd prime` for detailed command reference and session close protocol
- Use `bd remember` for persistent knowledge — do NOT use MEMORY.md files

**Architecture in one line:** issues live in a local Dolt DB; sync uses `refs/dolt/data` on your git remote; `.beads/issues.jsonl` is a passive export. See https://github.com/gastownhall/beads/blob/main/docs/SYNC_CONCEPTS.md for details and anti-patterns.

## Session Completion

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds
<!-- END BEADS INTEGRATION -->
