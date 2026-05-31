"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import type { Promotion } from "@/lib/types";
import { savePromotion, deleteRow } from "@/app/admin/content-actions";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type EditState = {
  id?: string;
  title: string;
  description: string;
  discount_label: string;
  starts_on: string;
  ends_on: string;
  is_active: boolean;
  sort_order: number;
};

const EMPTY: EditState = {
  title: "",
  description: "",
  discount_label: "",
  starts_on: "",
  ends_on: "",
  is_active: true,
  sort_order: 0,
};

function toEditState(promo: Promotion): EditState {
  return {
    id: promo.id,
    title: promo.title,
    description: promo.description ?? "",
    discount_label: promo.discount_label ?? "",
    // date inputs need a YYYY-MM-DD value; strip any time component.
    starts_on: promo.starts_on ? promo.starts_on.slice(0, 10) : "",
    ends_on: promo.ends_on ? promo.ends_on.slice(0, 10) : "",
    is_active: promo.is_active,
    sort_order: promo.sort_order,
  };
}

function formatRange(promo: Promotion): string {
  const fmt = (d: string) => format(new Date(d), "d MMM yyyy");
  if (promo.starts_on && promo.ends_on) {
    return `${fmt(promo.starts_on)} – ${fmt(promo.ends_on)}`;
  }
  if (promo.starts_on) return `From ${fmt(promo.starts_on)}`;
  if (promo.ends_on) return `Until ${fmt(promo.ends_on)}`;
  return "No date limit";
}

export function PromotionsManager({ promotions }: { promotions: Promotion[] }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<EditState>(EMPTY);
  const [pending, startTransition] = useTransition();

  function openNew() {
    setDraft(EMPTY);
    setOpen(true);
  }

  function openEdit(promo: Promotion) {
    setDraft(toEditState(promo));
    setOpen(true);
  }

  function save() {
    startTransition(async () => {
      const result = await savePromotion({
        id: draft.id,
        title: draft.title,
        description: draft.description.trim() || null,
        discount_label: draft.discount_label.trim() || null,
        starts_on: draft.starts_on || null,
        ends_on: draft.ends_on || null,
        is_active: draft.is_active,
        sort_order: Number.isFinite(draft.sort_order) ? draft.sort_order : 0,
      });
      if (result.ok) {
        toast.success(draft.id ? "Offer updated" : "Offer created");
        setOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  function remove(promo: Promotion) {
    if (!window.confirm(`Delete “${promo.title}”? This cannot be undone.`)) {
      return;
    }
    startTransition(async () => {
      const result = await deleteRow({ table: "promotions", id: promo.id });
      if (result.ok) {
        toast.success("Offer deleted");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xl text-sm text-muted-foreground">
          Active offers within their date range appear in the promotions strip
          near the top of the homepage. Sort order controls the display
          sequence (lowest first).
        </p>
        <Button
          type="button"
          onClick={openNew}
          className="rounded-full"
          size="sm"
        >
          New offer
        </Button>
      </div>

      {promotions.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No offers yet. Create your first one.
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2">
          {promotions.map((promo) => (
            <li
              key={promo.id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    {promo.discount_label ? (
                      <Badge className="bg-[var(--brass)] text-[var(--forest)] hover:bg-[var(--brass)]">
                        {promo.discount_label}
                      </Badge>
                    ) : null}
                    <Badge variant={promo.is_active ? "default" : "outline"}>
                      {promo.is_active ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <h3 className="mt-3 truncate font-serif text-lg tracking-tight">
                    {promo.title}
                  </h3>
                </div>
              </div>

              {promo.description ? (
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {promo.description}
                </p>
              ) : null}

              <div className="mt-auto flex items-center justify-between gap-3 border-t border-border/60 pt-4">
                <span className="text-xs text-muted-foreground">
                  {formatRange(promo)}
                </span>
                <div className="flex shrink-0 items-center gap-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full"
                    onClick={() => openEdit(promo)}
                  >
                    Edit
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="rounded-full text-destructive hover:text-destructive"
                    onClick={() => remove(promo)}
                    disabled={pending}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>{draft.id ? "Edit offer" : "New offer"}</DialogTitle>
            <DialogDescription>
              Offers only show on the homepage while active and within their
              date range. Leave dates blank for an always-on offer.
            </DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-4 overflow-y-auto px-1 py-1">
            <div className="grid gap-2">
              <Label htmlFor="promo-title">Title</Label>
              <Input
                id="promo-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
                placeholder="New patient consultation"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="promo-description">Description</Label>
              <Textarea
                id="promo-description"
                rows={3}
                value={draft.description}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, description: e.target.value }))
                }
                placeholder="A short line describing the offer for visitors."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="promo-discount">
                Discount label{" "}
                <span className="font-normal text-muted-foreground">
                  (shown as a badge)
                </span>
              </Label>
              <Input
                id="promo-discount"
                value={draft.discount_label}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, discount_label: e.target.value }))
                }
                placeholder="20% off"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="promo-starts">Starts on</Label>
                <Input
                  id="promo-starts"
                  type="date"
                  value={draft.starts_on}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, starts_on: e.target.value }))
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="promo-ends">Ends on</Label>
                <Input
                  id="promo-ends"
                  type="date"
                  value={draft.ends_on}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, ends_on: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="promo-sort">Sort order</Label>
              <Input
                id="promo-sort"
                type="number"
                value={draft.sort_order}
                onChange={(e) =>
                  setDraft((d) => ({
                    ...d,
                    sort_order: e.target.valueAsNumber,
                  }))
                }
                className="max-w-32"
              />
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={draft.is_active}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, is_active: e.target.checked }))
                }
                className="size-4 rounded border-border accent-[var(--brass)]"
              />
              Active (eligible to show on the homepage)
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
            <Button
              type="button"
              onClick={save}
              disabled={pending || draft.title.trim().length < 2}
            >
              {pending ? "Saving…" : "Save offer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
