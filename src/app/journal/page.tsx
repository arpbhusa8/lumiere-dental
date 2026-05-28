import Link from "next/link";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { POSTS } from "./posts";

export const metadata: Metadata = {
  title: "Journal · Om Sai Dental",
  description:
    "Long-form notes on dental implants, gum care and transparent pricing — written by Dr. Ajit Yadav, MDS, Consultant Periodontist in Dharan.",
  openGraph: {
    title: "Journal — Om Sai Dental",
    description:
      "Long-form notes on dental implants, gum care and transparent pricing from a consultant periodontist in Dharan.",
    type: "website",
  },
};

const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "UTC",
  day: "numeric",
  month: "long",
  year: "numeric",
});

export default function JournalIndexPage() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">Journal</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6.5rem)] tracking-[-0.03em] max-w-4xl">
            Notes from a{" "}
            <span className="italic text-[var(--brass)]">consultant&apos;s</span>{" "}
            chair.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Long-form guides on dental implants, gum care and what an
            honest estimate looks like. Written by Dr. Ajit Yadav, MDS —
            Consultant Periodontist and Implantologist — and reviewed
            before publication.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24 border-t border-border/60">
        <ul className="divide-y divide-border/60">
          {posts.map((post, i) => (
            <li key={post.slug}>
              <Reveal delay={i * 0.06}>
                <Link
                  href={`/journal/${post.slug}`}
                  className="grid grid-cols-12 gap-6 py-10 group"
                >
                  <div className="col-span-12 md:col-span-2">
                    <div className="eyebrow text-[var(--brass)]">
                      {post.pillar.label}
                    </div>
                    <div className="mt-3 text-sm text-muted-foreground">
                      <time dateTime={post.date}>
                        {DATE_FMT.format(new Date(post.date))}
                      </time>
                    </div>
                  </div>
                  <div className="col-span-12 md:col-span-8">
                    <h2 className="font-serif text-2xl md:text-[1.875rem] leading-[1.15] tracking-tight group-hover:text-[var(--brass)] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed max-w-2xl">
                      {post.dek}
                    </p>
                  </div>
                  <div className="col-span-12 md:col-span-2 self-end md:self-center text-right">
                    <span className="eyebrow underline-offset-4 underline decoration-[var(--brass)]/40 group-hover:decoration-foreground">
                      Read
                    </span>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {post.readMinutes} min
                    </div>
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-editorial mt-28">
        <div className="rounded-3xl bg-[var(--forest)] text-[var(--ivory)] p-12 md:p-20">
          <Reveal>
            <div className="eyebrow text-[var(--ivory)]/60 mb-6">
              Ask in person
            </div>
            <h2 className="display text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.05] max-w-3xl">
              The clearest answers come from{" "}
              <span className="italic">a proper assessment</span>.
            </h2>
            <p className="mt-6 text-[var(--ivory)]/75 max-w-xl">
              Reading is a good start. A consult is where we look at your
              radiographs, examine the tissue, and write you a plan you
              can hold.
            </p>
            <div className="mt-10">
              <Link
                href="/booking"
                className="inline-flex h-12 items-center rounded-full bg-[var(--ivory)] text-[var(--forest)] hover:bg-[var(--brass)] hover:text-[var(--ivory)] transition-colors px-7 text-sm"
              >
                Book a consultation
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
