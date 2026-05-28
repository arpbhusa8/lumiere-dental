import Link from "next/link";

function Instagram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
    </svg>
  );
}

function Facebook({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
    </svg>
  );
}

function LinkedIn({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7" />
      <path d="M8 7v.01" />
      <path d="M12 17v-4a2 2 0 014 0v4" />
      <path d="M12 10v7" />
    </svg>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 mt-32 bg-background">
      <div className="container-editorial py-20">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-serif text-3xl tracking-tight">Om Sai Dental</div>
            <p className="mt-4 max-w-sm text-sm text-muted-foreground leading-relaxed">
              Specialist implant and periodontal care in Dharan, led by Dr. Ajit Yadav, MDS —
              Consultant Periodontist and Implantologist.
            </p>
            <div className="mt-8 flex gap-5 text-muted-foreground">
              <a aria-label="Instagram" href="#" className="hover:text-foreground transition-colors">
                <Instagram className="size-4" />
              </a>
              <a aria-label="Facebook" href="#" className="hover:text-foreground transition-colors">
                <Facebook className="size-4" />
              </a>
              <a aria-label="LinkedIn" href="#" className="hover:text-foreground transition-colors">
                <LinkedIn className="size-4" />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="eyebrow mb-4">Clinic</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/services" className="hover:text-foreground text-muted-foreground transition-colors">Treatments</Link></li>
              <li><Link href="/team" className="hover:text-foreground text-muted-foreground transition-colors">Team</Link></li>
              <li><Link href="/about" className="hover:text-foreground text-muted-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="hover:text-foreground text-muted-foreground transition-colors">Visit</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Patient</div>
            <ul className="space-y-3 text-sm">
              <li><Link href="/booking" className="hover:text-foreground text-muted-foreground transition-colors">Book</Link></li>
              <li><Link href="/login" className="hover:text-foreground text-muted-foreground transition-colors">Sign in</Link></li>
              <li><Link href="/signup" className="hover:text-foreground text-muted-foreground transition-colors">Register</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="eyebrow mb-4">Reach</div>
            <address className="not-italic text-sm text-muted-foreground space-y-1.5 leading-relaxed">
              <div>Dharan-2, Desi Line</div>
              <div>Sunsari, Nepal</div>
              <div className="pt-2"><a href="tel:+97725538312" className="hover:text-foreground transition-colors">025-538312</a></div>
              <div><a href="https://wa.me/9779852057909" className="hover:text-foreground transition-colors">WhatsApp 9852057909</a></div>
              {/* proof-gap: email */}
              <div><a href="mailto:info@omsaidental.com" className="hover:text-foreground transition-colors">info@omsaidental.com</a></div>
            </address>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border/60 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Om Sai Dental Implant Center Pvt. Ltd. · Dharan-2, Desi Line, Sunsari</div>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Complaints</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
