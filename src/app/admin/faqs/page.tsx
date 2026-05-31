import { createClient } from "@/lib/supabase/server";
import type { Faq } from "@/lib/faqs";
import { FaqsManager } from "@/components/admin/faqs-manager";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS (migration 010) lets is_admin() read every faqs row, active or not.
export default async function AdminFaqsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("faqs")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <section>
      <div className="eyebrow mb-2 text-[var(--brass)]">Om Sai Dental</div>
      <h2 className="font-serif text-2xl tracking-tight">FAQs</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        These power the enquiry chatbot.
      </p>

      <div className="mt-8">
        <FaqsManager faqs={(data ?? []) as Faq[]} />
      </div>
    </section>
  );
}
