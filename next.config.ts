import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;

// Cloudflare (OpenNext) local dev binding. No-op under `next dev`; lets
// `getCloudflareContext()` work in development. Harmless on Vercel too.
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
