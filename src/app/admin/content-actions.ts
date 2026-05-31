"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { requireAdmin } from "@/lib/auth";

export type ActionResult = { ok: true; id?: string } | { ok: false; error: string };

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

// ---------------------------------------------------------------------------
// Journal posts
// ---------------------------------------------------------------------------
const JournalSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(200),
  slug: z.string().max(80).optional(),
  excerpt: z.string().max(500).optional().nullable(),
  body: z.string().max(50000).default(""),
  cover_image: z.string().max(500).optional().nullable(),
  author: z.string().max(120).optional().nullable(),
  is_published: z.boolean().default(false),
});

export async function saveJournalPost(input: z.infer<typeof JournalSchema>): Promise<ActionResult> {
  const parsed = JournalSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  await requireAdmin();
  const supabase = await createClient();
  const d = parsed.data;
  const row = {
    title: d.title,
    slug: d.slug?.trim() || slugify(d.title),
    excerpt: d.excerpt ?? null,
    body: d.body ?? "",
    cover_image: d.cover_image ?? null,
    author: d.author ?? null,
    is_published: d.is_published,
    published_at: d.is_published ? new Date().toISOString() : null,
  };
  const q = d.id
    ? supabase.from("journal_posts").update(row).eq("id", d.id).select("id").maybeSingle()
    : supabase.from("journal_posts").insert(row).select("id").maybeSingle();
  const { data, error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/journals");
  revalidatePath("/journal");
  return { ok: true, id: data?.id };
}

// ---------------------------------------------------------------------------
// Promotions
// ---------------------------------------------------------------------------
const PromotionSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).max(200),
  description: z.string().max(1000).optional().nullable(),
  discount_label: z.string().max(80).optional().nullable(),
  starts_on: z.string().optional().nullable(),
  ends_on: z.string().optional().nullable(),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export async function savePromotion(input: z.infer<typeof PromotionSchema>): Promise<ActionResult> {
  const parsed = PromotionSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  await requireAdmin();
  const supabase = await createClient();
  const d = parsed.data;
  const row = {
    title: d.title,
    description: d.description ?? null,
    discount_label: d.discount_label ?? null,
    starts_on: d.starts_on || null,
    ends_on: d.ends_on || null,
    is_active: d.is_active,
    sort_order: d.sort_order,
  };
  const q = d.id
    ? supabase.from("promotions").update(row).eq("id", d.id).select("id").maybeSingle()
    : supabase.from("promotions").insert(row).select("id").maybeSingle();
  const { data, error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/promotions");
  revalidatePath("/");
  return { ok: true, id: data?.id };
}

// ---------------------------------------------------------------------------
// FAQs
// ---------------------------------------------------------------------------
const FaqSchema = z.object({
  id: z.string().uuid().optional(),
  question: z.string().min(3).max(300),
  answer: z.string().min(1).max(2000),
  category: z.string().max(80).optional().nullable(),
  sort_order: z.number().int().default(0),
  is_active: z.boolean().default(true),
});

export async function saveFaq(input: z.infer<typeof FaqSchema>): Promise<ActionResult> {
  const parsed = FaqSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  await requireAdmin();
  const supabase = await createClient();
  const d = parsed.data;
  const row = {
    question: d.question,
    answer: d.answer,
    category: d.category ?? null,
    sort_order: d.sort_order,
    is_active: d.is_active,
  };
  const q = d.id
    ? supabase.from("faqs").update(row).eq("id", d.id).select("id").maybeSingle()
    : supabase.from("faqs").insert(row).select("id").maybeSingle();
  const { data, error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/faqs");
  return { ok: true, id: data?.id };
}

// ---------------------------------------------------------------------------
// Doctors (practitioners table — feeds the booking flow)
// ---------------------------------------------------------------------------
const DoctorSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(2).max(120),
  slug: z.string().max(80).optional(),
  credentials: z.string().min(2).max(200),
  bio: z.string().max(2000).optional().nullable(),
  photo_url: z.string().max(500).optional().nullable(),
  is_active: z.boolean().default(true),
  sort_order: z.number().int().default(0),
});

export async function saveDoctor(input: z.infer<typeof DoctorSchema>): Promise<ActionResult> {
  const parsed = DoctorSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? "Invalid input" };
  await requireAdmin();
  const supabase = await createClient();
  const d = parsed.data;
  const row = {
    name: d.name,
    slug: d.slug?.trim() || slugify(d.name),
    credentials: d.credentials,
    bio: d.bio ?? null,
    photo_url: d.photo_url ?? null,
    is_active: d.is_active,
    sort_order: d.sort_order,
  };
  const q = d.id
    ? supabase.from("practitioners").update(row).eq("id", d.id).select("id").maybeSingle()
    : supabase.from("practitioners").insert(row).select("id").maybeSingle();
  const { data, error } = await q;
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin/doctors");
  revalidatePath("/booking");
  return { ok: true, id: data?.id };
}

// ---------------------------------------------------------------------------
// Generic delete (admin only; RLS still gates to is_admin())
// ---------------------------------------------------------------------------
const DeleteSchema = z.object({
  table: z.enum(["journal_posts", "promotions", "faqs", "practitioners"]),
  id: z.string().uuid(),
});

export async function deleteRow(input: z.infer<typeof DeleteSchema>): Promise<ActionResult> {
  const parsed = DeleteSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: "Invalid request" };
  await requireAdmin();
  const supabase = await createClient();
  const { error } = await supabase.from(parsed.data.table).delete().eq("id", parsed.data.id);
  if (error) return { ok: false, error: error.message };
  revalidatePath("/admin");
  return { ok: true };
}
