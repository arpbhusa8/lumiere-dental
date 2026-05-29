import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { ClinicMap } from "@/components/site/clinic-map";
import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";

export const metadata = { title: "Visit" };

export default function ContactPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Visit</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            A consultant clinic in <span className="italic text-[var(--brass)]">Dharan-2</span>.
          </h1>
        </Reveal>
      </section>

      <section className="container-editorial mt-20 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5 space-y-10">
          <Reveal>
            <div className="eyebrow mb-3 text-[var(--brass)]">Clinic</div>
            <p className="font-serif text-2xl leading-tight">
              Om Sai Dental Implant Center<br />
              Dharan-2, Desi Line<br />
              Sunsari, Nepal
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="size-4" />
                <a href="tel:+97725538312" className="hover:text-foreground transition-colors">
                  025-538312
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="size-4" />
                {/* proof-gap: email */}
                <a href="mailto:info@omsaidental.com" className="hover:text-foreground transition-colors">
                  info@omsaidental.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MessageCircle className="size-4" />
                <a
                  href="https://wa.me/9779852057909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  WhatsApp Dr. Ajit
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="eyebrow mb-4 text-[var(--brass)]">Hours</div>
            {/* proof-gap: hours */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
              Operating hours coming soon — please call to confirm.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <Button asChild size="lg" className="rounded-full h-12 px-7">
              <Link href="/booking">Book a consultation</Link>
            </Button>
          </Reveal>
        </div>

        <div className="md:col-span-7">
          <Reveal>
            <ClinicMap />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
