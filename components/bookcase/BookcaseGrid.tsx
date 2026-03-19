"use client";

import type { MenuMeta } from "@/types/menu";
import BookCard from "./BookCard";

interface BookcaseGridProps {
  menus: MenuMeta[];
  comingSoon?: MenuMeta[];
}

export default function BookcaseGrid({ menus, comingSoon = [] }: BookcaseGridProps) {
  return (
    <div className="shelf-section rounded-xl mx-auto max-w-3xl overflow-hidden">
      <div className="vignette-overlay z-10" />
      <div className="spotlight-effect z-10" />

      {/* Main shelf */}
      <div className="relative z-20 pt-10 pb-0">
        <div className="flex items-end justify-center gap-6 px-6 pb-0">
          {menus.map((menu) => (
            <BookCard key={menu.slug} menu={menu} />
          ))}
        </div>
        <div className="shelf-plank" />
      </div>

      {/* Coming Soon shelf */}
      {comingSoon.length > 0 && (
        <div className="relative z-20 pt-8 pb-0">
          <p className="text-center font-body text-xs text-white/30 mb-4 tracking-widest uppercase">
            Coming Soon
          </p>
          <div className="flex items-end justify-center gap-5 px-6 pb-0">
            {comingSoon.map((menu) => (
              <BookCard key={menu.slug} menu={menu} comingSoon />
            ))}
          </div>
          <div className="shelf-plank" />
        </div>
      )}

      {/* Bottom padding */}
      <div className="h-6" />
    </div>
  );
}
