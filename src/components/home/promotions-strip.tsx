import { createClient } from "@/lib/supabase/server";
import type { Promotion } from "@/lib/types";
import { Reveal } from "@/components/motion/reveal";

// Returns YYYY-MM-DD in local time, matching how `date` columns are stored.
function todayISO(): string {
  const now = new Date();
  const tz = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - tz).toISOString().slice(0, 10);
}

// Only show offers that are within their date window. The public-read RLS
// policy already filters by date, but we guard here too so the strip stays
// correct regardless of how the row was fetched.
function isLive(promo: Promotion, today: string): boolean {
  const startedOk = !promo.starts_on || promo.starts_on.slice(0, 10) <= today;
  const notEndedOk = !promo.ends_on || promo.ends_on.slice(0, 10) >= today;
  return startedOk && notEndedOk;
}

export async function PromotionsStrip() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("promotions")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  const today = todayISO();
  const offers = ((data ?? []) as Promotion[]).filter((p) => isLive(p, today));

  if (offers.length === 0) return null;

  return (
    <section
      aria-labelledby="promotions-heading"
      className="bg-[var(--forest)] py-20 text-[var(--bone)] md:py-28"
    >
      <div className="container-editorial">
        <Reveal>
          <div className="eyebrow text-[var(--brass)]">Current offers</div>
          <h2
            id="promotions-heading"
            className="display mt-5 max-w-2xl text-[clamp(1.75rem,3.5vw,3rem)] text-[var(--bone)]"
          >
            What&rsquo;s on at Om Sai right now.
          </h2>
        </Reveal>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[var(--bone)]/15 bg-[var(--bone)]/10 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((promo, i) => (
            <li key={promo.id} className="bg-[var(--forest)]">
              <Reveal delay={0.1 + i * 0.08} className="h-full">
                <article className="flex h-full flex-col gap-5 p-8 md:p-10">
                  {promo.discount_label ? (
                    <span className="inline-flex w-fit items-center rounded-full bg-[var(--brass)] px-3 py-1 text-xs font-medium tracking-wide text-[var(--forest)]">
                      {promo.discount_label}
                    </span>
                  ) : null}
                  <h3 className="font-serif text-xl leading-snug tracking-tight text-[var(--bone)] md:text-2xl">
                    {promo.title}
                  </h3>
                  {promo.description ? (
                    <p className="text-sm leading-relaxed text-[var(--bone)]/70">
                      {promo.description}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
