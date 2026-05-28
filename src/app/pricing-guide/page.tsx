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
  title: "Dental Implant Cost Guide — Prices in Nepal",
  description:
    "A transparent guide to dental implant pricing in Nepal. What drives cost, what a consultation includes, and how we publish your estimate after assessment.",
  keywords: [
    "dental implant cost Nepal",
    "dental implant cost Dharan",
    "implant price guide Nepal",
    "dental implant price",
    "implant cost Dharan",
  ],
  openGraph: {
    title: "Dental Implant Cost Guide — Prices in Nepal",
    description:
      "What shapes the price of a dental implant in Nepal — implant system, bone condition, restoration, follow-up — and how Om Sai Dental quotes transparently.",
    type: "article",
  },
  alternates: { canonical: "/pricing-guide" },
};

const COST_DRIVERS = [
  {
    n: "01",
    title: "Implant system",
    body: "Not all implants are equal. Premium systems carry decades of clinical data, broader compatibility for future repairs, and predictable long-term outcomes. We choose the system that fits the case rather than the case that fits a system.",
  },
  {
    n: "02",
    title: "Bone condition",
    body: "If the jawbone has shrunk after years of tooth loss, a bone graft or sinus procedure may be needed before — or alongside — the implant. These steps add time and material cost. They also make the difference between an implant that lasts and one that does not.",
  },
  {
    n: "03",
    title: "Restoration type",
    body: "The crown that sits on the implant can be ceramic, zirconia, or a hybrid material. Single-tooth restorations differ from bridges and full-arch work. Aesthetics, opposing bite and grinding habits all influence the choice.",
  },
  {
    n: "04",
    title: "Sedation & comfort",
    body: "Most patients are comfortable with local anaesthesia. Some prefer additional sedation, particularly for longer or multi-implant appointments. Choice of comfort plan affects the final figure.",
  },
  {
    n: "05",
    title: "Follow-up & maintenance",
    body: "A good implant plan includes scheduled reviews through healing and an annual maintenance cadence afterward. We build these into the estimate up front rather than billing them piecemeal.",
  },
];

const FAQS = [
  {
    q: "Why don't you publish a fixed price for an implant?",
    a: "Because the responsible price depends on bone, system, restoration and complexity — and we do not believe in headline figures that quietly exclude what your case actually needs. We publish a clear estimate after a 15-minute consultation, with no expectation of commitment on either side.",
  },
  {
    q: "What does the consultation include?",
    a: "A clinical examination, digital radiograph where indicated, a candid conversation about your goals and constraints, and — if an implant looks appropriate — a written treatment plan with an itemised estimate. There is no surgical work at the first visit.",
  },
  {
    q: "Are there hidden fees once treatment starts?",
    a: "No. Our written estimate covers the implant, abutment, crown, anaesthesia, scheduled reviews and routine post-operative care. If a case develops in a way that requires additional work, we discuss it before proceeding — never after billing.",
  },
  {
    q: "Do you offer financing or instalments?",
    a: "Treatment fees can be settled in stages aligned with the surgical stages — for example, at placement, abutment and crown delivery. We can discuss what works at the consultation.",
  },
  {
    q: "Is a cheaper implant elsewhere a fair comparison?",
    a: "Only if the comparison is genuinely like-for-like — same implant system, same restoration material, same number of reviews, same surgical credentials. A lower headline figure often reflects a different bundle. We are happy to walk through any quote you have received and explain what is, and is not, included.",
  },
];

