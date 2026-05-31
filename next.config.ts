import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cloudflare Workers has no built-in Next image optimizer (no IMAGES binding),
  // so the /_next/image endpoint 400s there. Our portraits are already small,
  // display-sized WebP, so serve them as-is: next/image emits a direct <img>
  // pointing at the original asset (200 on both Cloudflare and Node).
  images: { unoptimized: true },
};

export default nextConfig;

// Cloudflare (OpenNext) local dev binding. No-op under `next dev`; lets
// `getCloudflareContext()` work in development. Harmless on Vercel too.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
