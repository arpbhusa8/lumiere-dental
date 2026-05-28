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
  title: "Dental Implant Specialist in Dharan — Dr. Ajit Yadav, MDS",
  description:
    "Dental implant care in Dharan led by MDS periodontist Dr. Ajit Yadav. Specialist planning, placement, restoration and follow-up at Om Sai Dental.",
  keywords: [
    "dental implant Dharan",
    "implant dentist Dharan",
    "implantologist Nepal",
    "Dr Ajit Yadav periodontist",
    "tooth replacement Dharan",
  ],
  openGraph: {
    title: "Dental Implant Specialist in Dharan — Dr. Ajit Yadav, MDS",
    description:
      "Specialist implant care in Dharan: assessment, planning, placement, healing, abutment, crown — guided by a consultant periodontist and lecturer.",
    type: "article",
  },
  alternates: { canonical: "/implants" },
};

const PROCEDURE = [
  {
    n: "01",
    title: "Assessment",
    body: "A focused clinical exam, medical history review and digital radiograph. We listen to what brought you in and explain, in plain language, whether an implant is the right step.",
  },
  {
    n: "02",
    title: "Planning",
    body: "Bone volume, sinus position and bite mechanics are studied before any surgical date is offered. Where the case is complex, additional imaging is requested rather than improvised on the day.",
  },
  {
    n: "03",
    title: "Placement",
    body: "The titanium post is positioned in the jawbone under local anaesthesia in a controlled, sterile setting. Most single-implant surgeries are completed in under an hour.",
  },
  {
    n: "04",
    title: "Healing",
    body: "Osseointegration — the biological fusion of bone with the implant surface — takes roughly three to six months. We check progress with scheduled reviews and a direct line for concerns.",
  },
  {
    n: "05",
    title: "Abutment",
    body: "Once integration is confirmed, a small connector is fitted to the implant. The gum is shaped around it so the eventual crown emerges from tissue the way a natural tooth would.",
  },
  {
    n: "06",
    title: "Crown",
    body: "An impression is taken and the final restoration is bonded or screwed into place. Bite is adjusted, polish is checked, aftercare is rehearsed in the chair before you leave.",
  },
];

const FAQS = [
  {
    q: "Who is a candidate for a dental implant?",
    a: "Most adults with a missing tooth, adequate jawbone and reasonably controlled general health are candidates. Smoking, uncontrolled diabetes and certain medications can affect healing — we assess these before recommending surgery.",
  },
  {
    q: "How long does the full implant journey take?",
    a: "From first consultation to final crown, most patients complete the process within three to six months. Cases that need bone grafting or sinus work can take longer; we explain timing case-by-case rather than promising a fixed window.",
  },
  {
    q: "Is the surgery painful?",
    a: "The procedure itself is done under local anaesthesia and patients commonly report it is more comfortable than they expected. Mild post-operative soreness for a few days is normal and managed with simple medication.",
  },
  {
    q: "Do you offer post-operative support?",
    a: "Yes. Every implant patient receives a direct post-op contact for the first weeks after surgery and scheduled review appointments through healing. If something feels wrong at 9pm, you should not be googling — you should be calling us.",
  },
  {
    q: "How long does a dental implant last?",
    a: "With good hygiene, regular reviews and a healthy bite, a well-placed implant can serve for decades. The crown on top may need replacing sooner than the implant itself.",
  },
];

