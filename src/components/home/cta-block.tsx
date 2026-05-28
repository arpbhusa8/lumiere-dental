import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
              Ready to discuss
              <br />
              <span className="italic">your treatment?</span>
            </h2>
            <p className="mt-8 max-w-lg mx-auto text-[var(--ivory)]/75 text-base leading-relaxed">
              Speak directly with Dr. Ajit Yadav about implants, gum care, or a
              full assessment. Call the clinic or message on WhatsApp — we will
              guide you through the next step.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] hover:text-[var(--forest)] h-12 px-7"
              >
                <Link href="tel:+97725538312">Book a consultation</Link>
              </Button>
              <Link
                href="https://wa.me/9779852057909"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm tracking-wide underline-offset-8 underline decoration-[var(--brass)] hover:decoration-[var(--ivory)] transition-colors"
              >
                <MessageCircle className="size-4" />
                WhatsApp Dr. Ajit
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
