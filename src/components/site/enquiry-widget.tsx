import { createClient } from "@/lib/supabase/server";
import { EnquiryChatbot } from "@/components/site/enquiry-chatbot";
import { FALLBACK_FAQS, type Faq } from "@/lib/faqs";

/**
 * Server wrapper: loads admin-managed FAQs for the chatbot, falling back to the
 * built-in set if the table is empty or not yet provisioned (migration 010).
 */
export async function EnquiryWidget() {
  let faqs: Faq[] = FALLBACK_FAQS;
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from("faqs")
      .select("id, question, answer, category, sort_order, is_active")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });
    if (data && data.length > 0) faqs = data as Faq[];
  } catch {
    // table missing / network hiccup → keep the fallback set
  }
  return <EnquiryChatbot faqs={faqs} />;
}
