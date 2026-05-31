"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export type ActionResult = { ok: true } | { ok: false; error: string };

const PaymentSchema = z.object({
  appointment_id: z.string().uuid(),
  payment_status: z.enum(["unpaid", "paid", "refunded"]),
});

const StatusSchema = z.object({
  appointment_id: z.string().uuid(),
  status: z.enum(["pending", "confirmed", "completed", "cancelled", "no_show"]),
});

const FeedbackPublicSchema = z.object({
  feedback_id: z.string().uuid(),
  is_public: z.boolean(),
});

/** Admin marks an appointment paid/unpaid/refunded. Authz enforced in is_admin() RPC. */
export async function setPaymentStatus(input: z.infer<typeof PaymentSchema>): Promise<ActionResult> {
  const parsed = PaymentSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_payment_status", {
    p_appointment_id: parsed.data.appointment_id,
    p_status: parsed.data.payment_status,
  });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

/** Admin moves an appointment through its lifecycle. */
export async function setAppointmentStatus(input: z.infer<typeof StatusSchema>): Promise<ActionResult> {
  const parsed = StatusSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_appointment_status", {
    p_appointment_id: parsed.data.appointment_id,
    p_status: parsed.data.status,
  });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}

/** Admin toggles whether feedback can be shown publicly (future testimonial). */
export async function setFeedbackPublic(input: z.infer<typeof FeedbackPublicSchema>): Promise<ActionResult> {
  const parsed = FeedbackPublicSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid input" };
  await requireAdmin();

  const supabase = await createClient();
  const { error } = await supabase.rpc("admin_set_feedback_public", {
    p_feedback_id: parsed.data.feedback_id,
    p_public: parsed.data.is_public,
  });
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/feedback");
  return { ok: true };
}
