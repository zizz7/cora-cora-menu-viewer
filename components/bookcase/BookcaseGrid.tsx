"use client";

import type { MenuMeta } from "@/types/menu";
import BookCard from "./BookCard";

interface BookcaseGridProps {
  menus: MenuMeta[];
  restaurantSlug: string;
  logoUrl?: string;
}

export default function BookcaseGrid({ menus, restaurantSlug, logoUrl }: BookcaseGridProps) {
  return (
    <div className="shelf-section rounded-xl mx-auto max-w-3xl overflow-hidden">
      <div className="vignette-overlay z-10" />
      <div className="spotlight-effect z-10" />

      {/* Main shelf */}
      <div className="relative z-20 pt-10 pb-0">
        <div className="flex items-end justify-center gap-6 px-6 pb-0 flex-wrap">
          {menus.map((menu) => (
            <BookCard
              key={menu.slug}
              menu={menu}
              href={`/${restaurantSlug}/${menu.slug}`}
              logoUrl={menu.logoUrl || logoUrl}
            />
          ))}
        </div>
        <div className="shelf-plank" />
      </div>

      {/* Bottom padding */}
      <div className="h-6" />
    </div>
  );
}
