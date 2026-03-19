import type { MenuMeta } from "@/types/menu";

/**
 * Static menu registry for Phase 1.
 *
 * In Phase 2 this will be replaced by a database query.
 * For now each menu is hardcoded after running the processing script.
 */
export const MENUS: MenuMeta[] = [
  {
    slug: "beverage",
    title: "Premium Beverage Menu",
    category: "Beverage",
    pageCount: 23,
    coverUrl: "/data/menus/beverage/cover.webp",
  },
];
