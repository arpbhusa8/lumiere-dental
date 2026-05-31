"use client";

import { useMemo, useRef, useState, useTransition } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  startOfWeek,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  addMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import type {
  Appointment,
  AppointmentStatus,
  PaymentStatus,
} from "@/lib/types";
import { setPaymentStatus, setAppointmentStatus } from "@/app/admin/actions";
import { StatusPill, PaymentPill } from "@/components/site/booking-badges";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type AdminAppointment = Appointment & {
  services: { name: string } | null;
  practitioners: { id: string; name: string } | null;
};

type Props = {
  appointments: AdminAppointment[];
  practitioners: { id: string; name: string }[];
};

const STATUS_OPTIONS: { value: AppointmentStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "completed", label: "Completed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "no_show", label: "No-show" },
];

const PAYMENT_OPTIONS: { value: PaymentStatus; label: string }[] = [
  { value: "unpaid", label: "Unpaid" },
  { value: "paid", label: "Paid" },
  { value: "refunded", label: "Refunded" },
];

const ALL = "__all__";

export function BookingsBoard({ appointments, practitioners }: Props) {
  // Default the calendar + selected day to the soonest upcoming appointment
  // (falling back to today / current month). Computed once — inputs are static
  // props from a server render, so a lazy useState initialiser is correct.
  const [{ initialMonth, initialDay }] = useState(() => {
    const now = new Date();
    const next = appointments.find(
      (a) => new Date(a.starts_at).getTime() >= now.getTime(),
    );
    const anchor = next ? new Date(next.starts_at) : now;
    return { initialMonth: startOfMonth(anchor), initialDay: now };
  });

  const [doctorId, setDoctorId] = useState<string>(ALL);
  const [month, setMonth] = useState<Date>(initialMonth);
  const [selectedDay, setSelectedDay] = useState<Date>(initialDay);

  const agendaRef = useRef<HTMLDivElement>(null);

  const today = useMemo(() => new Date(), []);

  // Filter by practitioner once; everything below derives from this.
  const filtered = useMemo(
    () =>
      doctorId === ALL
        ? appointments
        : appointments.filter((a) => a.practitioner_id === doctorId),
    [appointments, doctorId],
  );

  // Map "yyyy-MM-dd" -> appointments on that day, for fast calendar counts.
  const byDay = useMemo(() => {
    const map = new Map<string, AdminAppointment[]>();
    for (const a of filtered) {
      const key = format(new Date(a.starts_at), "yyyy-MM-dd");
      const bucket = map.get(key);
      if (bucket) bucket.push(a);
      else map.set(key, [a]);
    }
    return map;
  }, [filtered]);

  // Full calendar grid: whole weeks spanning the visible month.
  const days = useMemo(() => {
    const gridStart = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
    const gridEnd = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
    return eachDayOfInterval({ start: gridStart, end: gridEnd });
  }, [month]);

  // Agenda groups: distinct days that have appointments, ascending.
  const agendaGroups = useMemo(() => {
    const keys = Array.from(byDay.keys()).sort();
    return keys.map((key) => {
      const items = [...byDay.get(key)!].sort(
        (a, b) =>
          new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime(),
      );
      return { key, day: new Date(`${key}T00:00:00`), items };
    });
  }, [byDay]);

  function selectDay(day: Date) {
    setSelectedDay(day);
    if (!isSameMonth(day, month)) setMonth(startOfMonth(day));
    // Scroll the agenda heading for this day into view, if present.
    requestAnimationFrame(() => {
      const key = format(day, "yyyy-MM-dd");
      const el = agendaRef.current?.querySelector<HTMLElement>(
        `[data-day="${key}"]`,
      );
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  const monthLabel = format(month, "MMMM yyyy");
  const weekdayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="space-y-10">
      {/* Practitioner filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="eyebrow mr-1 text-[var(--brass)]">Filter</span>
        <FilterPill
          active={doctorId === ALL}
          onClick={() => setDoctorId(ALL)}
        >
          All doctors
        </FilterPill>
        {practitioners.map((p) => (
          <FilterPill
            key={p.id}
            active={doctorId === p.id}
            onClick={() => setDoctorId(p.id)}
          >
            {p.name}
          </FilterPill>
        ))}
      </div>

      <div className="grid gap-10 lg:grid-cols-12">
        {/* Calendar */}
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-serif text-xl tracking-tight">{monthLabel}</h2>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Previous month"
                  onClick={() => setMonth((m) => addMonths(m, -1))}
                >
                  <ChevronLeft />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="Next month"
                  onClick={() => setMonth((m) => addMonths(m, 1))}
                >
                  <ChevronRight />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1">
              {weekdayLabels.map((w) => (
                <div
                  key={w}
                  className="pb-2 text-center text-[10px] uppercase tracking-widest text-muted-foreground"
                >
                  {w}
                </div>
              ))}

              {days.map((day) => {
                const key = format(day, "yyyy-MM-dd");
                const count = byDay.get(key)?.length ?? 0;
                const outside = !isSameMonth(day, month);
                const isToday = isSameDay(day, today);
                const isSelected = isSameDay(day, selectedDay);
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => selectDay(day)}
                    aria-pressed={isSelected}
                    aria-label={`${format(day, "EEEE d MMMM")}${
                      count ? `, ${count} appointment${count > 1 ? "s" : ""}` : ""
                    }`}
                    className={cn(
                      "relative flex aspect-square flex-col items-center justify-center rounded-lg border text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
                      outside
                        ? "border-transparent text-muted-foreground/40"
                        : "border-transparent text-foreground hover:bg-muted",
                      isToday && !isSelected && "ring-1 ring-[var(--brass)]/50",
                      isSelected &&
                        "border-[var(--brass)] bg-[var(--brass)]/10 text-foreground",
                    )}
                  >
                    <span className={cn(isToday && "font-semibold text-[var(--brass)]")}>
                      {format(day, "d")}
                    </span>
                    {count > 0 && (
                      <span className="mt-1 flex items-center gap-0.5" aria-hidden>
                        {Array.from({ length: Math.min(count, 3) }).map((_, i) => (
                          <span
                            key={i}
                            className="size-1 rounded-full bg-[var(--brass)]"
                          />
                        ))}
                        {count > 3 && (
                          <span className="text-[9px] leading-none text-[var(--brass)]">
                            +
                          </span>
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Agenda */}
        <div ref={agendaRef} className="space-y-10 lg:col-span-7">
          {agendaGroups.length === 0 ? (
            <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">
              No bookings{doctorId === ALL ? "" : " for this doctor"} yet.
            </div>
          ) : (
            agendaGroups.map(({ key, day, items }) => (
              <section
                key={key}
                data-day={key}
                className="scroll-mt-28"
                aria-current={isSameDay(day, selectedDay) ? "date" : undefined}
              >
                <h3
                  className={cn(
                    "mb-4 font-serif text-2xl tracking-tight",
                    isSameDay(day, selectedDay) && "text-[var(--brass)]",
                  )}
                >
                  {format(day, "EEEE d MMMM")}
                </h3>
                <ul className="divide-y divide-border/60">
                  {items.map((a) => (
                    <AgendaRow key={a.id} appointment={a} />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50",
        active
          ? "border-[var(--brass)] bg-[var(--brass)]/10 text-foreground"
          : "border-border text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}

function AgendaRow({ appointment: a }: { appointment: AdminAppointment }) {
  const [pending, startTransition] = useTransition();

  function handle(promise: Promise<{ ok: boolean; error?: string }>, ok: string) {
    startTransition(async () => {
      const result = await promise;
      if (result.ok === false) toast.error(result.error ?? "Something went wrong");
      else toast.success(ok);
    });
  }

  return (
    <li className="grid grid-cols-12 items-start gap-4 py-6">
      <div className="col-span-12 md:col-span-2">
        <div className="font-serif text-2xl leading-none tabular-nums">
          {format(new Date(a.starts_at), "HH:mm")}
        </div>
      </div>

      <div className="col-span-12 space-y-1 md:col-span-5">
        <div className="font-medium">{a.patient_name}</div>
        <div className="text-sm text-muted-foreground">
          {a.services?.name ?? "Consultation"}
        </div>
        <div className="text-sm text-muted-foreground">
          with {a.practitioners?.name ?? "unassigned"}
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <StatusPill status={a.status} />
          <PaymentPill status={a.payment_status} />
        </div>
      </div>

      <div className="col-span-12 flex flex-wrap items-center gap-2 md:col-span-5 md:justify-end">
        {/* Payment status */}
        <Select
          value={a.payment_status}
          disabled={pending}
          onValueChange={(v) =>
            handle(
              setPaymentStatus({
                appointment_id: a.id,
                payment_status: v as PaymentStatus,
              }),
              `Marked ${PAYMENT_OPTIONS.find((o) => o.value === v)?.label.toLowerCase()}`,
            )
          }
        >
          <SelectTrigger size="sm" aria-label="Payment status" className="min-w-[7rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PAYMENT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Appointment status */}
        <Select
          value={a.status}
          disabled={pending}
          onValueChange={(v) =>
            handle(
              setAppointmentStatus({
                appointment_id: a.id,
                status: v as AppointmentStatus,
              }),
              `Set to ${STATUS_OPTIONS.find((o) => o.value === v)?.label.toLowerCase()}`,
            )
          }
        >
          <SelectTrigger size="sm" aria-label="Appointment status" className="min-w-[8rem]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {STATUS_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </li>
  );
}
