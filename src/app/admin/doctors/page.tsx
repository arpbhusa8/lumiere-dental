import { createClient } from "@/lib/supabase/server";
import type { Practitioner } from "@/lib/types";
import { DoctorsManager } from "@/components/admin/doctors-manager";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS (migration 010) lets is_admin() read every practitioner row.
export default async function AdminDoctorsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("practitioners")
    .select("*")
    .order("sort_order");

  return (
    <section>
      <div className="eyebrow mb-2 text-[var(--brass)]">Om Sai Dental</div>
      <h2 className="font-serif text-2xl tracking-tight">Doctors</h2>

      <div className="mt-8">
        <DoctorsManager doctors={(data ?? []) as Practitioner[]} />
      </div>
    </section>
  );
}
