import type { Metadata } from "next";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "Gum Disease Treatment in Dharan — Expert Care",
  description:
    "Gum disease treatment in Dharan with consultant periodontist Dr. Ajit Yadav, MDS. Causes, warning signs, and the staged treatment pathway at Om Sai Dental.",
  keywords: [
    "gum disease treatment Dharan",
    "periodontist Dharan",
    "gingivitis treatment",
    "periodontitis Nepal",
    "scaling and root planing",
    "signs of gum disease",
  ],
  openGraph: {
    title: "Gum Disease Treatment in Dharan — Expert Care",
    description:
      "Periodontal care in Dharan from an MDS-qualified specialist. Warning signs, causes, and a staged treatment pathway from cleaning to surgical options.",
    type: "article",
  },
  alternates: { canonical: "/gum-disease" },
};

const PATHWAY = [
  {
    n: "01",
    title: "Assessment",
    body: "A full periodontal examination — pocket depths, recession, mobility, bleeding scores — gives us the map. Radiographs check bone levels around each tooth.",
  },
  {
    n: "02",
    title: "Deep cleaning",
    body: "Plaque and calculus above and just below the gum line are removed with ultrasonic and hand instruments. For many early-stage patients, this stage alone resolves the bleeding.",
  },
  {
    n: "03",
    title: "Scaling & root planing",
    body: "For deeper pockets, instruments are taken further along the tooth root to remove hardened deposits and smooth the surface so the gum can reattach. This is the workhorse of periodontal therapy.",
  },
  {
    n: "04",
    title: "Surgical options",
    body: "Where pockets remain after non-surgical care, flap surgery, regenerative procedures or gum grafts may be appropriate. These are speciality procedures and not every case needs them.",
  },
  {
    n: "05",
    title: "Maintenance",
    body: "Periodontal disease is managed rather than cured. A maintenance cadence — typically every three to six months — keeps it that way. Home care technique is reviewed at each visit.",
  },
];

const WARNING_SIGNS = [
  {
    title: "Bleeding when you brush or floss",
    body: "Healthy gums do not bleed. Pink on the brush is not normal — it is the most common early sign of inflammation and the easiest to ignore.",
  },
  {
    title: "Gums that look longer than they used to",
    body: "Recession exposes more of the tooth and sometimes the root surface. It can look like sensitivity, dark triangles between teeth, or simply a smile that has aged unevenly.",
  },
  {
    title: "Persistent bad breath",
    body: "Bacteria living in deep gum pockets produce volatile compounds that mouthwash masks for hours, not days. Breath that returns reliably points to a periodontal cause.",
  },
  {
    title: "Loose teeth or a shifting bite",
    body: "Teeth that feel different against each other, drift apart over months, or move when chewing are warning signs that bone support is being lost. This stage warrants a specialist visit, not another whitening session.",
  },
];

const FAQS = [
  {
    q: "What is the difference between gingivitis and periodontitis?",
    a: "Gingivitis is inflammation of the gums alone — usually reversible with professional cleaning and improved home care. Periodontitis is the next stage, where inflammation has begun to destroy the bone that holds the teeth in place. Bone loss is not reversible, but it can be stabilised.",
  },
  {
    q: "Can gum disease really be linked to diabetes and heart health?",
    a: "Yes. There is solid evidence that periodontitis and systemic conditions — particularly diabetes — influence one another. Poorly controlled diabetes worsens gum disease, and active gum disease can make blood sugar harder to control. Managing the mouth is part of managing the body.",
  },
  {
    q: "Does smoking affect treatment?",
    a: "Significantly. Smoking masks bleeding, accelerates bone loss and slows healing after periodontal therapy. We do not lecture, but we do explain the data, and we plan treatment realistically around it.",
  },
  {
    q: "Is the treatment painful?",
    a: "Most periodontal therapy is carried out under local anaesthesia and is well tolerated. Some sensitivity for a few days after deep cleaning is normal. The discomfort of treatment is usually much smaller than the discomfort of leaving the disease alone.",
  },
  {
    q: "How often will I need to come back?",
    a: "After active treatment, most periodontal patients are reviewed every three to six months. The cadence is set by your individual risk, not a calendar rule.",
  },
];

