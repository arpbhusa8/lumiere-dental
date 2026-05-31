import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Minimal config: no R2 incremental cache binding, so deployment needs zero
// extra Cloudflare resources and stays fully on the free tier. This is a mostly
// static marketing site + a few dynamic auth/booking routes; ISR pages simply
// re-render rather than persisting a cross-instance cache. If heavy ISR is added
// later, wire `incrementalCache: r2IncrementalCache` and create an R2 bucket.
export default defineCloudflareConfig();
