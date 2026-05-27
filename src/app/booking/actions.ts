"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const Schema = z.object({
  patient_type: z.enum(["new", "returning"]),
  service_id: z.string().uuid(),
  practitioner_id: z.string().uuid().nullable(),
  starts_at: z.string().min(1),
  duration_minutes: z.number().int().positive(),
  patient_name: z.string().min(2),
  patient_email: z.string().email(),
  patient_phone: z.string().min(6),
  notes: z.string().max(2000).optional().nullable(),
});

export type CreateAppointmentInput = z.infer<typeof Schema>;

export type CreateAppointmentResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function createAppointment(
  input: CreateAppointmentInput
): Promise<CreateAppointmentResult> {
  const parsed = Schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  }

  const supabase = await createClient();
  const starts = new Date(parsed.data.starts_at);

  const { data, error } = await supabase.rpc("create_appointment", {
    p_service_id: parsed.data.service_id,
    p_practitioner_id: parsed.data.practitioner_id,
    p_starts_at: starts.toISOString(),
    p_duration_minutes: parsed.data.duration_minutes,
    p_patient_name: parsed.data.patient_name,
    p_patient_email: parsed.data.patient_email,
    p_patient_phone: parsed.data.patient_phone,
    p_patient_type: parsed.data.patient_type,
    p_notes: parsed.data.notes ?? null,
  });

  if (error || !data) {
    return { ok: false, error: error?.message ?? "Could not create appointment" };
  }
  return { ok: true, id: data as string };
}
