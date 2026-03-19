import { MENUS } from "@/lib/menus";
import BookcaseGrid from "@/components/bookcase/BookcaseGrid";

export default function BookcasePage() {
  return (
    <main className="min-h-screen">
      <header className="px-4 pt-10 pb-4 text-center">
        <h1 className="font-heading text-3xl font-bold text-cream">
          Cora Cora Maldives
        </h1>
        <p className="mt-1 font-body text-sm text-cream-muted">
          Select a menu to browse
        </p>
      </header>
      <BookcaseGrid menus={MENUS} />
    </main>
  );
}
