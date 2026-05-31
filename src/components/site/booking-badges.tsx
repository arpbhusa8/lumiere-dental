import type { AppointmentStatus, PaymentStatus } from "@/lib/types";

const STATUS: Record<AppointmentStatus, { label: string; cls: string }> = {
  pending: { label: "Awaiting confirmation", cls: "bg-[var(--brass)]/15 text-[var(--brass)]" },
  confirmed: { label: "Confirmed", cls: "bg-[var(--primary)]/15 text-[var(--primary)]" },
  completed: { label: "Completed", cls: "bg-muted text-muted-foreground" },
  cancelled: { label: "Cancelled", cls: "bg-destructive/10 text-destructive" },
  no_show: { label: "Missed", cls: "bg-destructive/10 text-destructive" },
};

const PAYMENT: Record<PaymentStatus, { label: string; cls: string }> = {
  unpaid: { label: "Unpaid", cls: "bg-amber-500/15 text-amber-700 dark:text-amber-400" },
  paid: { label: "Paid", cls: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" },
  refunded: { label: "Refunded", cls: "bg-muted text-muted-foreground" },
};

const PILL = "inline-block text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap";

export function StatusPill({ status }: { status: AppointmentStatus }) {
  const m = STATUS[status] ?? STATUS.pending;
  return <span className={`${PILL} ${m.cls}`}>{m.label}</span>;
}

export function PaymentPill({ status }: { status: PaymentStatus }) {
  // Defensive default: tolerate a missing/unknown value (e.g. during the window
  // before migration 009 lands the payment_status column).
  const m = PAYMENT[status] ?? PAYMENT.unpaid;
  return <span className={`${PILL} ${m.cls}`}>{m.label}</span>;
}
