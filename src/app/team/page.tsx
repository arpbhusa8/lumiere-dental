import { Reveal } from "@/components/motion/reveal";
import { TeamPortrait } from "@/components/site/team-portrait";
import {
  resolveTeam,
  clinicians,
  supportStaff,
  type ResolvedTeamMember,
} from "@/lib/team";

export const metadata = { title: "Our team" };

function LinkedinGlyph({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.73V1.73C24 .77 23.21 0 22.23 0z" />
    </svg>
  );
}

export default function TeamPage() {
  const team = resolveTeam();
  const docs = clinicians(team);
  const support = supportStaff(team);

  return (
    <div className="pt-36 pb-24">
      <section className="container-editorial">
        <Reveal>
          <div className="eyebrow mb-6">The team</div>
          <h1 className="display text-[clamp(2.5rem,7vw,6rem)] tracking-[-0.03em] max-w-4xl">
            Specialists who <span className="italic text-[var(--brass)]">teach the work</span>,
            and the people who make the day run.
          </h1>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Om Sai Dental Implant Center pairs specialist-led implant and periodontal
            care with a small, attentive support team — so every visit is clinically
            sound and personally handled.
          </p>
        </Reveal>
      </section>

      <section className="container-editorial mt-24 space-y-24">
        {docs.map((m, i) => (
          <ClinicianRow key={m.slug} member={m} flip={i % 2 === 1} priority={i === 0} />
        ))}
      </section>

      {support.length > 0 && (
        <section className="container-editorial mt-28">
          <Reveal>
            <div className="eyebrow mb-8 text-[var(--brass)]">Support team</div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl">
            {support.map((m) => (
              <SupportCard key={m.slug} member={m} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function ClinicianRow({
  member,
  flip,
  priority,
}: {
  member: ResolvedTeamMember;
  flip: boolean;
  priority: boolean;
}) {
  return (
    <article
      id={member.slug}
      className="grid md:grid-cols-12 gap-12 items-center scroll-mt-32"
    >
      <Reveal className={`md:col-span-5 ${flip ? "md:order-2" : ""}`}>
        <TeamPortrait
          name={member.name}
          photoUrl={member.photoUrl}
          sizes="(max-width: 768px) 100vw, 42vw"
          priority={priority}
        />
      </Reveal>
      <div className={`md:col-span-7 ${flip ? "md:order-1" : ""}`}>
        <Reveal delay={0.1}>
          <div className="eyebrow text-[var(--brass)] mb-4">{member.credentials}</div>
          <h2 className="display text-[clamp(2rem,4.5vw,4rem)]">{member.name}</h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {member.bio}
          </p>
        </Reveal>
        {member.linkedin && (
          <Reveal delay={0.3}>
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--brass)] transition-colors"
            >
              <LinkedinGlyph className="size-4" />
              Connect on LinkedIn
            </a>
          </Reveal>
        )}
      </div>
    </article>
  );
}

function SupportCard({ member }: { member: ResolvedTeamMember }) {
  return (
    <div id={member.slug} className="scroll-mt-32">
      <TeamPortrait name={member.name} photoUrl={member.photoUrl} />
      <div className="mt-5">
        <h3 className="font-serif text-xl tracking-tight">{member.name}</h3>
        <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
          {member.credentials}
        </p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-sm">
          {member.bio}
        </p>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-[var(--brass)] transition-colors"
          >
            <LinkedinGlyph className="size-4" />
            LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
