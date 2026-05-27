import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Practitioner } from "@/lib/types";

export function TeamGrid({ practitioners }: { practitioners: Practitioner[] }) {
  return (
    <section className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <Reveal>
            <div className="eyebrow mb-6">The studio</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] max-w-xl">
              Practitioners worth <span className="italic text-[var(--brass)]">the journey</span>.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {practitioners.map((p) => (
            <StaggerItem key={p.id}>
              <Link href={`/team#${p.slug}`} className="group block">
                <PractitionerPortrait name={p.name} />
                <div className="mt-5">
                  <h3 className="font-serif text-xl tracking-tight">{p.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground">{p.credentials}</p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}

function PractitionerPortrait({ name }: { name: string }) {
  const initials = name
    .replace(/^Dr\s|^Mrs?\s/, "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[var(--muted)] group-hover:bg-[var(--secondary)] transition-colors">
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`p-${initials}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.025 85)" />
            <stop offset="100%" stopColor="oklch(0.72 0.022 95)" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill={`url(#p-${initials})`} />
        <circle cx="100" cy="95" r="38" fill="oklch(0.58 0.022 145 / 0.35)" />
        <path d="M40 250 C 40 180, 160 180, 160 250 Z" fill="oklch(0.58 0.022 145 / 0.32)" />
        <text
          x="100"
          y="230"
          textAnchor="middle"
          className="fill-[oklch(0.301_0.025_145)]"
          style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 38, fontWeight: 300, fontStyle: "italic" }}
        >
          {initials.toLowerCase()}
        </text>
      </svg>
      <div className="absolute inset-0 bg-[var(--forest)]/0 group-hover:bg-[var(--forest)]/10 transition-colors duration-500" />
    </div>
  );
}
