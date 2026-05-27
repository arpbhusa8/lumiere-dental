import { Reveal } from "@/components/motion/reveal";

export function Philosophy() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-editorial grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow mb-6">Philosophy</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              We treat fewer patients than most clinics. Each appointment is an hour,
              never less.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal delay={0.1}>
            <h2 className="display text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.02]">
              Considered care, made
              <span className="italic text-[var(--brass)]"> beautifully</span> personal.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Lumière is a private studio built for unhurried, evidence-led dentistry.
              Our practitioners are quietly accomplished — university lecturers and award-winning
              clinicians who choose to see only a handful of patients each day. The result is
              dentistry that feels less like a procedure, and more like time set aside for you.
            </p>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-3 gap-8 sm:gap-14 border-t border-border/60 pt-10">
            {[
              { kpi: "1:1", label: "Practitioner to patient" },
              { kpi: "60 min", label: "Standard appointment" },
              { kpi: "1,200+", label: "Bespoke smiles delivered" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={0.3 + i * 0.08}>
                <div>
                  <div className="font-serif text-4xl md:text-5xl tracking-tight">{s.kpi}</div>
                  <div className="mt-2 eyebrow">{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
