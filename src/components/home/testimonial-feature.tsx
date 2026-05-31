import { Reveal } from "@/components/motion/reveal";

// proof-gap: testimonials
// Do not fabricate quotes. Display a neutral placeholder until real,
// consented patient testimonials are collected.
export function TestimonialFeature() {
  return (
    <section className="py-28 md:py-40 bg-[var(--bone)]">
      <div className="container-editorial max-w-3xl">
        <Reveal>
          <div className="eyebrow mb-10 flex items-center gap-3 justify-center">
            <span className="inline-block h-px w-8 bg-[var(--brass)]" />
            In the words of our patients
            <span className="inline-block h-px w-8 bg-[var(--brass)]" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="font-serif text-[clamp(1.5rem,3vw,2.5rem)] leading-[1.22] tracking-tight text-center text-foreground">
            Testimonials are being collected with our patients&rsquo; consent —
            <span className="italic text-[var(--brass)]"> coming soon</span>.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
            If you are a patient of Om Sai Dental Implant Center and would like
            to share your experience, please let us know at your next visit.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
