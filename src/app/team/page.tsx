import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";

export const metadata = { title: "Dr. Ajit Yadav" };

const AJIT_PHOTO = "/team/dr-ajit-yadav.png";

export default function TeamPage() {
  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">The clinician</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            A consultant who also <span className="italic text-[var(--brass)]">teaches the work</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Om Sai Dental Implant Center is led by Dr. Ajit Yadav, a specialist whose academic
            role keeps the clinic close to current periodontal and implant practice.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24">
        <article
          id="dr-ajit-yadav"
          className="grid md:grid-cols-12 gap-12 items-center"
        >
          <Reveal className="md:col-span-5">
            <PortraitTile name="Dr Ajit Yadav" photoUrl={AJIT_PHOTO} />
          </Reveal>
          <div className="md:col-span-7">
            <Reveal delay={0.1}>
              <div className="eyebrow text-[var(--brass)] mb-4">
                MDS · Consultant Periodontist &amp; Implantologist · Lecturer, Nobel Medical College, Biratnagar
              </div>
              <h2 className="display text-[clamp(2rem,4.5vw,4rem)]">Dr. Ajit Yadav</h2>
            </Reveal>
            <Reveal delay={0.2}>
              {/* proof-gap: bio specifics */}
              <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                Dr. Ajit holds a Master of Dental Surgery in Periodontology and practises as a
                consultant periodontist and implantologist. Alongside chair-side care at Om Sai,
                he lectures at Nobel Medical College in Biratnagar — a teaching role that keeps
                his clinical protocols anchored in current evidence.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                His approach is patient-first and explanation-led: each consultation focuses on
                understanding the underlying condition, walking through the realistic options and
                agreeing a plan before treatment begins.
              </p>
            </Reveal>
          </div>
        </article>
      </section>
    </div>
  );
}

function PortraitTile({ name, photoUrl }: { name: string; photoUrl: string }) {
  return (
    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[var(--muted)]">
      <Image
        src={photoUrl}
        alt={`${name} portrait`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 42vw"
        className="object-cover"
      />
    </div>
  );
}
