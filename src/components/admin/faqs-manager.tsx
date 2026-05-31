"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { Faq } from "@/lib/faqs";
import { saveFaq, deleteRow } from "@/app/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormState = {
  id?: string;
  question: string;
  answer: string;
  category: string;
  sort_order: number;
  is_active: boolean;
};

function toForm(faq?: Faq): FormState {
  return {
    id: faq?.id,
    question: faq?.question ?? "",
    answer: faq?.answer ?? "",
    category: faq?.category ?? "",
    sort_order: faq?.sort_order ?? 0,
    is_active: faq?.is_active ?? true,
  };
}

export function FaqsManager({ faqs }: { faqs: Faq[] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toForm());
  const [pending, startTransition] = useTransition();

  function openAdd() {
    setForm(toForm());
    setOpen(true);
  }

  function openEdit(faq: Faq) {
    setForm(toForm(faq));
    setOpen(true);
  }

  function handleSave() {
    startTransition(async () => {
      const result = await saveFaq({
        id: form.id,
        question: form.question,
        answer: form.answer,
        category: form.category.trim() || null,
        sort_order: form.sort_order,
        is_active: form.is_active,
      });
      if (result.ok) {
        toast.success(form.id ? "FAQ updated" : "FAQ added");
        setOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete(faq: Faq) {
    if (!confirm(`Delete "${faq.question}"? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteRow({ table: "faqs", id: faq.id });
      if (result.ok) toast.success("FAQ deleted");
      else toast.error(result.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          FAQs added here appear in the floating enquiry chatbot, ordered by sort
          order.
        </p>
        <Button type="button" onClick={openAdd} className="rounded-full">
          <Plus aria-hidden="true" />
          Add FAQ
        </Button>
      </div>

      {faqs.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No FAQs yet. Add one to surface it in the enquiry chatbot.
        </div>
      ) : (
        <ul className="space-y-4">
          {faqs.map((faq) => (
            <li key={faq.id}>
              <article className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground tabular-nums">
                        #{faq.sort_order}
                      </span>
                      {faq.category && (
                        <span className="inline-flex items-center rounded-full bg-[var(--brass)]/15 px-2.5 py-0.5 text-xs font-medium text-[var(--brass)]">
                          {faq.category}
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-widest ${
                          faq.is_active
                            ? "bg-[var(--forest)]/10 text-[var(--forest)]"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {faq.is_active ? "Active" : "Inactive"}
                      </span>
                    </div>
                    <h3 className="mt-2 font-serif text-xl tracking-tight">
                      {faq.question}
                    </h3>
                    <p className="mt-2 max-w-prose text-sm leading-relaxed text-muted-foreground">
                      {faq.answer}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => openEdit(faq)}
                      disabled={pending}
                    >
                      <Pencil aria-hidden="true" />
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full text-destructive hover:text-destructive"
                      onClick={() => handleDelete(faq)}
                      disabled={pending}
                    >
                      <Trash2 aria-hidden="true" />
                      Delete
                    </Button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-lg">
              {form.id ? "Edit FAQ" : "Add FAQ"}
            </DialogTitle>
            <DialogDescription>
              Shown to visitors in the floating enquiry chatbot.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <Field label="Question" htmlFor="faq-question">
              <Input
                id="faq-question"
                value={form.question}
                onChange={(e) =>
                  setForm((f) => ({ ...f, question: e.target.value }))
                }
                placeholder="Where is the clinic located?"
                required
                minLength={3}
                maxLength={300}
              />
            </Field>

            <Field label="Answer" htmlFor="faq-answer">
              <Textarea
                id="faq-answer"
                value={form.answer}
                onChange={(e) =>
                  setForm((f) => ({ ...f, answer: e.target.value }))
                }
                placeholder="A short, direct answer."
                rows={4}
                required
                minLength={1}
                maxLength={2000}
              />
            </Field>

            <Field label="Category" htmlFor="faq-category">
              <Input
                id="faq-category"
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
                placeholder="Booking, Visiting, Treatments…"
                maxLength={80}
              />
            </Field>

            <div className="flex items-end gap-4">
              <Field label="Sort order" htmlFor="faq-sort" className="w-32">
                <Input
                  id="faq-sort"
                  type="number"
                  inputMode="numeric"
                  value={form.sort_order}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      sort_order: Number.parseInt(e.target.value, 10) || 0,
                    }))
                  }
                />
              </Field>

              <label className="flex h-8 items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, is_active: e.target.checked }))
                  }
                  className="size-4 rounded border-input accent-[var(--brass)] outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
                />
                <span>Active (shown in chatbot)</span>
              </label>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={pending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={pending}>
                {pending ? "Saving…" : "Save FAQ"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {children}
    </div>
  );
}
