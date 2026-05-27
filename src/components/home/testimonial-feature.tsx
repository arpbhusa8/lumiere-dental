import { Reveal } from "@/components/motion/reveal";
import type { Testimonial } from "@/lib/types";

export function TestimonialFeature({ testimonials }: { testimonials: Testimonial[] }) {
  const t = testimonials[0];
  if (!t) return null;
  return (
    <section className="py-28 md:py-40 bg-[var(--bone)]">
      <div className="container-editorial max-w-4xl">
        <Reveal>
          <div className="eyebrow mb-10 flex items-center gap-3 justify-center">
            <span className="inline-block h-px w-8 bg-[var(--brass)]" />
            In the words of our patients
            <span className="inline-block h-px w-8 bg-[var(--brass)]" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="font-serif text-[clamp(1.75rem,3.5vw,3rem)] leading-[1.18] tracking-tight text-center text-foreground">
            <span className="text-[var(--brass)] text-5xl align-top leading-none">“</span>
            {t.quote}
            <span className="text-[var(--brass)] text-5xl align-top leading-none">”</span>
          </blockquote>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 text-center eyebrow text-muted-foreground">
            {t.patient_first_name}{t.treatment ? ` · ${t.treatment}` : ""}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
