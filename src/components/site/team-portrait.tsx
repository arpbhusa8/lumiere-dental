import Image from "next/image";
import { initials } from "@/lib/team";

type TeamPortraitProps = {
  name: string;
  photoUrl: string | null;
  /** Tailwind aspect ratio class, defaults to portrait 4/5. */
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Renders a member's photo when available, otherwise a typographic initials
 * fallback in the brand sand/sage palette. Server-safe (no client hooks).
 */
export function TeamPortrait({
  name,
  photoUrl,
  className = "aspect-[4/5]",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  priority = false,
}: TeamPortraitProps) {
  return (
    <div
      className={`${className} rounded-xl overflow-hidden relative bg-[var(--muted)]`}
    >
      {photoUrl ? (
        <Image
          src={photoUrl}
          alt={`${name} portrait`}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[var(--secondary)]">
          <span
            aria-hidden
            className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-[var(--forest)]/60 tracking-tight"
          >
            {initials(name)}
          </span>
          <span className="sr-only">{name} — photo coming soon</span>
        </div>
      )}
    </div>
  );
}
