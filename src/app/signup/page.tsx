import { LoginForm } from "@/components/auth/login-form";
import { Reveal } from "@/components/motion/reveal";
import Link from "next/link";

export const metadata = { title: "Register" };

export default function SignupPage() {
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
              Register to book consultations with Dr. Ajit, view your records and receive post-op
              instructions in one place.
            </p>
          </Reveal>
        </div>
        <div className="relative z-10 text-xs text-[var(--ivory)]/50">
          © {new Date().getFullYear()} Om Sai Dental Implant Center Pvt. Ltd.
        </div>
      </aside>

      <main className="flex-1 flex items-center justify-center p-8 lg:p-16">
        <div className="w-full max-w-md">
          <Link href="/" className="lg:hidden font-serif text-xl tracking-tight mb-8 block">
            Om Sai Dental
          </Link>
          <Reveal>
            <div className="eyebrow text-[var(--brass)] mb-3">Register</div>
            <h2 className="display text-3xl md:text-4xl tracking-tight">Create your file.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              We&apos;ll send a secure link — no password required.
            </p>
          </Reveal>
          <div className="mt-10">
            <LoginForm mode="signup" />
          </div>
          <p className="mt-10 text-sm text-muted-foreground">
            Already registered?{" "}
            <Link href="/login" className="text-foreground underline-offset-4 underline decoration-[var(--brass)]/50">
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
