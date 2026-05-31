import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

/**
 * Server-only auth guards for RSC + server actions.
 *
 * Authorisation is ALWAYS enforced in Postgres (RLS + is_admin() + SECURITY
 * DEFINER RPCs). These helpers are the UX layer: they redirect unauthenticated
 * or non-admin visitors before a protected page renders. Never rely on them as
 * the sole gate — the database is the source of truth.
 */

/** Require a signed-in user, else redirect to login with a return path. */
export async function requireUser(next = "/dashboard"): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(next)}`);
  return user;
}

/** Require an admin, else redirect (unauth → login, customer → dashboard). */
export async function requireAdmin(): Promise<User> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login?next=/admin");

  const { data } = await supabase
    .from("patient_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (data?.role !== "admin") redirect("/dashboard");
  return user;
}

/** True when the current session is an admin (no redirect). */
export async function isAdmin(): Promise<boolean> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data } = await supabase
    .from("patient_profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return data?.role === "admin";
}
