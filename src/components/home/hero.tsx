"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { WordStagger } from "@/components/motion/word-stagger";
import { Button } from "@/components/ui/button";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <div className="container-editorial relative grid lg:grid-cols-12 gap-12 lg:gap-16 items-end">
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="eyebrow mb-8 flex items-center gap-4"
          >
            <span className="inline-block h-px w-12 bg-[var(--brass)]" />
            Dharan-2, Desi Line · By appointment
          </motion.div>

          <WordStagger
            as="h1"
            text="Dr. Ajit Yadav,"
            className="display text-[clamp(2.5rem,7.5vw,6.5rem)] tracking-[-0.035em] leading-[0.95]"
          />
          <WordStagger
            as="h1"
            text="Expert Implantologist in Dharan."
            delay={0.35}
            className="display text-[clamp(2.5rem,7.5vw,6.5rem)] tracking-[-0.035em] leading-[0.95] italic text-[var(--brass)]"
          />

          <motion.p
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.8 }}
            className="mt-10 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed"
          >
            Specialized dental implant and periodontal care led by a consultant
            periodontist and lecturer, offering personalized treatment plans and
            easy appointment booking.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 1.0 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <Button asChild size="lg" className="rounded-full h-12 px-7 text-sm tracking-wide">
              <Link href="tel:+97725538312">
                Book a consultation
                <ArrowRight className="ml-1 size-4" />
              </Link>
            </Button>
            <Link
              href="https://wa.me/9779852057909"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm tracking-wide underline-offset-8 underline decoration-[var(--brass)]/60 hover:decoration-foreground transition-colors"
            >
              <MessageCircle className="size-4" />
              WhatsApp Dr. Ajit
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-5 relative">
          <motion.div
            initial={{ clipPath: reduce ? "inset(0)" : "inset(0 0 0 100%)" }}
            animate={{ clipPath: "inset(0)" }}
            transition={{ duration: reduce ? 0 : 1.4, ease: EASE, delay: 0.3 }}
            className="aspect-[4/5] rounded-2xl overflow-hidden relative bg-[var(--forest)]"
          >
            {/* proof-gap: hero clinic/portrait photo */}
            <HeroIllustration />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.2 }}
            className="absolute -left-6 bottom-10 bg-card border border-border rounded-xl px-5 py-4 shadow-sm max-w-[240px] hidden md:block"
          >
            <div className="eyebrow text-[var(--brass)] mb-2">Specialist credentials</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              MDS, Periodontology. Consultant Periodontist &amp; Implantologist.
              Lecturer, Nobel Medical College.
            </p>
          </motion.div>
        </div>
      </div>

      <BackgroundOrnament />
    </section>
  );
}

function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Abstract botanical illustration"
    >
      <defs>
        <linearGradient id="hgrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.4 0.04 145)" />
          <stop offset="100%" stopColor="oklch(0.2 0.025 145)" />
        </linearGradient>
        <radialGradient id="hgrad2" cx="60%" cy="35%" r="55%">
          <stop offset="0%" stopColor="oklch(0.7 0.06 75 / 0.45)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="400" height="500" fill="url(#hgrad)" />
      <rect width="400" height="500" fill="url(#hgrad2)" />
      {/* Botanical strokes */}
      <g stroke="oklch(0.85 0.04 85 / 0.55)" strokeWidth="1.2" fill="none" strokeLinecap="round">
        <path d="M120 480 C 140 380, 130 290, 165 200 C 195 140, 210 90, 200 30" />
        <path d="M165 200 C 130 195, 100 180, 75 150" />
        <path d="M180 260 C 215 245, 240 220, 255 185" />
        <path d="M150 340 C 115 330, 90 305, 75 270" />
        <path d="M195 110 C 230 95, 250 70, 260 35" />
      </g>
      {/* Sun disc */}
      <circle cx="290" cy="120" r="56" fill="oklch(0.85 0.06 75 / 0.18)" />
      <circle cx="290" cy="120" r="32" fill="oklch(0.85 0.06 75 / 0.32)" />
    </svg>
  );
}

function BackgroundOrnament() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
      style={{
        backgroundImage:
          "radial-gradient(900px 500px at 80% -10%, oklch(0.78 0.05 75 / 0.25), transparent 65%), radial-gradient(700px 500px at -10% 80%, oklch(0.62 0.03 145 / 0.18), transparent 60%)",
      }}
    />
  );
}
