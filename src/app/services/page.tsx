import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";

export const metadata = { title: "Treatments" };

type Treatment = { name: string; description: string };
type Category = { key: string; label: string; items: Treatment[] };

const CATEGORIES: Category[] = [
  {
    key: "implants",
    label: "Implants",
    items: [
      {
        name: "Single Implant",
        description: "Replacement of one missing tooth with a titanium implant and matched crown.",
      },
      {
        name: "Multi-Tooth Implant",
        description: "Two or more implants supporting a fixed bridge across adjacent missing teeth.",
      },
      {
        name: "Full-Mouth Rehabilitation",
        description: "Comprehensive implant-based reconstruction for patients missing most or all teeth.",
      },
      {
        name: "Implant-Supported Denture",
        description: "A removable denture anchored on implants for added stability and chewing comfort.",
      },
    ],
  },
  {
    key: "periodontal",
    label: "Periodontal Care",
    items: [
      {
        name: "Gum Disease Treatment",
        description: "Assessment and staged care for gingivitis and periodontitis led by a consultant periodontist.",
      },
      {
        name: "Scaling & Root Planing",
        description: "Deep cleaning below the gumline to remove tartar and bacterial deposits.",
      },
      {
        name: "Periodontal Surgery",
        description: "Surgical procedures to access, clean and reshape tissues affected by advanced gum disease.",
      },
      {
        name: "Gum Recession Treatment",
        description: "Soft-tissue procedures to cover exposed roots and stabilize the gum margin.",
      },
    ],
  },
  {
    key: "general",
    label: "General Dentistry",
    items: [
      {
        name: "Routine Examination",
        description: "A full oral health check covering teeth, gums and soft tissues.",
      },
      {
        name: "Cleaning",
        description: "Professional cleaning to remove plaque and surface stains.",
      },
      {
        name: "Fillings",
        description: "Tooth-coloured restorations for cavities and minor structural loss.",
      },
      {
        name: "Extractions",
        description: "Removal of teeth that cannot be restored, including simple and surgical cases.",
      },
    ],
  },
  {
    key: "cosmetic",
    label: "Cosmetic",
    items: [
      {
        name: "Teeth Whitening",
        description: "Supervised whitening to lift staining and brighten natural tooth shade.",
      },
      {
        name: "Composite Bonding",
        description: "Direct tooth-coloured composite to reshape edges, close small gaps or repair chips.",
      },
      {
        name: "Veneers",
        description: "Thin facings bonded to the front of teeth to refine shape and colour.",
      },
    ],
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Treatments</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            Specialist care for <span className="italic text-[var(--brass)]">implants, gums and everyday teeth</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Every treatment plan begins with a consultation, a clinical examination and a written
            estimate. We explain what the procedure involves, how long it takes and what to expect
            during healing — before any work begins.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24 space-y-32">
        {CATEGORIES.map((cat) => (
          <div key={cat.key} className="grid md:grid-cols-12 gap-8">
            <div className="md:col-span-3">
              <Reveal>
                <div className="eyebrow text-[var(--brass)] mb-4">{cat.label}</div>
              </Reveal>
            </div>
            <div className="md:col-span-9 divide-y divide-border/60">
              {cat.items.map((s, i) => (
                <Reveal key={s.name} delay={i * 0.06}>
                  <article className="grid grid-cols-12 gap-6 py-8 group">
                    <div className="col-span-12 md:col-span-9">
                      <h2 className="font-serif text-2xl md:text-3xl tracking-tight">{s.name}</h2>
                      <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                        {s.description}
                      </p>
                    </div>
                    <div className="col-span-12 md:col-span-3 self-center md:text-right">
                      <Link
                        href="/booking"
                        className="text-xs eyebrow underline-offset-4 underline decoration-[var(--brass)]/40 hover:decoration-foreground"
                      >
                        Book a consult
                      </Link>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className="container-editorial mt-32">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20 text-center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] max-w-3xl mx-auto">
              Not sure which treatment fits?
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-md mx-auto">
              Book a consultation with Dr. Ajit. We&apos;ll examine, explain the options and share a
              written estimate before anything is decided.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] h-12 px-7">
              <Link href="/booking">Book a consultation</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
