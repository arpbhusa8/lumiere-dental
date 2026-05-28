import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

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
            <div className="aspect-[5/4] rounded-2xl overflow-hidden bg-[var(--muted)] relative border border-border">
              <svg viewBox="0 0 600 480" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
                <rect width="600" height="480" fill="oklch(0.92 0.014 85)" />
                <g stroke="oklch(0.7 0.02 85)" strokeWidth="0.5" fill="none">
                  {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 24} x2="600" y2={i * 24} />
                  ))}
                  {Array.from({ length: 25 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 24} y1="0" x2={i * 24} y2="480" />
                  ))}
                </g>
                <g fill="none" stroke="oklch(0.5 0.02 85 / 0.5)" strokeWidth="2">
                  <path d="M0 220 Q 200 200 280 240 T 600 280" />
                  <path d="M150 0 Q 180 150 250 230 T 350 480" />
                </g>
                <g>
                  <circle cx="280" cy="240" r="22" fill="oklch(0.301 0.025 145)" opacity="0.18" />
                  <circle cx="280" cy="240" r="10" fill="oklch(0.301 0.025 145)" />
                  <circle cx="280" cy="240" r="3" fill="oklch(0.957 0.014 85)" />
                </g>
                <text x="300" y="262" fill="oklch(0.301 0.025 145)" style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 14 }}>
                  Om Sai
                </text>
              </svg>
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3" />
                  Dharan-2 · Desi Line
                </span>
                <a
                  href="https://maps.google.com/?q=Om+Sai+Dental+Implant+Center+Dharan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
