import { Reveal } from "@/components/motion/reveal";

export const metadata = { title: "Studio" };

const RITUAL = [
  {
    n: "01",
    title: "Arrival",
    body: "A short walk from Bond Street. You will be greeted by name and shown to our reading room — espresso, herbal infusion, or simply quiet.",
  },
  {
    n: "02",
    title: "Consultation",
    body: "An unhurried hour with your clinician. We listen first, examine second, and never propose a treatment plan in the same appointment.",
  },
  {
    n: "03",
    title: "Treatment",
    body: "Cinematic ceilings, noise-cancelling headphones and aromatherapy. Every chair faces a courtyard window.",
  },
  {
    n: "04",
    title: "Aftercare",
    body: "Three follow-ups, a direct phone number and an aftercare concierge for the first thirty days.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Philosophy</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.03em] max-w-4xl">
            A studio. <span className="italic text-[var(--brass)]">Not a clinic</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Lumière was founded on a simple frustration: that dental care, when done with conviction
            and time, is among the most beautiful and consequential gifts one can give another person.
            We built a studio that treats it that way.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--forest)] relative">
              <svg viewBox="0 0 400 500" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid slice">
                <defs>
                  <linearGradient id="abg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.4 0.04 145)" />
                    <stop offset="100%" stopColor="oklch(0.22 0.025 145)" />
                  </linearGradient>
                </defs>
                <rect width="400" height="500" fill="url(#abg)" />
                <g stroke="oklch(0.85 0.04 85 / 0.45)" strokeWidth="0.8" fill="none">
                  <path d="M50 460 C 100 380, 90 280, 130 200 C 175 110, 200 60, 195 10" />
                  <path d="M250 480 C 230 370, 270 260, 240 180 C 215 110, 230 50, 270 20" />
                  <path d="M340 470 C 330 350, 345 260, 320 170" />
                  <circle cx="290" cy="100" r="48" fill="oklch(0.85 0.06 75 / 0.12)" stroke="none" />
                </g>
              </svg>
            </div>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <h2 className="display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02]">
              Time set aside for <span className="italic text-[var(--brass)]">you</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              Our calendars are deliberately sparse. A typical Lumière day holds six to eight
              patients across four clinicians. The pace allows for thinking, for listening,
              and for the small details that distinguish excellent work from ordinary work.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              We invest in the best — microscopes, CBCT imaging, intra-oral scanners and
              ceramicists trained in the Vienna school — but the most important investment
              is the unhurried hour itself.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">The ritual</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-2xl">
            Four acts. One <span className="italic">unhurried</span> visit.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border/60 pt-12">
          {RITUAL.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.08}>
              <div className="font-serif italic text-[var(--brass)] text-2xl mb-6">{r.n}</div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
