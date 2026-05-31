import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { createClient } from "@/lib/supabase/server";
import type { JournalPost } from "@/lib/types";
import { POSTS, POSTS_BY_SLUG, AUTHOR, LAST_REVIEWED } from "../posts";
import { BODIES } from "../bodies";

type Props = {
  params: Promise<{ slug: string }>;
};

// Pre-render the hand-written pillar articles. DB-backed posts have unknown
// slugs at build time, so we allow dynamic params: unknown slugs are rendered
// on demand and resolved against the journal_posts table below.
export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

async function getDbPost(slug: string): Promise<JournalPost | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return (data as JournalPost | null) ?? null;
}

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];
  if (!post) {
    const dbPost = await getDbPost(slug);
    if (!dbPost) return {};
    const dbTitle = `${dbPost.title} · Om Sai Dental`;
    return {
      title: dbTitle,
      description: dbPost.excerpt ?? undefined,
      openGraph: {
        title: dbTitle,
        description: dbPost.excerpt ?? undefined,
        type: "article",
        publishedTime: dbPost.published_at ?? undefined,
        authors: dbPost.author ? [dbPost.author] : undefined,
        images: dbPost.cover_image ? [dbPost.cover_image] : undefined,
      },
      twitter: {
        card: "summary_large_image",
        title: dbTitle,
        description: dbPost.excerpt ?? undefined,
      },
    };
  }

  const title = `${post.title} · Om Sai Dental`;
  return {
    title,
    description: post.description,
    keywords: [
      post.keyword,
      "Dharan",
      "Om Sai Dental",
      "Dr. Ajit Yadav",
      post.pillar.label,
    ],
    openGraph: {
      title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [AUTHOR.name],
      tags: [post.keyword, post.pillar.label],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
    },
  };
}

