import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { TEAM } from "@/lib/team";

export const metadata = { title: "About" };

const CLINIC_RECOGNITION_PHOTO = "/about/dr-ajit-recognition.webp";

const PILLARS = [
  {
    n: "01",
    title: "Specialist consult",
    body: "Every patient begins with a structured conversation led by Dr. Ajit Yadav, MDS — Consultant Periodontist and Implantologist. We listen first, examine second, and explain what we find in language you can act on.",
  },
  {
    n: "02",
    title: "Evidence-led plan",
    body: "Treatment plans are built around current periodontal and implant literature. As a lecturer at Nobel Medical College, Biratnagar, Dr. Ajit teaches the same protocols he uses in chair-side practice.",
  },
  {
    n: "03",
    title: "Considered treatment",
    body: "Implants, gum care and restorations are delivered at a measured pace. We sequence visits around healing time and your schedule rather than around appointment slots.",
  },
  {
    n: "04",
    title: "Plain post-op support",
    body: "A direct phone line for the days that follow your procedure. Call or WhatsApp if something feels off — you reach a clinician, not a queue.",
  },
];

const ajit = TEAM.find((m) => m.slug === "dr-ajit-yadav");

const CLINICAL_STATS = [
  {
    stat: ajit?.implantsPlaced ? `${ajit.implantsPlaced}+` : "—",
    label: "Dental implants placed",
  },
  { stat: "MDS", label: "Periodontology" },
  {
    stat: String(ajit?.publications?.length ?? 0),
    label: "Peer-reviewed publications",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Philosophy</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.03em] max-w-4xl">
            A specialist practice. <span className="italic text-[var(--brass)]">Rooted in Dharan</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Om Sai Dental Implant Center is a consultant-led clinic in Dharan focused on
            dental implants and periodontal care. Our work is shaped by an academic habit:
            keep reading, keep questioning, and bring that thinking into every consultation.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-28 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <Reveal>
            <figure className="aspect-[4/5] rounded-2xl overflow-hidden bg-[var(--forest)] relative">
              <Image
                src={CLINIC_RECOGNITION_PHOTO}
                alt="Dr. Ajit Yadav at Om Sai Dental Implant Center, Dharan-2 Deshiline, receiving a certificate of appreciation"
                fill
                sizes="(max-width: 768px) 100vw, 42vw"
                className="object-cover"
              />
            </figure>
          </Reveal>
        </div>
        <div className="md:col-span-7">
          <Reveal delay={0.1}>
            <h2 className="display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.02]">
              Academic authority, <span className="italic text-[var(--brass)]">chair-side</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-base md:text-lg text-muted-foreground leading-relaxed">
              Dr. Ajit Yadav holds an MDS in Periodontology and lectures at Nobel Medical College,
              Biratnagar. That teaching role is not a credential on a wall — it keeps the practice
              honest. The protocols we use are the protocols he stands behind in a classroom.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              Specialist-level implant and periodontal care has historically meant a trip to
              Kathmandu or across the border. Om Sai exists so that patients in eastern Nepal can
              be assessed, planned and treated by a consultant periodontist close to home.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial mt-28">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 border-t border-border/60 pt-12">
          {CLINICAL_STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <div className="font-serif text-[clamp(2.5rem,6vw,4rem)] text-[var(--brass)] leading-none">
                {s.stat}
              </div>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                {s.label}
              </p>
            </Reveal>
          ))}
        </div>
        {ajit?.expertise && ajit.expertise.length > 0 && (
          <Reveal delay={0.1}>
            <div className="mt-14">
              <div className="eyebrow text-[var(--brass)] mb-4 text-xs">
                Areas of expertise
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {ajit.expertise.map((e) => (
                  <li
                    key={e}
                    className="rounded-full border border-border/60 px-4 py-1.5 text-sm text-muted-foreground"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        )}
        <Reveal delay={0.15}>
          <p className="mt-10 text-sm text-muted-foreground">
            Full peer-reviewed publication list on the{" "}
            <a
              href="/team#dr-ajit-yadav"
              className="underline underline-offset-4 hover:text-[var(--brass)] transition-colors"
            >
              team page
            </a>
            .
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-32">
        <Reveal>
          <div className="eyebrow mb-6">How we work</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)] max-w-2xl">
            Four pillars. One <span className="italic">considered</span> approach.
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-border/60 pt-12">
          {PILLARS.map((r, i) => (
            <Reveal key={r.n} delay={i * 0.08}>
              <div className="font-serif italic text-[var(--brass)] text-2xl mb-6">{r.n}</div>
              <h3 className="font-serif text-2xl tracking-tight mb-3">{r.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
