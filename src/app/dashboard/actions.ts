"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

const FeedbackSchema = z.object({
  appointment_id: z.string().uuid().nullable().optional(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(2000).optional().nullable(),
});

export type SubmitFeedbackInput = z.infer<typeof FeedbackSchema>;
export type ActionResult = { ok: true } | { ok: false; error: string };

/** Customer leaves feedback. Auth + ownership enforced in the RPC (auth.uid()). */
export async function submitFeedback(input: SubmitFeedbackInput): Promise<ActionResult> {
  const parsed = FeedbackSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("submit_feedback", {
    p_appointment_id: parsed.data.appointment_id ?? null,
    p_rating: parsed.data.rating,
    p_comment: parsed.data.comment ?? null,
  });

  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard");
  return { ok: true };
}

const CancelSchema = z.object({ appointment_id: z.string().uuid() });

/** Customer cancels their own upcoming appointment (RLS + guard trigger enforce ownership). */
export async function cancelAppointment(input: { appointment_id: string }): Promise<ActionResult> {
  const parsed = CancelSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid request" };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Not signed in" };

  const { error } = await supabase
    .from("appointments")
    .update({ status: "cancelled" })
    .eq("id", parsed.data.appointment_id)
    .eq("patient_id", user.id);

  if (error) return { ok: false, error: error.message };
  revalidatePath("/dashboard");
  return { ok: true };
}