export default function GumDiseasePillarPage() {
  return (
    <div className="pt-36 pb-24">
      {/* HERO */}
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Gum health & periodontal care</div>
          <h1 className="display text-[clamp(2.5rem,6.5vw,5.75rem)] tracking-[-0.03em] max-w-5xl">
            Gum disease treatment in Dharan, by a{" "}
            <span className="italic text-[var(--brass)]">consultant periodontist</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Periodontal disease is the leading cause of adult tooth loss — and it is often silent
            until it is advanced. At Om Sai Dental Implant Center, Dr. Ajit Yadav, MDS, leads a
            staged pathway from diagnosis through long-term maintenance.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full h-12 px-7">
              <a href="tel:+97725538312">Book a consultation</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="rounded-full h-12 px-7 border-foreground/20"
            >
              <a
                href="https://wa.me/9779852057909"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp Dr. Ajit
              </a>
            </Button>
          </div>
        </Reveal>
      </section>

      {/* WHAT IS GUM DISEASE */}
      <section className="container-editorial mt-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">The condition</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              Gingivitis, then periodontitis.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Gum disease begins as gingivitis — inflammation caused by plaque sitting along the
              gum line. The gums become red and bleed easily, but no permanent damage has been
              done. With professional cleaning and consistent home care, gingivitis fully resolves.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If gingivitis is left, it can progress to periodontitis. Here the inflammation moves
              below the gum line, and the body&apos;s own response begins to break down the bone that
              supports the teeth. The pockets between gum and tooth deepen, harbour more bacteria,
              and the cycle accelerates.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The distinction matters because the treatment, the timeline, and the prognosis are
              different. The same brushing technique that resolves gingivitis is not enough for
              periodontitis — specialist instruments and, sometimes, surgery are needed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WARNING SIGNS */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">Warning signs</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-3xl">
            What to notice <span className="italic">before</span> it becomes urgent.
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid md:grid-cols-2 gap-x-12 gap-y-12 border-t border-border/60 pt-12">
          {WARNING_SIGNS.map((s, i) => (
            <StaggerItem key={i}>
              <div className="font-serif italic text-[var(--brass)] text-xl mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CAUSES */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">Causes & risk factors</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              Plaque, smoking, and a body-wide story.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              The primary cause of gum disease is dental plaque — the bacterial film that builds
              along the gum line when brushing and flossing are inadequate. Calculus (hardened
              plaque) cannot be removed at home and acts as a reservoir for further inflammation.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Smoking is the single largest modifiable risk factor for periodontitis. It suppresses
              the bleeding that would otherwise warn you something is wrong, narrows the small
              blood vessels that bring healing to the gums, and worsens treatment outcomes at every
              stage.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Diabetes — particularly poorly controlled diabetes — has a two-way relationship with
              gum disease. Hormonal change, certain medications, and a family history of
              periodontitis also raise risk. None of these is destiny: they are factors we plan
              around.
            </p>
          </Reveal>
        </div>
      </section>

      {/* TREATMENT PATHWAY */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">The pathway</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-3xl">
            From cleaning to maintenance, sequenced.
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 border-t border-border/60 pt-12">
          {PATHWAY.map((p) => (
            <StaggerItem key={p.n}>
              <div className="font-serif italic text-[var(--brass)] text-2xl mb-5">{p.n}</div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* GUMS AND IMPLANTS */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="rounded-3xl bg-[var(--bone)] border border-border/60 p-10 md:p-16">
            <div className="eyebrow text-[var(--brass)] mb-4">Why this matters before an implant</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] max-w-3xl">
              Healthy gums are the foundation of a successful implant.
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              A dental implant lives in bone and is sealed by gum tissue. If the surrounding
              periodontal environment is inflamed when an implant is placed, the risk of
              peri-implantitis — the implant equivalent of gum disease — rises sharply. This is
              one of the reasons we sometimes recommend a course of periodontal treatment before
              starting implant work.
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              The same logic applies to existing implants. Patients with implants benefit from
              regular periodontal review even when their other teeth feel fine. You can read more
              in the{" "}
              <Link
                href="/implants"
                className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground"
              >
                dental implant specialist guide
              </Link>{" "}
              and the{" "}
              <Link
                href="/pricing-guide"
                className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground"
              >
                pricing guide
              </Link>
              .
            </p>
          </div>
        </Reveal>
      </section>

      {/* HOME CARE */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">At home</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              What changes between visits.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Professional treatment is roughly half of the work. The other half is what happens
              between visits — and it is more about technique than effort. A soft-bristled brush
              used carefully along the gum line for two unhurried minutes, twice a day, will do
              more than a heavy hand on stiff bristles.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Interdental brushes — small picks sized to the gap between each pair of teeth — are
              the most underused tool in oral hygiene. We size them for you and demonstrate at
              the chair. Floss has its place; for many adult mouths, interdental brushes do the
              heavier lifting.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              For the wider menu of preventive and restorative care we offer, see{" "}
              <Link
                href="/services"
                className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground"
              >
                services
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">Questions, answered</div>
          <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] max-w-2xl">
            Common questions about periodontal care.
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion type="single" collapsible className="mt-12 max-w-3xl">
            {FAQS.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`}>
                <AccordionTrigger className="text-base md:text-lg py-5 font-serif tracking-tight">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed text-sm md:text-base pb-5">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </section>

      {/* INTERNAL LINKS */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">Read next</div>
          <div className="grid md:grid-cols-3 gap-6 border-t border-border/60 pt-10">
            <Link
              href="/implants"
              className="group block p-8 rounded-2xl bg-[var(--bone)] border border-border/60 hover:border-foreground/40 transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Implants</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Dental implant specialist in Dharan
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                The six-stage procedure, sequenced after healthy gums.
              </p>
            </Link>
            <Link
              href="/pricing-guide"
              className="group block p-8 rounded-2xl bg-[var(--bone)] border border-border/60 hover:border-foreground/40 transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Pricing</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Dental implant cost guide for Nepal
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                What drives the price, and how we publish your estimate.
              </p>
            </Link>
            <Link
              href="/booking"
              className="group block p-8 rounded-2xl bg-[var(--forest)] text-[var(--ivory)] hover:bg-[oklch(0.22_0.025_145)] transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Book</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Book a periodontal consultation
              </h3>
              <p className="mt-4 text-sm text-[var(--ivory)]/70 leading-relaxed">
                A fifteen-minute assessment with Dr. Ajit. Bring concerns.
              </p>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="container-editorial mt-32">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20 text-center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] max-w-3xl mx-auto">
              Healthy gums first. Everything else follows.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-lg mx-auto">
              Book a consultation. We will examine, explain and propose a clear next step.
            </p>
            <div className="mt-10 flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] h-12 px-7"
              >
                <a href="tel:+97725538312">Book a consultation</a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full h-12 px-7 border-[var(--ivory)]/30 text-[var(--ivory)] hover:bg-[var(--ivory)]/10"
              >
                <a
                  href="https://wa.me/9779852057909"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Dr. Ajit
                </a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