export default function PricingGuidePage() {
  return (
    <div className="pt-36 pb-24">
      {/* proof-gap: published price band */}
      {/* proof-gap: named lending partners */}
      {/* HERO */}
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Transparent pricing</div>
          <h1 className="display text-[clamp(2.5rem,6.5vw,5.75rem)] tracking-[-0.03em] max-w-5xl">
            Dental implant cost in Nepal, explained{" "}
            <span className="italic text-[var(--brass)]">honestly</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            There is no single number for the cost of a dental implant — there is a clear set of
            factors that shape it. This page walks through those factors, explains what a
            consultation at Om Sai Dental Implant Center includes, and shows how your written
            estimate is prepared.
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

      {/* WHY NO FIXED NUMBER */}
      <section className="container-editorial mt-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">A note before figures</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              Why we don&apos;t lead with a headline price.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              It is tempting, when scrolling, to put a single number on a screen. We have chosen
              not to — and the reason is straightforward. A headline figure either understates what
              most cases actually need, or it inflates what simple cases would cost. Neither helps
              you make a decision you can trust.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Instead, this guide explains the four or five variables that shape every estimate.
              Once we have examined the bone, the bite and the case in front of us, we put those
              variables into a written plan with a clear figure — and the conversation continues
              from there, not before.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If you would prefer an indicative range before committing to a visit, ask on
              WhatsApp. We will give one in the spirit of being useful, with the caveat that the
              real figure is set after assessment.
            </p>
          </Reveal>
        </div>
      </section>

      {/* COST DRIVERS */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">What drives the price</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-3xl">
            Five variables, weighed{" "}
            <span className="italic">case by case</span>.
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 border-t border-border/60 pt-12">
          {COST_DRIVERS.map((d) => (
            <StaggerItem key={d.n}>
              <div className="font-serif italic text-[var(--brass)] text-2xl mb-5">{d.n}</div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{d.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* THE NO-SURPRISE PROMISE */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="rounded-3xl bg-[var(--bone)] border border-border/60 p-10 md:p-16">
            <div className="eyebrow text-[var(--brass)] mb-4">Our written estimate</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] max-w-3xl">
              No surprise fees. Just an itemised plan.
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Every implant patient receives a written treatment plan that lists the implant
              system, restoration material, anaesthesia, scheduled reviews and routine
              post-operative care. The number on that plan is the number you pay. If the case
              evolves — sometimes a hidden bone defect only reveals itself on imaging — we discuss
              the implications and the cost before proceeding, in writing.
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Payment is structured around surgical stages so you never pay for work that has not
              been delivered.
            </p>
          </div>
        </Reveal>
      </section>

      {/* INDICATIVE RANGES */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">Indicative figures</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              How to think about ballpark numbers.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              In Nepal, a single dental implant with a crown spans a meaningful range depending on
              the variables above. Premium systems with strong long-term data sit at the upper end
              of that range; mid-tier systems sit lower. Adjunct procedures — grafting, sinus
              work, sedation — add to it.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We have intentionally left specific figures off this page. Posting a number we have
              not verified for your bone, your bite and your goals would be the opposite of
              transparent. Instead, we publish a clear estimate after assessment — a real number
              for your real case, with everything it includes spelled out.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              For context on what an implant actually involves, the{" "}
              <Link
                href="/implants"
                className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground"
              >
                dental implant specialist guide
              </Link>{" "}
              walks through each surgical stage. For the wider menu of treatments and indicative
              durations, see{" "}
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

      {/* CONSULTATION CONTENT */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">The fifteen minutes</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              What a consultation actually includes.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A first consultation runs about fifteen minutes. We listen to what brought you in,
              examine the area in question, take a digital radiograph where it is useful, and
              speak frankly about whether an implant is the appropriate step.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If gum disease is present, we will say so and explain the periodontal work that
              should come first — the{" "}
              <Link
                href="/gum-disease"
                className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground"
              >
                gum disease treatment guide
              </Link>{" "}
              explains why this sequencing matters for implant success. If a different solution
              fits your situation better than an implant, we will tell you that too.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              You leave with a written plan, a clear estimate, and no obligation to proceed.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">Pricing questions, answered</div>
          <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] max-w-2xl">
            What patients ask before booking.
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
                The six-stage procedure and the clinician behind it.
              </p>
            </Link>
            <Link
              href="/gum-disease"
              className="group block p-8 rounded-2xl bg-[var(--bone)] border border-border/60 hover:border-foreground/40 transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Gum health</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Gum disease treatment in Dharan
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                Why periodontal health is sequenced before implants.
              </p>
            </Link>
            <Link
              href="/booking"
              className="group block p-8 rounded-2xl bg-[var(--forest)] text-[var(--ivory)] hover:bg-[oklch(0.22_0.025_145)] transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Book</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Get your transparent estimate
              </h3>
              <p className="mt-4 text-sm text-[var(--ivory)]/70 leading-relaxed">
                A fifteen-minute consultation, written plan, no obligation.
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
              Get your transparent estimate after a 15-min consultation.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-lg mx-auto">
              A written plan with an itemised figure — for your bone, your bite, your case.
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
