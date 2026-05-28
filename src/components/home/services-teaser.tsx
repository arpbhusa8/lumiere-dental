import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Service } from "@/lib/types";

const FALLBACK_SERVICES: Array<{
  id: string;
  slug: string;
  name: string;
  category: string;
}> = [
  { id: "implants", slug: "dental-implants", name: "Dental Implants", category: "Implantology" },
  { id: "full-mouth", slug: "full-mouth-rehabilitation", name: "Full-Mouth Rehabilitation", category: "Restorative" },
  { id: "perio", slug: "periodontal-treatment", name: "Periodontal (Gum Disease) Treatment", category: "Periodontology" },
  { id: "perio-surgery", slug: "periodontal-surgery", name: "Periodontal Surgery", category: "Periodontology" },
  { id: "routine", slug: "routine-dental-care", name: "Routine Dental Care", category: "Preventive" },
  { id: "cosmetic", slug: "cosmetic-dentistry", name: "Cosmetic Dentistry", category: "Aesthetic" },
];

export function ServicesTeaser({ services }: { services: Service[] }) {
  const featured = services.length > 0 ? services.slice(0, 6) : FALLBACK_SERVICES;
  return (
    <section className="py-28 md:py-36 bg-[var(--forest)] text-[var(--ivory)]">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <div className="eyebrow mb-6 text-[var(--brass)]">Treatments</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] tracking-tight max-w-xl">
              Specialist <span className="italic">care</span>, end to end.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm tracking-wide pb-1 border-b border-[var(--ivory)]/30 hover:border-[var(--brass)] transition-colors"
            >
              View all treatments
              <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>

        <Stagger className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[var(--ivory)]/10 rounded-xl overflow-hidden border border-[var(--ivory)]/10">
          {featured.map((s) => (
            <StaggerItem
              key={s.id}
              className="bg-[var(--forest)] p-8 md:p-10 group hover:bg-[oklch(0.34_0.025_145)] transition-colors duration-500"
            >
              <Link href="/services" className="block">
                <div className="flex items-start justify-between mb-10">
                  <span className="eyebrow text-[var(--brass)]/90">{s.category}</span>
                  <ArrowUpRight className="size-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif text-3xl tracking-tight leading-tight">{s.name}</h3>
                <div className="mt-6 text-sm text-[var(--ivory)]/70">
                  Estimate provided after assessment
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
