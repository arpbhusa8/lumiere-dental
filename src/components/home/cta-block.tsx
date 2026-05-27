import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export function CtaBlock() {
  return (
    <section className="py-28 md:py-40">
      <div className="container-editorial">
        <Reveal>
          <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] px-8 md:px-16 py-20 md:py-28 text-center relative overflow-hidden">
            <div className="eyebrow text-[var(--brass)] mb-6">Begin</div>
            <h2 className="display text-[clamp(2.25rem,5.5vw,5rem)] max-w-3xl mx-auto leading-[0.98]">
              Time well spent on something
              <br />
              <span className="italic">that lasts</span>.
            </h2>
            <p className="mt-8 max-w-md mx-auto text-[var(--ivory)]/75 text-base leading-relaxed">
              Reserve an unhurried first consultation with one of our clinicians.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] hover:text-[var(--forest)] h-12 px-7"
              >
                <Link href="/booking">Book consultation</Link>
              </Button>
              <Link
                href="tel:+442079460000"
                className="text-sm tracking-wide underline-offset-8 underline decoration-[var(--brass)] hover:decoration-[var(--ivory)] transition-colors"
              >
                Or call +44 20 7946 0000
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
