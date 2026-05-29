import { MapPin, Navigation } from "lucide-react";

// Clinic location — Dharan-2, Desi Line, Sunsari, Nepal.
// Keyless Google Maps embed (q + output=embed) — no API key or billing required.
const MAPS_QUERY = "Om Sai Dental Implant Center, Dharan-2, Sunsari, Nepal";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;

// At rest the tiles are warmed toward the ivory + sage palette; on hover they ease
// back to a natural, fully legible map for wayfinding.
const REST_FILTER =
  "[filter:saturate(0.78)_sepia(0.16)_hue-rotate(-6deg)_brightness(1.03)_contrast(0.93)]";
const HOVER_FILTER = "group-hover:[filter:saturate(1)_sepia(0)_hue-rotate(0deg)]";

export function ClinicMap({ className = "" }: { className?: string }) {
  return (
    <figure
      className={`group relative rounded-[1.4rem] border border-border bg-[var(--background)] p-2.5 shadow-[0_1px_2px_oklch(0.3_0.02_145/0.06),0_12px_40px_-12px_oklch(0.3_0.02_145/0.18)] ${className}`}
    >
      <div className="relative overflow-hidden rounded-[1rem] ring-1 ring-[var(--forest)]/10">
        {/* Top caption — brand label, non-interactive */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-4 py-3 bg-gradient-to-b from-[var(--background)]/85 via-[var(--background)]/40 to-transparent">
          <span className="eyebrow flex items-center gap-1.5 text-[var(--forest)]">
            <MapPin className="size-3" />
            Clinic location
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Dharan · Nepal
          </span>
        </div>

        <div className="aspect-[5/4]">
          <iframe
            title="Map to Om Sai Dental Implant Center, Dharan-2"
            src={EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className={`h-full w-full border-0 transition-[filter] duration-700 ease-out ${REST_FILTER} ${HOVER_FILTER}`}
          />
        </div>

        {/* Bottom bar — address tag + directions CTA over a soft sage scrim */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 bg-gradient-to-t from-[var(--forest)]/30 via-[var(--forest)]/5 to-transparent">
          <span className="pointer-events-auto rounded-full bg-[var(--background)]/90 px-3.5 py-1.5 font-serif text-sm text-[var(--forest)] shadow-sm backdrop-blur">
            Desi Line, Dharan-2
          </span>
          <a
            href={DIRECTIONS_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto inline-flex items-center gap-1.5 rounded-full bg-[var(--forest)] px-4 py-2 text-xs font-medium text-[var(--background)] shadow-sm transition-all hover:bg-[var(--brass)] hover:gap-2.5"
          >
            <Navigation className="size-3.5" />
            Get directions
          </a>
        </div>
      </div>
    </figure>
  );
}
