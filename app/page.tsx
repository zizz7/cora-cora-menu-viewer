import { MENUS, COMING_SOON } from "@/lib/menus";
import BookcaseGrid from "@/components/bookcase/BookcaseGrid";

export default function BookcasePage() {
  return (
    <main className="min-h-screen bg-surface">
      {/* Top App Bar */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-white/5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-rounded text-primary text-xl">menu_book</span>
            <span className="font-heading text-lg font-bold text-on-surface">
              Cora Cora Maldives
            </span>
          </div>
          <nav className="hidden sm:flex items-center gap-4">
            <span className="font-body text-xs font-semibold text-primary border-b-2 border-primary pb-0.5">
              Library
            </span>
            <span className="font-body text-xs text-on-surface-muted">Dining</span>
            <span className="font-body text-xs text-on-surface-muted">Wellness</span>
          </nav>
        </div>
      </header>

      {/* Category Tabs */}
      <section className="max-w-3xl mx-auto px-4 pt-4 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="font-body text-xs font-semibold px-3 py-1.5 rounded-full bg-primary text-surface whitespace-nowrap">
            All Menus
          </span>
          <span className="font-body text-xs px-3 py-1.5 rounded-full bg-surface-card text-on-surface-muted whitespace-nowrap">
            Beverages
          </span>
          <span className="font-body text-xs px-3 py-1.5 rounded-full bg-surface-card text-on-surface-muted whitespace-nowrap">
            Acquapazza
          </span>
          <span className="font-body text-xs px-3 py-1.5 rounded-full bg-surface-card text-on-surface-muted whitespace-nowrap">
            Shisha &amp; Cigars
          </span>
        </div>
      </section>

      {/* Bookshelf */}
      <section className="px-4 py-6">
        <BookcaseGrid menus={MENUS} comingSoon={COMING_SOON} />
      </section>

      {/* Info hint */}
      <section className="max-w-3xl mx-auto px-4 pb-6 text-center">
        <p className="font-body text-xs text-on-surface-muted flex items-center justify-center gap-1.5">
          <span className="material-symbols-rounded text-sm text-primary">touch_app</span>
          Tap a book to open the menu
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-6 text-center">
        <p className="font-body text-[11px] text-on-surface-muted">
          © 2025 Cora Cora Maldives. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
