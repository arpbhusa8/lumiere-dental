import { Reveal } from "@/components/motion/reveal";

const PILLARS = [
  {
    eyebrow: "Academic Authority",
    body: "Care is led by Dr. Ajit Yadav, MDS — a consultant periodontist and active lecturer at Nobel Medical College. Treatment decisions are informed by current clinical evidence, not guesswork.",
  },
  {
    eyebrow: "Transparent Pricing",
    body: "We explain what a treatment involves and what it will cost before you commit. After your initial assessment you receive a clear, written estimate — no surprises mid-treatment.",
  },
  {
    eyebrow: "Patient-First Comfort",
    body: "Appointments are unhurried and explained in plain language. Modern anaesthesia keeps you comfortable during procedures, and we stay reachable for post-op questions.",
  },
  {
    eyebrow: "Local Specialist, No Travel",
    body: "Specialist implant and periodontal care, delivered in Dharan. There is no need to travel to Kathmandu or across the border for treatment that can be done closer to home.",
  },
];

export function Philosophy() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-editorial grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow mb-6">Our approach</div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Specialist-led dentistry, delivered locally — built around clear
              explanations and considered treatment plans.
            </p>
          </Reveal>
        </div>

        <div className="md:col-span-8">
          <Reveal delay={0.1}>
            <h2 className="display text-[clamp(2.25rem,4.5vw,4.5rem)] leading-[1.02]">
              Considered care, made
              <span className="italic text-[var(--brass)]"> personal</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Om Sai Dental Implant Center is a specialist-consultant clinic for
              adults who want a reliable answer to tooth loss or gum disease.
              Every plan is led personally by Dr. Ajit Yadav and explained
              before any treatment begins.
            </p>
          </Reveal>

          <div className="mt-16 grid sm:grid-cols-2 gap-x-10 gap-y-12 border-t border-border/60 pt-12">
            {PILLARS.map((p, i) => (
              <Reveal key={p.eyebrow} delay={0.3 + i * 0.08}>
                <div>
                  <div className="eyebrow text-[var(--brass)]">{p.eyebrow}</div>
                  <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
