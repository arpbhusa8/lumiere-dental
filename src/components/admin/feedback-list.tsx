"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import type { Feedback } from "@/lib/types";
import { setFeedbackPublic } from "@/app/admin/actions";

export function FeedbackList({ items }: { items: Feedback[] }) {
  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Public feedback can later be surfaced as a testimonial on the site (with consent).
      </p>
      <ul className="space-y-4">
        {items.map((item) => (
          <li key={item.id}>
            <FeedbackCard item={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FeedbackCard({ item }: { item: Feedback }) {
  const [isPublic, setIsPublic] = useState(item.is_public);
  const [pending, startTransition] = useTransition();

  function toggle() {
    const next = !isPublic;
    setIsPublic(next); // optimistic
    startTransition(async () => {
      const result = await setFeedbackPublic({
        feedback_id: item.id,
        is_public: next,
      });
      if (result.ok) {
        toast.success(next ? "Featured publicly" : "Removed from public");
      } else {
        setIsPublic(!next); // revert on failure
        toast.error(result.error);
      }
    });
  }

  return (
    <article className="rounded-xl border border-border bg-card p-6">
      <div
        className="flex items-center gap-1"
        role="img"
        aria-label={`Rated ${item.rating} out of 5`}
      >
        {[1, 2, 3, 4, 5].map((value) => {
          const filled = item.rating >= value;
          return (
            <Star
              key={value}
              aria-hidden="true"
              className="size-4"
              style={{
                color: "var(--brass)",
                fill: filled ? "var(--brass)" : "transparent",
              }}
            />
          );
        })}
      </div>

      {item.comment ? (
        <blockquote className="mt-4 font-serif text-lg italic leading-relaxed tracking-tight">
          “{item.comment}”
        </blockquote>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground">No comment left</p>
      )}

      <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-border/60 pt-4">
        <div className="text-sm">
          <div className="font-medium">{item.patient_name ?? "Anonymous"}</div>
          <div className="mt-0.5 text-muted-foreground">
            {item.patient_email ? (
              <>
                {item.patient_email}
                <span aria-hidden="true"> · </span>
              </>
            ) : null}
            {format(new Date(item.created_at), "d MMM yyyy")}
          </div>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={isPublic}
          aria-label="Feature publicly"
          onClick={toggle}
          disabled={pending}
          className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium uppercase tracking-widest transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50 ${
            isPublic
              ? "border-transparent bg-[var(--brass)]/15 text-[var(--brass)]"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {isPublic ? "Featured ✓" : "Make public"}
        </button>
      </div>
    </article>
  );
}
