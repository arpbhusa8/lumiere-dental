import Link from "next/link";
import { redirect } from "next/navigation";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { createClient } from "@/lib/supabase/server";
import type { Appointment } from "@/lib/types";

export const metadata = { title: "Your appointments" };

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/dashboard");

  const { data: appts } = await supabase
    .from("appointments")
    .select("*, services(name, duration_minutes), practitioners(name)")
    .eq("patient_id", user.id)
    .order("starts_at", { ascending: false });

  // Server Component: invoked once per request, not during React reconciliation.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const upcoming = (appts ?? []).filter(
    (a) => new Date(a.starts_at).getTime() > now && a.status !== "cancelled"
  );
  const past = (appts ?? []).filter(
    (a) => new Date(a.starts_at).getTime() <= now || a.status === "cancelled"
  );

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6 text-[var(--brass)]">Om Sai Dental</div>
          <h1 className="display text-[clamp(2.5rem,6vw,5rem)] tracking-[-0.03em]">
            Welcome back, <span className="italic">{user.email?.split("@")[0]}</span>.
          </h1>
        </Reveal>

        <div className="mt-16 grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-12">
            <Section
              title="Upcoming"
              empty="No upcoming appointments. Reserve your next hour."
              appts={upcoming as AppointmentRow[]}
            />
            <Section
              title="History"
              empty="Past appointments will appear here."
              appts={past as AppointmentRow[]}
              dim
            />
          </div>

          <aside className="lg:col-span-4 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="eyebrow text-[var(--brass)] mb-3">Need to change?</div>
              <h3 className="font-serif text-2xl tracking-tight">Reach the clinic</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                Call or message to reschedule or ask a clinical question. We&apos;ll get back to you
                directly.
              </p>
              <div className="mt-5 space-y-2 text-sm">
                <a href="tel:+97725538312" className="block hover:text-foreground transition-colors text-muted-foreground">
                  025-538312
                </a>
                <a
                  href="https://wa.me/9779852057909"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-foreground transition-colors text-muted-foreground"
                >
                  WhatsApp Dr. Ajit
                </a>
                {/* proof-gap: email */}
                <a href="mailto:info@omsaidental.com" className="block hover:text-foreground transition-colors text-muted-foreground">
                  info@omsaidental.com
                </a>
              </div>
            </div>

            <form action="/auth/signout" method="post" className="text-sm">
              <Button type="submit" variant="ghost" className="rounded-full text-muted-foreground">
                Sign out
              </Button>
            </form>
          </aside>
        </div>
      </section>
    </div>
  );
}

type AppointmentRow = Appointment & {
  services: { name: string; duration_minutes: number } | null;
  practitioners: { name: string } | null;
};

function Section({
  title,
  empty,
  appts,
  dim = false,
}: {
  title: string;
  empty: string;
  appts: AppointmentRow[];
  dim?: boolean;
}) {
  return (
    <div>
      <div className="flex items-end justify-between mb-6">
        <h2 className="font-serif text-2xl tracking-tight">{title}</h2>
        {title === "Upcoming" && (
          <Button asChild size="sm" className="rounded-full">
            <Link href="/booking">Reserve another</Link>
          </Button>
        )}
      </div>
      {appts.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {empty}
        </div>
      ) : (
        <ul className={`divide-y divide-border/60 ${dim ? "opacity-80" : ""}`}>
          {appts.map((a) => (
            <li key={a.id} className="py-6 grid grid-cols-12 gap-4 items-start">
              <div className="col-span-12 md:col-span-4">
                <div className="font-serif text-2xl leading-tight">
                  {format(new Date(a.starts_at), "EEEE d MMM")}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {format(new Date(a.starts_at), "HH:mm")} ·{" "}
                  {a.services?.duration_minutes ?? 60} min
                </div>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="font-medium">{a.services?.name ?? "Consultation"}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  with {a.practitioners?.name ?? "your clinician"}
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 text-right">
                <StatusPill status={a.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function StatusPill({ status }: { status: Appointment["status"] }) {
  const map: Record<Appointment["status"], { label: string; cls: string }> = {
    pending: { label: "Awaiting confirmation", cls: "bg-[var(--brass)]/15 text-[var(--brass)]" },
    confirmed: { label: "Confirmed", cls: "bg-[var(--primary)]/15 text-[var(--primary)]" },
    completed: { label: "Completed", cls: "bg-muted text-muted-foreground" },
    cancelled: { label: "Cancelled", cls: "bg-destructive/10 text-destructive" },
    no_show: { label: "Missed", cls: "bg-destructive/10 text-destructive" },
  };
  const m = map[status];
  return (
    <span className={`inline-block text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full ${m.cls}`}>
      {m.label}
    </span>
  );
}