export default async function JournalPostPage({ params }: Props) {
  const { slug } = await params;
  const post = POSTS_BY_SLUG[slug];

  // Unknown slug → try a published DB post before 404.
  if (!post) {
    const dbPost = await getDbPost(slug);
    if (!dbPost) notFound();
    return <DbJournalPost post={dbPost} />;
  }

  const Body = BODIES[post.bodyId];
  const related = POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <article className="pt-36 pb-24">
      <header className="container-editorial">
        <Reveal>
          <div className="eyebrow text-[var(--brass)] mb-6">
            {post.pillar.label}
          </div>
          <h1 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] tracking-[-0.025em] leading-[1.05] max-w-4xl">
            {post.title}
          </h1>
        </Reveal>
        <Reveal delay={0.08}>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
            {post.dek}
          </p>
        </Reveal>
        <Reveal delay={0.14}>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs eyebrow text-muted-foreground">
            <div>
              <span className="text-foreground">{AUTHOR.name}</span>{" "}
              <span className="ml-2 normal-case tracking-normal text-muted-foreground/80">
                {AUTHOR.role}
              </span>
            </div>
            <time dateTime={post.date}>
              {DATE_FMT.format(new Date(post.date))}
            </time>
            <span>{post.readMinutes} min read</span>
          </div>
        </Reveal>
      </header>

      <div className="container-editorial mt-16">
        <div className="grid md:grid-cols-12 gap-12">
          <aside className="md:col-span-3 hidden md:block">
            <div className="sticky top-32">
              <div className="eyebrow mb-4">Filed under</div>
              <Link
                href={post.pillar.href}
                className="block font-serif text-xl tracking-tight hover:text-[var(--brass)] transition-colors"
              >
                {post.pillar.label}
              </Link>
              <div className="mt-8 eyebrow mb-3">Also see</div>
              <Link
                href={post.cross.href}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {post.cross.label}
              </Link>
              <div className="mt-10 text-xs text-muted-foreground/80">
                Last reviewed: {LAST_REVIEWED}
              </div>
            </div>
          </aside>

          <div className="md:col-span-9 max-w-2xl">
            <Body />

            <div className="md:hidden mt-16 text-xs text-muted-foreground/80">
              Last reviewed: {LAST_REVIEWED}
            </div>
          </div>
        </div>
      </div>

      <section className="container-editorial mt-28">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20">
          <Reveal>
            <div className="eyebrow text-[var(--ivory)]/60 mb-6">
              Next step
            </div>
            <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-3xl">
              Have a question this article raised?{" "}
              <span className="italic">Bring it to a consult</span>.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-xl">
              A structured assessment with Dr. Ajit Yadav, MDS — radiographs,
              periodontal chart, and a written plan you can take home.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-colors px-7 text-sm"
              >
                Book a consultation
              </Link>
              <Link
                href={post.pillar.href}
                className="inline-flex h-12 items-center rounded-full border border-[var(--ivory)]/30 text-[var(--ivory)] hover:bg-[var(--ivory)]/10 transition-colors px-7 text-sm"
              >
                More on {post.pillar.label.toLowerCase()}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-editorial mt-24">
        <div className="eyebrow mb-8">Keep reading</div>
        <ul className="grid md:grid-cols-2 gap-8 border-t border-border/60 pt-10">
          {related.map((r, i) => (
            <li key={r.slug}>
              <Reveal delay={i * 0.08}>
                <Link
                  href={`/journal/${r.slug}`}
                  className="group block"
                >
                  <div className="eyebrow text-[var(--brass)] mb-3">
                    {r.pillar.label}
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl leading-tight group-hover:text-[var(--brass)] transition-colors">
                    {r.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                    {r.dek}
                  </p>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}

// Editor-published DB post. Reuses the editorial article layout; body renders
// as whitespace-preserving plain text (no MDX) to stay safe with arbitrary input.
function DbJournalPost({ post }: { post: JournalPost }) {
  return (
    <article className="pt-36 pb-24">
      <header className="container-editorial">
        <Reveal>
          <div className="eyebrow text-[var(--brass)] mb-6">Journal</div>
          <h1 className="display text-[clamp(2.25rem,5.5vw,4.5rem)] tracking-[-0.025em] leading-[1.05] max-w-4xl">
            {post.title}
          </h1>
        </Reveal>
        {post.excerpt && (
          <Reveal delay={0.08}>
            <p className="mt-8 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              {post.excerpt}
            </p>
          </Reveal>
        )}
        {(post.author || post.published_at) && (
          <Reveal delay={0.14}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-2 text-xs eyebrow text-muted-foreground">
              {post.author && (
                <div>
                  <span className="text-foreground">{post.author}</span>
                </div>
              )}
              {post.published_at && (
                <time dateTime={post.published_at}>
                  {DATE_FMT.format(new Date(post.published_at))}
                </time>
              )}
            </div>
          </Reveal>
        )}
      </header>

      <div className="container-editorial mt-16">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-9 md:col-start-4 max-w-2xl">
            <div className="whitespace-pre-wrap text-[1.0625rem] md:text-lg leading-[1.75] text-foreground/85">
              {post.body}
            </div>
          </div>
        </div>
      </div>

      <section className="container-editorial mt-28">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20">
          <Reveal>
            <div className="eyebrow text-[var(--ivory)]/60 mb-6">Next step</div>
            <h2 className="display text-[clamp(2rem,4.5vw,3.5rem)] leading-[1.05] max-w-3xl">
              Have a question this article raised?{" "}
              <span className="italic">Bring it to a consult</span>.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-xl">
              A structured assessment with Dr. Ajit Yadav, MDS — radiographs,
              periodontal chart, and a written plan you can take home.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-colors px-7 text-sm"
              >
                Book a consultation
              </Link>
              <Link
                href="/journal"
                className="inline-flex h-12 items-center rounded-full border border-[var(--ivory)]/30 text-[var(--ivory)] hover:bg-[var(--ivory)]/10 transition-colors px-7 text-sm"
              >
                Back to journal
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </article>
  );
}
