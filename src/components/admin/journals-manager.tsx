"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { toast } from "sonner";

import type { JournalPost } from "@/lib/types";
import { saveJournalPost, deleteRow } from "@/app/admin/content-actions";
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
  slug: string;
  excerpt: string;
  body: string;
  cover_image: string;
  author: string;
  is_published: boolean;
};

const EMPTY: EditState = {
  title: "",
  slug: "",
  excerpt: "",
  body: "",
  cover_image: "",
  author: "",
  is_published: false,
};

function toEditState(post: JournalPost): EditState {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug ?? "",
    excerpt: post.excerpt ?? "",
    body: post.body ?? "",
    cover_image: post.cover_image ?? "",
    author: post.author ?? "",
    is_published: post.is_published,
  };
}

export function JournalsManager({ posts }: { posts: JournalPost[] }) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<EditState>(EMPTY);
  const [pending, startTransition] = useTransition();

  function openNew() {
    setDraft(EMPTY);
    setOpen(true);
  }

  function openEdit(post: JournalPost) {
    setDraft(toEditState(post));
    setOpen(true);
  }

  function save() {
    startTransition(async () => {
      const result = await saveJournalPost({
        id: draft.id,
        title: draft.title,
        slug: draft.slug.trim() || undefined,
        excerpt: draft.excerpt.trim() || null,
        body: draft.body,
        cover_image: draft.cover_image.trim() || null,
        author: draft.author.trim() || null,
        is_published: draft.is_published,
      });
      if (result.ok) {
        toast.success(draft.id ? "Post updated" : "Post created");
        setOpen(false);
      } else {
        toast.error(result.error);
      }
    });
  }

  function remove(post: JournalPost) {
    if (
      !window.confirm(
        `Delete “${post.title}”? This cannot be undone.`,
      )
    )
      return;
    startTransition(async () => {
      const result = await deleteRow({ table: "journal_posts", id: post.id });
      if (result.ok) {
        toast.success("Post deleted");
      } else {
        toast.error(result.error);
      }
    });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Posts marked published appear under “Latest posts” on the public
          journal. The hand-written pillar articles are separate and always
          live.
        </p>
        <Button
          type="button"
          onClick={openNew}
          className="rounded-full"
          size="sm"
        >
          New post
        </Button>
      </div>

      {posts.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
          No posts yet. Create your first one.
        </p>
      ) : (
        <ul className="divide-y divide-border/60 rounded-xl border border-border">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex flex-wrap items-center justify-between gap-4 p-5"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h3 className="truncate font-serif text-lg tracking-tight">
                    {post.title}
                  </h3>
                  <Badge
                    variant={post.is_published ? "default" : "outline"}
                  >
                    {post.is_published ? "Published" : "Draft"}
                  </Badge>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  <span className="font-mono">/journal/{post.slug}</span>
                  <span aria-hidden="true"> · </span>
                  {format(new Date(post.created_at), "d MMM yyyy")}
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full"
                  onClick={() => openEdit(post)}
                >
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="rounded-full text-destructive hover:text-destructive"
                  onClick={() => remove(post)}
                  disabled={pending}
                >
                  Delete
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {draft.id ? "Edit post" : "New post"}
            </DialogTitle>
            <DialogDescription>
              Body accepts plain text or markdown; it renders as formatted
              paragraphs on the public page.
            </DialogDescription>
          </DialogHeader>

          <div className="grid max-h-[60vh] gap-4 overflow-y-auto px-1 py-1">
            <div className="grid gap-2">
              <Label htmlFor="jp-title">Title</Label>
              <Input
                id="jp-title"
                value={draft.title}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, title: e.target.value }))
                }
                placeholder="How to care for your implant"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jp-slug">
                Slug{" "}
                <span className="font-normal text-muted-foreground">
                  (optional — generated from title)
                </span>
              </Label>
              <Input
                id="jp-slug"
                value={draft.slug}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, slug: e.target.value }))
                }
                placeholder="implant-aftercare"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jp-excerpt">Excerpt</Label>
              <Textarea
                id="jp-excerpt"
                rows={2}
                value={draft.excerpt}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, excerpt: e.target.value }))
                }
                placeholder="A short summary shown in the listing."
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jp-body">Body</Label>
              <Textarea
                id="jp-body"
                rows={10}
                value={draft.body}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, body: e.target.value }))
                }
                placeholder="Write the full article here. Plain text or markdown."
                className="font-mono text-sm"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jp-cover">Cover image URL</Label>
              <Input
                id="jp-cover"
                value={draft.cover_image}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, cover_image: e.target.value }))
                }
                placeholder="https://…"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="jp-author">Author</Label>
              <Input
                id="jp-author"
                value={draft.author}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, author: e.target.value }))
                }
                placeholder="Dr. Ajit Yadav, MDS"
              />
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={draft.is_published}
                onChange={(e) =>
                  setDraft((d) => ({ ...d, is_published: e.target.checked }))
                }
                className="size-4 rounded border-border accent-[var(--brass)]"
              />
              Published (visible on the public journal)
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
              {pending ? "Saving…" : "Save post"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
