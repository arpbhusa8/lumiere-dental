import { Reveal } from "@/components/motion/reveal";

export const metadata = { title: "About" };

const PILLARS = [
  {
    n: "01",
    title: "Specialist consult",
    body: "Every patient begins with a structured conversation led by Dr. Ajit Yadav, MDS — Consultant Periodontist and Implantologist. We listen first, examine second, and explain what we find in language you can act on.",
  },
  {
    n: "02",
    title: "Evidence-led plan",
    body: "Treatment plans are built around current periodontal and implant literature. As a lecturer at Nobel Medical College, Biratnagar, Dr. Ajit teaches the same protocols he uses in chair-side practice.",
  },
  {
    n: "03",
    title: "Considered treatment",
    body: "Implants, gum care and restorations are delivered at a measured pace. We sequence visits around healing time and your schedule rather than around appointment slots.",
  },
  {
    n: "04",
    title: "Plain post-op support",
    body: "A direct phone line for the days that follow your procedure. Call or WhatsApp if something feels off — you reach a clinician, not a queue.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Philosophy</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.03em] max-w-4xl">
            A specialist practice. <span className="italic text-[var(--brass)]">Rooted in Dharan</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Om Sai Dental Implant Center is a consultant-led clinic in Dharan focused on
            dental implants and periodontal care. Our work is shaped by an academic habit:
            keep reading, keep questioning, and bring that thinking into every consultation.
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
              Academic authority, <span className="italic text-[var(--brass)]">chair-side</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              Dr. Ajit Yadav holds an MDS in Periodontology and lectures at Nobel Medical College,
              Biratnagar. That teaching role is not a credential on a wall — it keeps the practice
              honest. The protocols we use are the protocols he stands behind in a classroom.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Specialist-level implant and periodontal care has historically meant a trip to
              Kathmandu or across the border. Om Sai exists so that patients in eastern Nepal can
              be assessed, planned and treated by a consultant periodontist close to home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">How we work</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-2xl">
            Four pillars. One <span className="italic">considered</span> approach.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border/60 pt-12">
          {PILLARS.map((r, i) => (
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
