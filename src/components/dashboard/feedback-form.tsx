"use client";

import { useState, useTransition } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { submitFeedback } from "@/app/dashboard/actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function FeedbackForm({
  appointmentId,
  serviceName,
}: {
  appointmentId: string;
  serviceName?: string;
}) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [comment, setComment] = useState("");
  const [pending, startTransition] = useTransition();

  function reset() {
    setRating(0);
    setHovered(0);
    setComment("");
  }

  function onSubmit() {
    startTransition(async () => {
      const result = await submitFeedback({
        appointment_id: appointmentId,
        rating,
        comment: comment.trim() ? comment.trim() : null,
      });
      if (result.ok) {
        toast.success("Thank you for your feedback");
        setOpen(false);
        reset();
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) reset();
      }}
    >
      <DialogTrigger asChild>
        <Button size="sm" variant="outline" className="rounded-full">
          Leave feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl tracking-tight">
            How was your visit?
          </DialogTitle>
          <DialogDescription>
            {serviceName
              ? `Share a few words about your ${serviceName}.`
              : "Share a few words about your appointment."}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <div className="eyebrow mb-2 text-[var(--brass)]">Your rating</div>
            <div
              className="flex items-center gap-1"
              role="radiogroup"
              aria-label="Rating out of 5 stars"
            >
              {[1, 2, 3, 4, 5].map((value) => {
                const active = (hovered || rating) >= value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value === 1 ? "" : "s"}`}
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHovered(value)}
                    onMouseLeave={() => setHovered(0)}
                    onFocus={() => setHovered(value)}
                    onBlur={() => setHovered(0)}
                    className="rounded-full p-1 outline-none transition-transform hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50"
                  >
                    <Star
                      className="size-7 transition-colors"
                      style={{
                        color: "var(--brass)",
                        fill: active ? "var(--brass)" : "transparent",
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label
              htmlFor="feedback-comment"
              className="eyebrow mb-2 block text-[var(--brass)]"
            >
              Comment <span className="normal-case tracking-normal text-muted-foreground">(optional)</span>
            </label>
            <Textarea
              id="feedback-comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={2000}
              rows={4}
              placeholder="What stood out about your care?"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            onClick={onSubmit}
            disabled={pending || rating === 0}
            className="rounded-full"
          >
            {pending ? "Sending…" : "Submit feedback"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
