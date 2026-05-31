import { createClient } from "@/lib/supabase/server";
import type { Feedback } from "@/lib/types";
import { FeedbackList } from "@/components/admin/feedback-list";

// Layout (src/app/admin/layout.tsx) provides requireAdmin() + page chrome + <h1>.
// Admin-wide RLS lets is_admin() read every feedback row.
export default async function AdminFeedbackPage() {
  const supabase = await createClient();

  const { data: feedback } = await supabase
    .from("feedback")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <section>
      <div className="eyebrow mb-2 text-[var(--brass)]">Om Sai Dental</div>
      <h2 className="font-serif text-2xl tracking-tight">Patient feedback</h2>

      <div className="mt-8">
        {(feedback ?? []).length === 0 ? (
          <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No feedback yet. Ratings left after appointments will appear here.
          </div>
        ) : (
          <FeedbackList items={(feedback ?? []) as Feedback[]} />
        )}
      </div>
    </section>
  );
}
