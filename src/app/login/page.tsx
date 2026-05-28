import { LoginForm } from "@/components/auth/login-form";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-stretch">
      <aside className="hidden lg:flex lg:w-1/2 bg-[var(--forest)] text-[var(--ivory)] p-16 relative overflow-hidden flex-col justify-between">
        <Link href="/" className="font-serif text-2xl tracking-tight relative z-10">
          Om Sai Dental
        </Link>
        <div className="relative z-10">
          <Reveal>
            <h1 className="display text-[clamp(2.5rem,5vw,4.5rem)] leading-[1.02] max-w-md">
              Secure access to your <span className="italic text-[var(--brass)]">Om Sai patient portal</span>.
            </h1>
            <p className="mt-8 text-[var(--ivory)]/70 max-w-sm leading-relaxed">
              Sign in to review upcoming appointments, treatment notes and post-op instructions
              from Dr. Ajit.
            </p>
          </Reveal>
        </div>
        <div className="relative z-10 text-xs text-[var(--ivory)]/50">
          © {new Date().getFullYear()} Om Sai Dental Implant Center Pvt. Ltd.
        </div>
        <svg
          aria-hidden
          viewBox="0 0 400 600"
          className="absolute inset-0 w-full h-full opacity-30"
          preserveAspectRatio="xMidYMid slice"
        >
          <g stroke="oklch(0.85 0.04 85 / 0.4)" strokeWidth="0.8" fill="none">
            <path d="M0 540 C 60 460, 50 360, 80 280 C 115 200, 140 130, 130 50" />
            <path d="M200 580 C 180 470, 220 360, 200 260 C 175 180, 200 100, 240 50" />
            <path d="M340 580 C 330 470, 350 360, 335 250" />
            <circle cx="300" cy="160" r="80" fill="oklch(0.85 0.06 75 / 0.08)" stroke="none" />
            <circle cx="300" cy="160" r="38" fill="oklch(0.85 0.06 75 / 0.15)" stroke="none" />
          </g>
        </svg>
      </aside>

      <main className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden font-serif text-xl tracking-tight mb-8 block">
            Om Sai Dental
          </Link>
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-3">Sign in</div>
            <h2 className="display text-3xl md:text-4xl tracking-tight">Welcome back.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We&apos;ll send a secure magic link to your email.
            </p>
          </Reveal>
          <div className="mt-10">
            <LoginForm />
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            New to Om Sai Dental?{" "}
            <Link href="/signup" className="text-foreground underline-offset-4 underline decoration-[var(--brass)]/50">
              Register
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
