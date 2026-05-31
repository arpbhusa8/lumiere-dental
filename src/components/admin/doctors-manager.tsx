"use client";

import { useState, useTransition } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import type { Practitioner } from "@/lib/types";
import { saveDoctor, deleteRow } from "@/app/admin/content-actions";
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

// The practitioners table carries is_active (gates the booking roster), but the
// shared Practitioner type omits it — extend locally so the form can edit it.
type Doctor = Practitioner & { is_active?: boolean };

type FormState = {
  id?: string;
  name: string;
  credentials: string;
  bio: string;
  photo_url: string;
  sort_order: number;
  is_active: boolean;
};

function toForm(doctor?: Doctor): FormState {
  return {
    id: doctor?.id,
    name: doctor?.name ?? "",
    credentials: doctor?.credentials ?? "",
    bio: doctor?.bio ?? "",
    photo_url: doctor?.photo_url ?? "",
    sort_order: doctor?.sort_order ?? 0,
    is_active: doctor?.is_active ?? true,
  };
}

export function DoctorsManager({ doctors }: { doctors: Doctor[] }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(() => toForm());
  const [pending, startTransition] = useTransition();

  function openAdd() {
    setForm(toForm());
    setOpen(true);
  }

  function openEdit(doctor: Doctor) {
    setForm(toForm(doctor));
    setOpen(true);
  }

  function handleSave() {
    startTransition(async () => {
      const result = await saveDoctor({
        id: form.id,
        name: form.name,
        credentials: form.credentials,
        bio: form.bio,
        photo_url: form.photo_url,
        sort_order: form.sort_order,
        is_active: form.is_active,
      });
      if (result.ok) {
        toast.success(form.id ? "Doctor updated" : "Doctor added");
        setOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  function handleDelete(doctor: Doctor) {
    if (!confirm(`Delete ${doctor.name}? This cannot be undone.`)) return;
    startTransition(async () => {
      const result = await deleteRow({ table: "practitioners", id: doctor.id });
      if (result.ok) toast.success("Doctor deleted");
      else toast.error(result.error);
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          Doctors added here appear in the booking flow&rsquo;s practitioner list.
        </p>
        <Button type="button" onClick={openAdd} className="rounded-full">
          <Plus aria-hidden="true" />
          Add doctor
        </Button>
      </div>

      {doctors.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No doctors yet. Add one to make it bookable.
        </div>
      ) : (
        <ul className="space-y-4">
          {doctors.map((doctor) => (
            <li key={doctor.id}>
              <article className="rounded-xl border border-border bg-card p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl tracking-tight">
                      {doctor.name}
                      {doctor.is_active === false && (
                        <span className="ml-2 align-middle text-xs font-normal uppercase tracking-widest text-muted-foreground">
                          Hidden
                        </span>
                      )}
                    </h3>
                    <p className="mt-0.5 text-sm text-[var(--brass)]">
                      {doctor.credentials}
                    </p>
                    {doctor.bio && (
                      <p className="mt-3 line-clamp-2 max-w-prose text-sm text-muted-foreground">
                        {doctor.bio}
                      </p>
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-1">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="rounded-full"
                      onClick={() => openEdit(doctor)}
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
                      onClick={() => handleDelete(doctor)}
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
              {form.id ? "Edit doctor" : "Add doctor"}
            </DialogTitle>
            <DialogDescription>
              Details shown on the site and in the booking flow.
            </DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            className="space-y-4"
          >
            <Field label="Name" htmlFor="doctor-name">
              <Input
                id="doctor-name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                placeholder="Dr. Ajit Yadav"
                required
                minLength={2}
                maxLength={120}
              />
            </Field>

            <Field label="Credentials" htmlFor="doctor-credentials">
              <Input
                id="doctor-credentials"
                value={form.credentials}
                onChange={(e) =>
                  setForm((f) => ({ ...f, credentials: e.target.value }))
                }
                placeholder="MDS, Oral & Maxillofacial"
                required
                minLength={2}
                maxLength={200}
              />
            </Field>

            <Field label="Bio" htmlFor="doctor-bio">
              <Textarea
                id="doctor-bio"
                value={form.bio}
                onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
                placeholder="Short professional summary."
                rows={4}
                maxLength={2000}
              />
            </Field>

            <Field label="Photo URL" htmlFor="doctor-photo">
              <Input
                id="doctor-photo"
                type="url"
                value={form.photo_url}
                onChange={(e) =>
                  setForm((f) => ({ ...f, photo_url: e.target.value }))
                }
                placeholder="https://…"
                maxLength={500}
              />
            </Field>

            <div className="flex items-end gap-4">
              <Field label="Sort order" htmlFor="doctor-sort" className="w-32">
                <Input
                  id="doctor-sort"
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
                <span>Bookable (active)</span>
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
                {pending ? "Saving…" : "Save doctor"}
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
