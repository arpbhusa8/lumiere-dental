import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/types";

export const metadata = { title: "Treatments" };

const CATEGORIES = [
  { key: "general", label: "General & Hygiene" },
  { key: "cosmetic", label: "Cosmetic" },
  { key: "restorative", label: "Restorative" },
  { key: "orthodontics", label: "Orthodontics" },
  { key: "implants", label: "Implants" },
  { key: "whitening", label: "Whitening" },
] as const;

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");
  const services = (data ?? []) as Service[];

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Treatments</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            A short menu of the things <span className="italic text-[var(--brass)]">we do beautifully</span>.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            We offer only what we deliver with conviction. Every treatment plan begins with a
            sixty-minute consultation, intra-oral photography and a candid conversation.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24 space-y-32">
        {CATEGORIES.map((cat) => {
          const items = services.filter((s) => s.category === cat.key);
          if (!items.length) return null;
          return (
            <div key={cat.key} className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-3">
                <Reveal>
                  <div className="eyebrow text-[var(--brass)] mb-4">{cat.label}</div>
                </Reveal>
              </div>
              <div className="md:col-span-9 divide-y divide-border/60">
                {items.map((s, i) => (
                  <Reveal key={s.id} delay={i * 0.06}>
                    <article id={s.slug} className="grid grid-cols-12 gap-6 py-8 group">
                      <div className="col-span-12 md:col-span-7">
                        <h2 className="font-serif text-2xl md:text-3xl tracking-tight">{s.name}</h2>
                        {s.description && (
                          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xl">
                            {s.description}
                          </p>
                        )}
                      </div>
                      <div className="col-span-6 md:col-span-2 text-sm text-muted-foreground self-center">
                        {s.duration_minutes} min
                      </div>
                      <div className="col-span-6 md:col-span-2 text-sm self-center">
                        {s.price_from ? `From £${s.price_from.toLocaleString()}` : "POA"}
                      </div>
                      <div className="col-span-12 md:col-span-1 self-center text-right">
                        <Link
                          href={`/booking?service=${s.slug}`}
                          className="text-xs eyebrow underline-offset-4 underline decoration-[var(--brass)]/40 hover:decoration-foreground"
                        >
                          Book
                        </Link>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <section className="container-editorial mt-32">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20 text-center">
          <Reveal>
            <h2 className="display text-[clamp(2rem,4.5vw,4rem)] leading-[1.02] max-w-3xl mx-auto">
              Not sure where to begin?
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-md mx-auto">
              Book a fifteen-minute virtual consultation. Complimentary, candid, unhurried.
            </p>
            <Button asChild size="lg" className="mt-10 rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] h-12 px-7">
              <Link href="/booking">Begin your plan</Link>
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
