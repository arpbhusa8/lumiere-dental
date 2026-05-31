import { createClient } from "@/lib/supabase/server";
import type { Appointment } from "@/lib/types";
import { BookingsBoard } from "@/components/admin/bookings-board";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS (migration 007) lets is_admin() read every appointment row.
export default async function AdminBookingsPage() {
  const supabase = await createClient();

  const [{ data: appointments }, { data: practitioners }] = await Promise.all([
    supabase
      .from("appointments")
      .select("*, services(name), practitioners(id, name)")
      .order("starts_at", { ascending: true }),
    supabase
      .from("practitioners")
      .select("id, name")
      .eq("is_active", true)
      .order("sort_order"),
  ]);

  return (
    <BookingsBoard
      appointments={(appointments ?? []) as AdminAppointment[]}
      practitioners={(practitioners ?? []) as { id: string; name: string }[]}
    />
  );
}

type AdminAppointment = Appointment & {
  services: { name: string } | null;
  practitioners: { id: string; name: string } | null;
};