export default function ImplantsPillarPage() {
  return (
    <div className="pt-36 pb-24">
      {/* HERO */}
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Specialist implant authority</div>
          <h1 className="display text-[clamp(2.5rem,6.5vw,5.75rem)] tracking-[-0.03em] max-w-5xl">
            Dental implants in Dharan, planned and placed by a{" "}
            <span className="italic text-[var(--brass)]">specialist</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Om Sai Dental Implant Center is led by Dr. Ajit Yadav, MDS — a consultant periodontist,
            implantologist and lecturer at Nobel Medical College. Care is unhurried, evidence-led
            and delivered locally, so you do not need to travel for specialist treatment.
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

      {/* WHAT IS AN IMPLANT */}
      <section className="container-editorial mt-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">The implant, explained</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              A titanium post that becomes part of the bone.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              A dental implant is a small, biocompatible titanium screw placed into the jawbone to
              replace the root of a missing tooth. Over a healing period the bone grows around the
              implant in a process called osseointegration, which is what allows the eventual crown
              to bite, chew and last like a natural tooth.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Unlike a bridge — which relies on shaving down adjacent teeth — an implant stands on
              its own foundation. It also preserves the jawbone underneath, which begins to shrink
              within months of a tooth being lost.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              An implant is not a single product; it is a system. The post, the abutment that
              connects it to the crown, and the crown itself are chosen for the specific bite, bone
              and aesthetic situation in front of us. That is why a careful assessment matters more
              than the brand of screw.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHO NEEDS ONE */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">Who an implant suits</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              Single gaps, multiple teeth, full-arch cases.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Patients usually come to us for one of three situations: a single tooth that has been
              lost or is failing, several adjacent teeth that need replacing, or a full upper or
              lower jaw that can be restored on a small number of implants.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Implants are an option for most healthy adults with adequate jawbone. Smoking,
              uncontrolled diabetes, certain medications and active gum disease all influence the
              plan — sometimes a short course of periodontal treatment is required before the
              implant date is set. We address these honestly at the consultation rather than after
              surgery.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If you have been told elsewhere that you are not a candidate because of bone loss,
              that is worth a second opinion. Bone grafting and sinus procedures are part of the
              modern implant toolkit.
            </p>
          </Reveal>
        </div>
      </section>

      {/* THE 6-STAGE PROCEDURE */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">The procedure</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-3xl">
            Six stages, sequenced with <span className="italic">patience</span>.
          </h2>
        </Reveal>
        <Stagger className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 border-t border-border/60 pt-12">
          {PROCEDURE.map((stage) => (
            <StaggerItem key={stage.n}>
              <div className="font-serif italic text-[var(--brass)] text-2xl mb-5">{stage.n}</div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{stage.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{stage.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* DR AJIT CREDENTIALS */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12 items-start">
        <div className="md:col-span-5">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">The clinician</div>
            <h2 className="display text-[clamp(2rem,4vw,3.5rem)] leading-[1.02]">
              Dr. Ajit Yadav, <span className="italic">MDS</span>.
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Dr. Ajit holds an MDS in Periodontology, the dental speciality concerned with the gums
              and supporting bone — the foundation on which every implant rests. He is a consultant
              periodontist, an implantologist, and a lecturer at Nobel Medical College in Biratnagar.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              His academic role matters in practice: the clinical evidence he teaches each week is
              the same evidence that shapes the treatment plan he writes for you. There is no gap
              between the textbook and the chair.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              You can read more about the team and clinic on the{" "}
              <Link href="/team" className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground">
                team page
              </Link>{" "}
              or review the full menu of treatments on the{" "}
              <Link href="/services" className="underline underline-offset-4 decoration-[var(--brass)]/50 hover:decoration-foreground">
                services page
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>

      {/* POST-OP SUPPORT */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="rounded-3xl bg-[var(--bone)] border border-border/60 p-10 md:p-16">
            <div className="eyebrow text-[var(--brass)] mb-4">After surgery</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] max-w-3xl">
              A direct post-operative line, not a switchboard.
            </h2>
            <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Every implant patient leaves with a number that reaches the clinic directly. If
              swelling looks unusual at the weekend, if a stitch feels uncomfortable on day three,
              if you are unsure whether the food you are eating is sensible — call. We would much
              rather talk you through a small worry than read about a large one on Monday morning.
            </p>
            <p className="mt-4 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Scheduled reviews are built into the plan at one week, one month and through
              osseointegration, so progress is checked by us rather than guessed at by you.
            </p>
          </div>
        </Reveal>
      </section>

      {/* SHOULD I TRAVEL? */}
      <section className="container-editorial mt-32 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-4">A fair question</div>
            <h2 className="font-serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.05]">
              Should I travel for an implant?
            </h2>
          </Reveal>
        </div>
        <div className="md:col-span-7 md:col-start-6 space-y-6">
          <Reveal delay={0.1}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Patients sometimes ask whether they should travel further afield — to Kathmandu, or
              across the border — for implant work. It is a reasonable question and we answer it
              the same way every time.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              An implant is not a single appointment. It is a relationship that spans assessment,
              surgery, healing, restoration and years of routine review. Each of those stages is
              easier when the clinician who placed the implant is the clinician who reviews it —
              and is reachable when something feels off.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              If specialist care is available locally, the case for distant care has to clear a high
              bar. We are confident about ours: an MDS-qualified periodontist and implantologist,
              practising as a consultant, who teaches the subject he treats. If your case is genuinely
              outside our scope we will say so plainly and refer onward.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">Questions, answered</div>
          <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] max-w-2xl">
            Common questions about dental implants.
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
              href="/pricing-guide"
              className="group block p-8 rounded-2xl bg-[var(--bone)] border border-border/60 hover:border-foreground/40 transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Pricing</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Dental implant cost in Nepal — a transparent guide
              </h3>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                What shapes the price of an implant, and how we communicate yours.
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
                Why healthy gums matter — especially before and after implant work.
              </p>
            </Link>
            <Link
              href="/booking"
              className="group block p-8 rounded-2xl bg-[var(--forest)] text-[var(--ivory)] hover:bg-[oklch(0.22_0.025_145)] transition-colors"
            >
              <div className="eyebrow text-[var(--brass)] mb-3">Book</div>
              <h3 className="font-serif text-2xl tracking-tight">
                Book an implant consultation
              </h3>
              <p className="mt-4 text-sm text-[var(--ivory)]/70 leading-relaxed">
                A fifteen-minute consultation with Dr. Ajit. Bring questions.
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
              Specialist implant care, here in Dharan.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-lg mx-auto">
              Begin with a consultation. We listen, examine, explain — and only then propose a
              plan.
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
