"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/services", label: "Treatments" },
  { href: "/team", label: "Team" },
  { href: "/about", label: "Studio" },
  { href: "/contact", label: "Visit" },
];

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/85 backdrop-blur-md border-b border-border/60"
          : "bg-transparent"
      )}
    >
      <div className="container-editorial flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-serif text-xl tracking-tight">
          <span className="text-foreground">Lumière</span>
          <span className="hidden sm:inline text-muted-foreground/80 text-xs eyebrow self-end pb-1.5">
            Dental Studio
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm tracking-wide transition-colors relative",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-[var(--brass)]"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Sign in
          </Link>
          <Button asChild size="sm" className="rounded-full px-5 hidden sm:inline-flex">
            <Link href="/booking">Book consultation</Link>
          </Button>
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden p-2 -mr-2"
            aria-label="Toggle menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container-editorial py-6 flex flex-col gap-5">
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-serif text-2xl tracking-tight text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <Link href="/login" className="text-sm text-muted-foreground">Sign in</Link>
                <Button asChild className="rounded-full w-full">
                  <Link href="/booking">Book consultation</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
