import { Reveal } from "@/components/motion/reveal";

const CREDENTIALS = [
  "Lecturer, Nobel Medical College",
  "MDS, Periodontology",
  // proof-gap: NDA membership
  "Member, Nepal Dental Association",
];

export function PressStrip() {
  return (
    <section className="py-16 border-y border-border/60">
      <div className="container-editorial">
        <Reveal>
          <div className="eyebrow text-center mb-8">Credentials &amp; affiliations</div>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-muted-foreground/70">
            {CREDENTIALS.map((c, i) => (
              <span
                key={c}
                className="font-serif text-xl md:text-2xl tracking-tight"
                style={{ fontStyle: i === 1 ? "italic" : "normal" }}
              >
                {c}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
