import { Feather, LogOut } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { logout } from "@/app/actions/auth";
import { getCurrentUser } from "@/lib/session";

const navLink =
  "inline-flex min-h-11 items-center rounded-md px-3 text-sm font-bold text-primary transition-colors duration-200 hover:bg-muted";

async function UserNav() {
  const user = await getCurrentUser();
  if (!user) {
    return (
      <>
        <Link href="/login" className={navLink}>
          Sign in
        </Link>
        <Link
          href="/signup"
          className="inline-flex min-h-11 items-center rounded-md bg-accent px-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-accent-hover"
        >
          Create account
        </Link>
      </>
    );
  }
  return (
    <>
      <Link href="/dashboard" className={navLink}>
        History
      </Link>
      <form action={logout}>
        <button type="submit" className={navLink} title={`Signed in as ${user.email}`}>
          <LogOut aria-hidden className="mr-2 size-4" />
          Sign out
        </button>
      </form>
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="no-print border-b border-border bg-surface">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-4 gap-y-1 px-4 py-2 sm:px-6">
        <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-primary">
          <Feather aria-hidden className="size-6 text-accent" />
          <span className="font-serif text-2xl font-semibold tracking-tight">Quillcheck</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1">
          <Link href="/" className={navLink}>
            New scan
          </Link>
          <Suspense fallback={<span className="h-11 w-40" />}>
            <UserNav />
          </Suspense>
        </nav>
      </div>
    </header>
  );
}
