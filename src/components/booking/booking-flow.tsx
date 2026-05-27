"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, isSameDay, startOfDay } from "date-fns";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Service, Practitioner } from "@/lib/types";
import { createAppointment } from "@/app/booking/actions";

const STEPS = ["Type", "Treatment", "Time", "Details", "Review"] as const;
const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"];
const EASE = [0.22, 1, 0.36, 1] as const;

type State = {
  step: number;
  patientType: "new" | "returning" | null;
  serviceId: string | null;
  practitionerId: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

export function BookingFlow({
  services,
  practitioners,
  preselectedServiceId,
}: {
  services: Service[];
  practitioners: Practitioner[];
  preselectedServiceId: string | null;
}) {
  const [state, setState] = useState<State>({
    step: 0,
    patientType: null,
    serviceId: preselectedServiceId,
    practitionerId: null,
    date: null,
    time: null,
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [confirmedId, setConfirmedId] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const service = useMemo(
    () => services.find((s) => s.id === state.serviceId) ?? null,
    [services, state.serviceId]
  );

  const canNext = (() => {
    switch (state.step) {
      case 0:
        return !!state.patientType;
      case 1:
        return !!state.serviceId;
      case 2:
        return !!state.date && !!state.time;
      case 3:
        return (
          state.name.length > 1 &&
          /.+@.+/.test(state.email) &&
          state.phone.length > 5
        );
      case 4:
        return true;
      default:
        return false;
    }
  })();

  function next() {
    setState((s) => ({ ...s, step: Math.min(s.step + 1, STEPS.length - 1) }));
  }
  function back() {
    setState((s) => ({ ...s, step: Math.max(s.step - 1, 0) }));
  }

  function submit() {
    if (!state.serviceId || !state.date || !state.time || !service) return;
    const [h, m] = state.time.split(":").map(Number);
    const startsAt = new Date(state.date);
    startsAt.setHours(h, m, 0, 0);
    startTransition(async () => {
      const result = await createAppointment({
        patient_type: state.patientType!,
        service_id: state.serviceId!,
        practitioner_id: state.practitionerId,
        starts_at: startsAt.toISOString(),
        duration_minutes: service.duration_minutes,
        patient_name: state.name,
        patient_email: state.email,
        patient_phone: state.phone,
        notes: state.notes || null,
      });
      if (result.ok) {
        setConfirmedId(result.id);
        toast.success("Reservation received", {
          description: "We will confirm by phone within one business hour.",
        });
      } else {
        toast.error("Could not book", { description: result.error });
      }
    });
  }

  if (confirmedId) {
    return <Confirmation id={confirmedId} state={state} service={service} />;
  }

  return (
    <div className="grid lg:grid-cols-12 gap-12">
      <aside className="lg:col-span-3">
        <ol className="space-y-4">
          {STEPS.map((label, i) => {
            const done = i < state.step;
            const active = i === state.step;
            return (
              <li
                key={label}
                className={cn(
                  "flex items-center gap-4 transition-colors",
                  active ? "text-foreground" : done ? "text-muted-foreground" : "text-muted-foreground/50"
                )}
              >
                <span
                  className={cn(
                    "size-6 rounded-full grid place-items-center border text-xs",
                    active ? "bg-[var(--brass)] border-[var(--brass)] text-[var(--forest)]" : done ? "border-[var(--brass)]/60 text-[var(--brass)]" : "border-border"
                  )}
                >
                  {done ? <Check className="size-3.5" /> : i + 1}
                </span>
                <span className="text-sm tracking-wide">{label}</span>
              </li>
            );
          })}
        </ol>
      </aside>

      <div className="lg:col-span-9">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-12 min-h-[520px] flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div
              key={state.step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="flex-1"
            >
              {state.step === 0 && (
                <StepType
                  value={state.patientType}
                  onChange={(v) => setState((s) => ({ ...s, patientType: v }))}
                />
              )}
              {state.step === 1 && (
                <StepTreatment
                  services={services}
                  practitioners={practitioners}
                  serviceId={state.serviceId}
                  practitionerId={state.practitionerId}
                  onService={(id) => setState((s) => ({ ...s, serviceId: id }))}
                  onPractitioner={(id) => setState((s) => ({ ...s, practitionerId: id }))}
                />
              )}
              {state.step === 2 && (
                <StepTime
                  date={state.date}
                  time={state.time}
                  onDate={(d) => setState((s) => ({ ...s, date: d, time: null }))}
                  onTime={(t) => setState((s) => ({ ...s, time: t }))}
                />
              )}
              {state.step === 3 && (
                <StepDetails
                  name={state.name}
                  email={state.email}
                  phone={state.phone}
                  notes={state.notes}
                  onChange={(patch) => setState((s) => ({ ...s, ...patch }))}
                />
              )}
              {state.step === 4 && (
                <StepReview state={state} service={service} practitioners={practitioners} />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-10 pt-6 border-t border-border flex justify-between">
            <Button
              variant="ghost"
              onClick={back}
              disabled={state.step === 0}
              className="rounded-full"
            >
              <ChevronLeft className="mr-1 size-4" />
              Back
            </Button>
            {state.step < STEPS.length - 1 ? (
              <Button onClick={next} disabled={!canNext} className="rounded-full px-6">
                Continue
                <ChevronRight className="ml-1 size-4" />
              </Button>
            ) : (
              <Button onClick={submit} disabled={pending} className="rounded-full px-7">
                {pending ? "Reserving…" : "Reserve appointment"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepType({ value, onChange }: { value: State["patientType"]; onChange: (v: State["patientType"]) => void }) {
  const opts = [
    { v: "new" as const, label: "I'm new to Lumière", desc: "First visit. We'll begin with a sixty-minute consultation." },
    { v: "returning" as const, label: "I'm a returning patient", desc: "Welcome back. Reserve with your usual clinician." },
  ];
  return (
    <div>
      <div className="eyebrow text-[var(--brass)] mb-3">Step 1</div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Tell us about yourself.</h2>
      <p className="mt-3 text-muted-foreground text-sm">A short orientation, then we'll match you to a clinician.</p>
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {opts.map((o) => {
          const active = value === o.v;
          return (
            <button
              key={o.v}
              onClick={() => onChange(o.v)}
              className={cn(
                "text-left p-6 rounded-xl border transition-all",
                active ? "border-[var(--brass)] bg-[var(--brass)]/8" : "border-border hover:border-foreground/30"
              )}
            >
              <div className="font-serif text-xl tracking-tight">{o.label}</div>
              <div className="mt-2 text-sm text-muted-foreground leading-relaxed">{o.desc}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function StepTreatment({
  services,
  practitioners,
  serviceId,
  practitionerId,
  onService,
  onPractitioner,
}: {
  services: Service[];
  practitioners: Practitioner[];
  serviceId: string | null;
  practitionerId: string | null;
  onService: (id: string) => void;
  onPractitioner: (id: string | null) => void;
}) {
  return (
    <div>
      <div className="eyebrow text-[var(--brass)] mb-3">Step 2</div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Choose a treatment.</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-3">
        {services.map((s) => {
          const active = s.id === serviceId;
          return (
            <button
              key={s.id}
              onClick={() => onService(s.id)}
              className={cn(
                "text-left p-4 rounded-xl border transition-all flex justify-between items-start gap-3",
                active ? "border-[var(--brass)] bg-[var(--brass)]/8" : "border-border hover:border-foreground/30"
              )}
            >
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{s.duration_minutes} min</div>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">
                {s.price_from ? `From £${s.price_from.toLocaleString()}` : "POA"}
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-10">
        <Label className="eyebrow text-[var(--brass)]">Preferred clinician (optional)</Label>
        <div className="mt-4 flex flex-wrap gap-2">
          <PracChip label="No preference" active={!practitionerId} onClick={() => onPractitioner(null)} />
          {practitioners.map((p) => (
            <PracChip
              key={p.id}
              label={p.name}
              active={practitionerId === p.id}
              onClick={() => onPractitioner(p.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PracChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-1.5 rounded-full text-xs border transition-colors",
        active ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground/40"
      )}
    >
      {label}
    </button>
  );
}

function StepTime({
  date,
  time,
  onDate,
  onTime,
}: {
  date: Date | null;
  time: string | null;
  onDate: (d: Date) => void;
  onTime: (t: string) => void;
}) {
  const today = startOfDay(new Date());
  const days = Array.from({ length: 14 }, (_, i) => addDays(today, i + 1));

  return (
    <div>
      <div className="eyebrow text-[var(--brass)] mb-3">Step 3</div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Pick a date and time.</h2>
      <p className="mt-3 text-muted-foreground text-sm">Showing the next fortnight. Availability confirmed by phone.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div>
          <Label className="eyebrow text-[var(--brass)]">Date</Label>
          <div className="mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2">
            {days.map((d) => {
              const active = date && isSameDay(d, date);
              return (
                <button
                  key={d.toISOString()}
                  onClick={() => onDate(d)}
                  className={cn(
                    "p-3 rounded-lg border text-center transition-all",
                    active ? "border-[var(--brass)] bg-[var(--brass)]/8" : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                    {format(d, "EEE")}
                  </div>
                  <div className="font-serif text-lg leading-none mt-1">{format(d, "d")}</div>
                  <div className="text-[10px] text-muted-foreground mt-1">{format(d, "MMM")}</div>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <Label className="eyebrow text-[var(--brass)]">Time</Label>
          <div className={cn("mt-4 grid grid-cols-3 gap-2", !date && "opacity-40 pointer-events-none")}>
            {TIME_SLOTS.map((t) => {
              const active = time === t;
              return (
                <button
                  key={t}
                  onClick={() => onTime(t)}
                  className={cn(
                    "py-2.5 rounded-lg border text-sm transition-all",
                    active ? "border-[var(--brass)] bg-[var(--brass)]/8" : "border-border hover:border-foreground/30"
                  )}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function StepDetails({
  name,
  email,
  phone,
  notes,
  onChange,
}: {
  name: string;
  email: string;
  phone: string;
  notes: string;
  onChange: (patch: Partial<State>) => void;
}) {
  return (
    <div>
      <div className="eyebrow text-[var(--brass)] mb-3">Step 4</div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight">Where shall we reach you?</h2>
      <div className="mt-8 grid sm:grid-cols-2 gap-5">
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input id="name" value={name} onChange={(e) => onChange({ name: e.target.value })} className="mt-2" />
        </div>
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" type="tel" value={phone} onChange={(e) => onChange({ phone: e.target.value })} className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => onChange({ email: e.target.value })} className="mt-2" />
        </div>
        <div className="sm:col-span-2">
          <Label htmlFor="notes">Notes (optional)</Label>
          <Textarea
            id="notes"
            rows={4}
            value={notes}
            onChange={(e) => onChange({ notes: e.target.value })}
            placeholder="Anything we should know — anxieties, accessibility, prior treatment elsewhere."
            className="mt-2"
          />
        </div>
      </div>
    </div>
  );
}

function StepReview({ state, service, practitioners }: { state: State; service: Service | null; practitioners: Practitioner[] }) {
  const prac = practitioners.find((p) => p.id === state.practitionerId);
  return (
    <div>
      <div className="eyebrow text-[var(--brass)] mb-3">Step 5</div>
      <h2 className="font-serif text-3xl md:text-4xl tracking-tight">A final glance.</h2>
      <div className="mt-8 divide-y divide-border/60">
        <Row label="Patient" value={state.patientType === "new" ? "New to Lumière" : "Returning patient"} />
        <Row label="Treatment" value={service?.name ?? "—"} sub={service ? `${service.duration_minutes} min` : ""} />
        <Row label="Clinician" value={prac?.name ?? "No preference"} />
        <Row
          label="When"
          value={state.date ? format(state.date, "EEEE d MMMM") : "—"}
          sub={state.time ?? ""}
        />
        <Row label="Name" value={state.name} />
        <Row label="Email" value={state.email} />
        <Row label="Phone" value={state.phone} />
        {state.notes && <Row label="Notes" value={state.notes} />}
      </div>
      <p className="mt-8 text-xs text-muted-foreground leading-relaxed">
        By reserving you agree to our cancellation policy — at least 48 hours notice, otherwise a £50 deposit is forfeit.
      </p>
    </div>
  );
}

function Row({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="py-3 grid grid-cols-3 gap-4 text-sm">
      <div className="eyebrow self-start">{label}</div>
      <div className="col-span-2">
        <div className="font-medium">{value}</div>
        {sub && <div className="text-xs text-muted-foreground mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

function Confirmation({ id, state, service }: { id: string; state: State; service: Service | null }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-16">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto size-16 rounded-full bg-[var(--brass)]/15 grid place-items-center text-[var(--brass)]"
      >
        <Check className="size-7" />
      </motion.div>
      <h2 className="mt-8 font-serif text-4xl md:text-5xl tracking-tight">Reservation received.</h2>
      <p className="mt-6 text-muted-foreground leading-relaxed">
        Thank you, {state.name.split(" ")[0]}. We have your request for{" "}
        <span className="text-foreground">{service?.name}</span>
        {state.date ? ` on ${format(state.date, "EEEE d MMMM")} at ${state.time}` : ""}.
        Our concierge will telephone within one business hour to confirm.
      </p>
      <p className="mt-6 text-xs text-muted-foreground">Reference · {id.slice(0, 8).toUpperCase()}</p>
      <Button asChild className="mt-10 rounded-full h-11 px-6">
        <a href="/">Return home</a>
      </Button>
    </div>
  );
}
