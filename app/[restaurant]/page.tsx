import { notFound } from "next/navigation";
import { RESTAURANTS, getRestaurant } from "@/lib/menus";
import BookcaseGrid from "@/components/bookcase/BookcaseGrid";

interface RestaurantPageProps {
  params: Promise<{ restaurant: string }>;
}

export default async function RestaurantPage({ params }: RestaurantPageProps) {
  const { restaurant: slug } = await params;
  const restaurant = getRestaurant(slug);

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-surface">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-black/5">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={restaurant.logoUrl}
            alt={restaurant.name}
            className="h-8 w-auto object-contain"
          />
          <div>
            <h1 className="font-heading text-lg font-bold text-on-surface leading-tight">
              {restaurant.name}
            </h1>
            <p className="font-body text-[11px] text-on-surface-muted leading-tight">
              Cora Cora Maldives
            </p>
          </div>
        </div>
      </header>

      {/* Tagline */}
      {restaurant.tagline && (
        <section className="max-w-3xl mx-auto px-4 pt-4 pb-1">
          <p className="font-body text-xs text-on-surface-muted tracking-wide">
            {restaurant.tagline}
          </p>
        </section>
      )}

      {/* Bookshelf */}
      <section className="px-4 py-6">
        <BookcaseGrid menus={restaurant.menus} restaurantSlug={restaurant.slug} logoUrl={restaurant.logoUrl} />
      </section>

      {/* Info hint */}
      <section className="max-w-3xl mx-auto px-4 pb-6 text-center">
        <p className="font-body text-xs text-on-surface-muted flex items-center justify-center gap-1.5">
          <span className="material-symbols-rounded text-sm text-primary">touch_app</span>
          Tap a book to open the menu
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/5 py-6 text-center">
        <p className="font-body text-[11px] text-on-surface-muted">
          © 2025 Cora Cora Maldives. All rights reserved.
        </p>
      </footer>
    </main>
  );
}

export function generateStaticParams() {
  return RESTAURANTS.map((r) => ({ restaurant: r.slug }));
}
