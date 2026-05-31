import Link from "next/link";
import { Button } from "@/components/ui/button";
import { requireAdmin } from "@/lib/auth";

export const metadata = { title: "Admin" };

// Server-side gate: non-admins are redirected before any admin page renders.
// (Postgres RLS + is_admin() remain the real authority on every query.)
export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="pt-28 pb-24">
      <div className="container-editorial">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6">
          <div>
            <div className="eyebrow text-[var(--brass)] mb-2">Om Sai Dental · Admin</div>
            <h1 className="font-serif text-3xl tracking-tight">Practice dashboard</h1>
          </div>
          <nav className="flex items-center gap-1">
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/admin">Bookings</Link>
            </Button>
            <Button asChild variant="ghost" size="sm" className="rounded-full">
              <Link href="/admin/feedback">Feedback</Link>
            </Button>
            <form action="/auth/signout" method="post">
              <Button type="submit" variant="ghost" size="sm" className="rounded-full text-muted-foreground">
                Sign out
              </Button>
            </form>
          </nav>
        </header>
        <main className="mt-10">{children}</main>
      </div>
    </div>
  );
}
