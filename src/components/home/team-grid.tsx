import Image from "next/image";
import Link from "next/link";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import type { Practitioner } from "@/lib/types";

const AJIT_PHOTO = "/team/dr-ajit-yadav.png";

const FALLBACK_AJIT = {
  id: "ajit-yadav",
  slug: "dr-ajit-yadav",
  name: "Dr. Ajit Yadav",
  credentials:
    "MDS · Consultant Periodontist & Implantologist · Lecturer, Nobel Medical College",
  photo_url: AJIT_PHOTO,
};

export function TeamGrid({ practitioners }: { practitioners: Practitioner[] }) {
  const ajit = practitioners.find((p) => p.slug === "dr-ajit-yadav");
  const display = ajit
    ? {
        id: ajit.id,
        slug: ajit.slug,
        name: ajit.name,
        credentials: ajit.credentials,
        photo_url: ajit.photo_url ?? AJIT_PHOTO,
      }
    : FALLBACK_AJIT;

  return (
    <section className="py-28 md:py-36">
      <div className="container-editorial">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-16">
          <Reveal>
            <div className="eyebrow mb-6">Meet the specialist</div>
            <h2 className="display text-[clamp(2.25rem,5vw,4.5rem)] max-w-2xl">
              Treatment led by a <span className="italic text-[var(--brass)]">consultant periodontist</span>.
            </h2>
          </Reveal>
        </div>

        <Stagger className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl">
          <StaggerItem key={display.id}>
            <Link href={`/team#${display.slug}`} className="group block">
              <PractitionerPortrait name={display.name} photoUrl={display.photo_url} />
              <div className="mt-5">
                <h3 className="font-serif text-xl tracking-tight">{display.name}</h3>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                  {display.credentials}
                </p>
              </div>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>
    </section>
  );
}

function PractitionerPortrait({
  name,
  photoUrl,
}: {
  name: string;
  photoUrl: string;
}) {
  return (
    <div className="aspect-[4/5] rounded-xl overflow-hidden relative bg-[var(--muted)] group-hover:bg-[var(--secondary)] transition-colors">
      <Image
        src={photoUrl}
        alt={`${name} portrait`}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[var(--forest)]/0 group-hover:bg-[var(--forest)]/10 transition-colors duration-500" />
    </div>
  );
}
