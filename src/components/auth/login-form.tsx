"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";

export function LoginForm({ mode = "signin" }: { mode?: "signin" | "signup" }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [pending, startTransition] = useTransition();
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
          data: mode === "signup" ? { full_name: name } : undefined,
        },
      });
      if (error) {
        toast.error("Could not send magic link", { description: error.message });
        return;
      }
      setSent(true);
      toast.success("Check your inbox", { description: "We've sent a secure sign-in link." });
    });
    router; // touch to keep import; navigation happens via callback
  }

  if (sent) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <div className="mx-auto size-12 rounded-full bg-[var(--brass)]/15 grid place-items-center text-[var(--brass)] mb-5">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="size-5">
            <path d="M4 6l8 7 8-7M4 6v12a2 2 0 002 2h12a2 2 0 002-2V6M4 6a2 2 0 012-2h12a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="font-serif text-xl">Check your inbox.</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          A secure sign-in link is on its way to <span className="text-foreground">{email}</span>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      {mode === "signup" && (
        <div>
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Worthington"
            required
            className="mt-2"
          />
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@email.com"
          required
          autoComplete="email"
          className="mt-2"
        />
      </div>
      <Button type="submit" disabled={pending} className="w-full rounded-full h-11">
        {pending ? "Sending…" : mode === "signup" ? "Create account" : "Send magic link"}
      </Button>
    </form>
  );
}
