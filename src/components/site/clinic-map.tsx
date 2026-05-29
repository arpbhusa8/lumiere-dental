import { MapPin, Navigation } from "lucide-react";

// Clinic location — Dharan-2, Desi Line, Sunsari, Nepal.
// Keyless Google Maps embed (q + output=embed) — no API key or billing required.
const MAPS_QUERY = "Om Sai Dental Implant Center, Dharan-2, Sunsari, Nepal";
const EMBED_SRC = `https://www.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
const DIRECTIONS_HREF = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;

export function ClinicMap({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl overflow-hidden relative border border-border bg-[var(--muted)] ${className}`}
    >
      <div className="aspect-[5/4]">
        <iframe
          title="Map to Om Sai Dental Implant Center, Dharan-2"
          src={EMBED_SRC}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full border-0 grayscale-[0.15] contrast-[0.95]"
          allowFullScreen
        />
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3 text-xs">
        <span className="flex items-center gap-1.5 rounded-full bg-[var(--background)]/90 px-3 py-1.5 text-muted-foreground backdrop-blur">
          <MapPin className="size-3" />
          Dharan-2 · Desi Line
        </span>
        <a
          href={DIRECTIONS_HREF}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-full bg-[var(--forest)] px-3 py-1.5 text-[var(--background)] transition-opacity hover:opacity-90"
        >
          <Navigation className="size-3" />
          Get directions
        </a>
      </div>
    </div>
  );
}
