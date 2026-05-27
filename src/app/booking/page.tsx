import { createClient } from "@/lib/supabase/server";
import { BookingFlow } from "@/components/booking/booking-flow";
import { Reveal } from "@/components/motion/reveal";
import type { Service, Practitioner } from "@/lib/types";

export const metadata = { title: "Book a consultation" };

type SP = Promise<{ service?: string }>;

export default async function BookingPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  const supabase = await createClient();
  const [{ data: services }, { data: practitioners }] = await Promise.all([
    supabase.from("services").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("practitioners").select("*").eq("is_active", true).order("sort_order"),
  ]);

  const preselected = sp.service
    ? (services ?? []).find((s) => s.slug === sp.service)?.id ?? null
    : null;

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Reservation</div>
          <h1 className="display text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em] max-w-3xl">
            Reserve your <span className="italic text-[var(--brass)]">hour</span>.
          </h1>
          <p className="mt-8 max-w-xl text-base text-muted-foreground leading-relaxed">
            Five short steps. We will confirm by phone within one business hour.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-16">
        <BookingFlow
          services={(services ?? []) as Service[]}
          practitioners={(practitioners ?? []) as Practitioner[]}
          preselectedServiceId={preselected}
        />
      </section>
    </div>
  );
}
