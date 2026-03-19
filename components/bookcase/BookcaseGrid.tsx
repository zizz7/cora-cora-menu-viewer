import type { MenuMeta } from "@/types/menu";
import BookCard from "./BookCard";

interface BookcaseGridProps {
  menus: MenuMeta[];
}

export default function BookcaseGrid({ menus }: BookcaseGridProps) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-8 grid grid-cols-2 gap-4 md:gap-8 md:grid-cols-[repeat(auto-fill,minmax(160px,1fr))]">
      {menus.map((menu) => (
        <BookCard key={menu.slug} menu={menu} />
      ))}
    </div>
  );
}
