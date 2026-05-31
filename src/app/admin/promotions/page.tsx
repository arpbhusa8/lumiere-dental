import { createClient } from "@/lib/supabase/server";
import type { Promotion } from "@/lib/types";
import { PromotionsManager } from "@/components/admin/promotions-manager";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS lets is_admin() read every promotions row (active, inactive, expired).
export default async function AdminPromotionsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("promotions")
    .select("*")
    .order("sort_order");

  return (
    <section>
      <div className="eyebrow mb-2 text-[var(--brass)]">Om Sai Dental</div>
      <h2 className="font-serif text-2xl tracking-tight">Promotions / offers</h2>

      <div className="mt-8">
        <PromotionsManager promotions={(data ?? []) as Promotion[]} />
      </div>
    </section>
  );
}
