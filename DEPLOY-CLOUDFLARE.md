# Deploying to Cloudflare Workers (free tier)

This app runs on **Cloudflare Workers** via the [OpenNext](https://opennext.js.org/cloudflare)
adapter. At ~100 users/day it sits comfortably inside the **free** plan, and unlike
Vercel's Hobby plan, Cloudflare's free tier **permits commercial use**.

## Why this stack is $0/month and ToS-clean

| Layer | Service | Free-tier headroom | Commercial OK? |
|-------|---------|--------------------|----------------|
| Host / SSR | Cloudflare Workers (OpenNext) | 100,000 requests/**day** (site ≈ 100 users/day); static assets unlimited | ✅ Yes |
| DB + Auth | Supabase Free | 500 MB DB, 50k MAU, unlimited API, 5 GB egress | ✅ Yes |
| Analytics | PostHog Free | 1M events/mo (no-ops without a key) | ✅ Yes |
| DNS / CDN | Cloudflare | Free | ✅ Yes |

> Supabase free projects pause after **7 days of zero DB activity** — daily booking
> traffic prevents that. If the site might go idle, run a tiny daily query (e.g. a
> Cloudflare Cron Trigger) to keep it warm.

## One-time setup

1. Create a free Cloudflare account (`wrangler` is already a dev dependency — no global install needed).
2. Authenticate (run this yourself in the terminal — interactive):
   ```bash
   pnpm exec wrangler login
   ```
3. Set the public env vars as Worker vars/secrets (values from your `.env.local`):
   ```bash
   pnpm exec wrangler secret put NEXT_PUBLIC_SUPABASE_URL
   pnpm exec wrangler secret put NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
   pnpm exec wrangler secret put NEXT_PUBLIC_SITE_URL          # https://your-domain
   pnpm exec wrangler secret put NEXT_PUBLIC_SITE_NAME
   ```
   (Or set them under Workers → your worker → Settings → Variables in the dashboard.)
4. In **Supabase → Auth → URL Configuration**, add the Cloudflare URL(s) to
   **Site URL** and **Redirect URLs** so magic-link `/auth/callback` works in prod.

## Deploy

```bash
pnpm cf:preview   # build + run the Worker locally (workerd) to smoke-test
pnpm cf:deploy    # build + deploy to Cloudflare
```

`cf:deploy` runs `opennextjs-cloudflare build` (which runs `next build`) then
`opennextjs-cloudflare deploy`. First deploy gives a `*.workers.dev` URL; add a
custom domain under the Worker's **Triggers / Custom Domains**.

## Local commands

| Command | What it does |
|---------|--------------|
| `pnpm dev` | Next dev server (unchanged) |
| `pnpm cf:build` | Produce `.open-next/worker.js` |
| `pnpm cf:preview` | Build + local Workers runtime preview |
| `pnpm cf:deploy` | Build + deploy to Cloudflare |
| `pnpm cf:typegen` | Regenerate `cloudflare-env.d.ts` binding types |

## Notes / gotchas

- **No `export const runtime = "edge"`** anywhere — OpenNext runs the full Node.js
  server on Workers (`nodejs_compat`). Don't add edge-runtime exports.
- `middleware.ts` (Supabase session refresh) runs as the Worker's proxy — supported.
- `.open-next/`, `.wrangler/`, and `cloudflare-env.d.ts` are git-ignored build output.
- `public/_headers` sets immutable caching for `/_next/static/*` and a 1-day cache
  for `/team/*` images.
- No R2 bucket is required — `open-next.config.ts` uses the default (no persistent
  ISR cache), keeping deployment to zero extra resources. Add R2 only if heavy ISR
  is introduced later.
- Vercel still works from this branch (the OpenNext dev hook is a no-op there), so
  you can A/B the two hosts before cutting DNS over.
