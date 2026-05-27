import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Service } from "@/lib/types";

export function ServicesTeaser({ services }: { services: Service[] }) {
  const featured = services.slice(0, 6);
  return (
    <section className="py-28 md:py-36 bg-[var(--forest)] text-[var(--ivory)]">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <Reveal>
            <div className="eyebrow mb-6 text-[var(--brass)]">Treatments</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.75rem)] tracking-tight max-w-xl">
              A short, considered <span className="italic">menu</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm tracking-wide pb-1 border-b border-[var(--ivory)]/30 hover:border-[var(--brass)] transition-colors"
            >
              View full menu
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
              <Link href={`/services#${s.slug}`} className="block">
                <div className="flex items-start justify-between mb-10">
                  <span className="eyebrow text-[var(--brass)]/90">{s.category}</span>
                  <ArrowUpRight className="size-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="font-serif text-3xl tracking-tight leading-tight">{s.name}</h3>
                {s.price_from && (
                  <div className="mt-6 text-sm text-[var(--ivory)]/70">
                    From £{s.price_from.toLocaleString()}
                  </div>
                )}
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
