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
    title: "Premium Beverage",
    subtitle: "All-Inclusive",
    category: "Beverages",
    pageCount: 23,
    coverUrl: "/data/menus/beverage/cover.webp",
    color: "#1a1a2e",
    featured: true,
  },
];

/** Placeholder books for the "Coming Soon" shelf */
export const COMING_SOON: MenuMeta[] = [
  {
    slug: "acquapazza-lunch",
    title: "Acquapazza",
    subtitle: "Lunch",
    category: "Acquapazza",
    pageCount: 0,
    coverUrl: "",
    color: "#00C4B3",
  },
  {
    slug: "acquapazza-dinner",
    title: "Acquapazza",
    subtitle: "Dinner",
    category: "Acquapazza",
    pageCount: 0,
    coverUrl: "",
    color: "#FFA16B",
  },
  {
    slug: "shisha-cigar",
    title: "Shisha & Cigar",
    subtitle: "Lounge",
    category: "Shisha & Cigars",
    pageCount: 0,
    coverUrl: "",
    color: "#F89ABA",
  },
];
