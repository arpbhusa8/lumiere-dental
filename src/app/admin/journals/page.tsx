import { createClient } from "@/lib/supabase/server";
import type { JournalPost } from "@/lib/types";
import { JournalsManager } from "@/components/admin/journals-manager";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS lets is_admin() read every journal_posts row (published or draft).
export default async function AdminJournalsPage() {
  const supabase = await createClient();

  const { data } = await supabase
    .from("journal_posts")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section>
      <div className="eyebrow mb-2 text-[var(--brass)]">Om Sai Dental</div>
      <h2 className="font-serif text-2xl tracking-tight">Journal posts</h2>

      <div className="mt-8">
        <JournalsManager posts={(data ?? []) as JournalPost[]} />
      </div>
    </section>
  );
}
