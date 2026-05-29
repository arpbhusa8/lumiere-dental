import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ClinicMap } from "@/components/site/clinic-map";

export function Location() {
  return (
    <section className="py-28 md:py-36 bg-[var(--secondary)]/30">
      <div className="container-editorial grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow mb-6">Find us</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] max-w-xl">
              A consultant clinic in <span className="italic text-[var(--brass)]">Dharan-2</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 font-serif text-xl leading-tight">
              Om Sai Dental Implant Center<br />
              Dharan-2, Desi Line<br />
              Sunsari, Nepal
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-6 space-y-3 text-sm">
              <a
                href="tel:+97725538312"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="size-4" />
                025-538312
              </a>
              <a
                href="https://wa.me/9779852057909"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="size-4" />
                WhatsApp Dr. Ajit
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <Button asChild size="lg" className="mt-8 rounded-full h-12 px-7">
              <Link href="/contact">Visit &amp; opening details</Link>
            </Button>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <ClinicMap />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
