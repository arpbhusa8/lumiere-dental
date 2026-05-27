import { Reveal } from "@/components/motion/reveal";

const PRESS = ["Vogue", "Tatler", "Robb Report", "Financial Times", "Wallpaper*"];

export function PressStrip() {
  return (
    <section className="py-16 border-y border-border/60">
      <div className="container-editorial">
        <Reveal>
          <div className="eyebrow text-center mb-8">As featured in</div>
          <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-6 text-muted-foreground/60">
            {PRESS.map((p) => (
              <span
                key={p}
                className="font-serif text-2xl md:text-3xl tracking-tight"
                style={{ fontStyle: p === "Tatler" ? "italic" : "normal" }}
              >
                {p}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
