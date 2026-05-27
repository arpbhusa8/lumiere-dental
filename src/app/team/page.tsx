import { createClient } from "@/lib/supabase/server";
import { Reveal } from "@/components/motion/reveal";
import type { Practitioner } from "@/lib/types";

export const metadata = { title: "Team" };

export default async function TeamPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("practitioners")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  const practitioners = (data ?? []) as Practitioner[];

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">The studio</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            Quietly accomplished <span className="italic text-[var(--brass)]">clinicians</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Lecturers, examiners and award-winning specialists who choose to see only a handful
            of patients each day.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24 space-y-32">
        {practitioners.map((p, i) => (
          <article
            key={p.id}
            id={p.slug}
            className={`grid md:grid-cols-12 gap-12 items-center ${i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""}`}
          >
            <Reveal className="md:col-span-5">
              <PortraitTile name={p.name} />
            </Reveal>
            <div className="md:col-span-7">
              <Reveal delay={0.1}>
                <div className="eyebrow text-[var(--brass)] mb-4">{p.credentials}</div>
                <h2 className="display text-[clamp(2rem,4.5vw,4rem)]">{p.name}</h2>
              </Reveal>
              {p.bio && (
                <Reveal delay={0.2}>
                  <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
                    {p.bio}
                  </p>
                </Reveal>
              )}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

function PortraitTile({ name }: { name: string }) {
  const initials = name.replace(/^Dr\s|^Mrs?\s/, "").split(" ").map((w) => w[0]).join("").slice(0, 2);
  return (
    <div className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[var(--muted)]">
      <svg viewBox="0 0 200 250" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id={`pt-${initials}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.86 0.025 85)" />
            <stop offset="100%" stopColor="oklch(0.7 0.022 95)" />
          </linearGradient>
        </defs>
        <rect width="200" height="250" fill={`url(#pt-${initials})`} />
        <circle cx="100" cy="90" r="42" fill="oklch(0.58 0.022 145 / 0.35)" />
        <path d="M35 250 C 35 175, 165 175, 165 250 Z" fill="oklch(0.58 0.022 145 / 0.32)" />
        <text
          x="100"
          y="230"
          textAnchor="middle"
          className="fill-[oklch(0.301_0.025_145)]"
          style={{ fontFamily: "var(--font-fraunces), serif", fontSize: 42, fontWeight: 300, fontStyle: "italic" }}
        >
          {initials.toLowerCase()}
        </text>
      </svg>
    </div>
  );
}
