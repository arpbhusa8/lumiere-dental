import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { TeamPortrait } from "@/components/site/team-portrait";
import { resolveTeam, clinicians } from "@/lib/team";

export function TeamGrid() {
  const docs = clinicians(resolveTeam());

  return (
    <section className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <Reveal>
            <div className="eyebrow mb-6">Meet the team</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] max-w-2xl">
              Care led by a <span className="italic text-[var(--brass)]">consultant periodontist</span>,
              alongside a dental surgeon.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl">
          {docs.map((m) => (
            <StaggerItem key={m.slug}>
              <Link href={`/team#${m.slug}`} className="group block">
                <div className="transition-transform duration-500 group-hover:-translate-y-1">
                  <TeamPortrait name={m.name} photoUrl={m.photoUrl} />
                </div>
                <div className="mt-5">
                  <h3 className="font-serif text-xl tracking-tight">{m.name}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {m.credentials}
                  </p>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.1}>
          <Link
            href="/team"
            className="mt-14 inline-flex items-center gap-2 text-sm text-[var(--brass)] hover:gap-3 transition-all"
          >
            Meet the full team →
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
