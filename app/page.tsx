import Link from "next/link";
import { RESTAURANTS } from "@/lib/menus";

/**
 * Root page — simple directory of restaurants.
 * In production, users arrive via QR codes directly at /{restaurant}.
 * This page exists as a fallback / dev index.
 */
export default function IndexPage() {
  return (
    <main className="min-h-screen bg-surface flex flex-col items-center justify-center px-4">
      <span className="material-symbols-rounded text-primary text-4xl mb-3">menu_book</span>
      <h1 className="font-heading text-2xl font-bold text-on-surface mb-1">
        Cora Cora Maldives
      </h1>
      <p className="font-body text-sm text-on-surface-muted mb-8">
        Digital Menu Collection
      </p>
      <div className="grid gap-3 w-full max-w-sm">
        {RESTAURANTS.map((r) => (
          <Link
            key={r.slug}
            href={`/${r.slug}`}
            className="flex items-center gap-3 bg-surface-card rounded-xl px-4 py-3 transition-colors hover:bg-surface-elevated border border-black/5"
          >
            <span className="material-symbols-rounded text-primary">restaurant</span>
            <div>
              <p className="font-heading text-sm font-semibold text-on-surface">
                {r.name}
              </p>
              <p className="font-body text-[11px] text-on-surface-muted">
                {r.tagline}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <footer className="mt-12 text-center">
        <p className="font-body text-[11px] text-on-surface-muted">
          © 2025 Cora Cora Maldives
        </p>
      </footer>
    </main>
  );
}
