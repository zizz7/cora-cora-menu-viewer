import type { MenuMeta, Restaurant } from "@/types/menu";

/**
 * Restaurant & menu registry.
 *
 * Each restaurant has its own shelf page at /{restaurant.slug}.
 * Each menu can have multiple language variants — the viewer shows
 * a language picker when more than one variant exists.
 *
 * Menu slugs follow: {restaurant}-{menu}-{lang}
 * e.g. "teien-alacarte-eng", "teien-alacarte-chn"
 *
 * The `variants` array on MenuMeta groups translations of the same menu.
 */

export const RESTAURANTS: Restaurant[] = [
  {
    slug: "teien",
    name: "Teien",
    tagline: "Japanese Fine Dining",
    logoUrl: "/logos/teien.png",
    menus: [
      {
        slug: "teien-alacarte",
        title: "À La Carte",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/teien-alacarte-eng/cover.webp",
        color: "#8B0000",
        featured: true,
        restaurant: "teien",
        variants: [
          { lang: "eng", label: "EN", slug: "teien-alacarte-eng" },
          { lang: "chn", label: "中文", slug: "teien-alacarte-chn" },
          { lang: "ger", label: "DE", slug: "teien-alacarte-ger" },
          { lang: "jpn", label: "日本語", slug: "teien-alacarte-jpn" },
          { lang: "rus", label: "РУ", slug: "teien-alacarte-rus" },
        ],
      },
      {
        slug: "teien-teppanyaki",
        title: "Teppanyaki",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/teien-teppanyaki/cover.webp",
        color: "#C41E3A",
        restaurant: "teien",
      },
      {
        slug: "beverage",
        title: "Premium Beverage",
        subtitle: "All-Inclusive",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#1a1a2e",
        restaurant: "teien",
      },
    ],
  },
  {
    slug: "tazaa",
    name: "Tazaa",
    tagline: "International Buffet & À La Carte",
    logoUrl: "/logos/tazaa.png",
    menus: [
      {
        slug: "tazaa-breakfast",
        title: "Breakfast",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/tazaa-breakfast/cover.webp",
        color: "#E8A838",
        featured: true,
        restaurant: "tazaa",
      },
      {
        slug: "tazaa-lunch",
        title: "Lunch",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/tazaa-lunch/cover.webp",
        color: "#00C4B3",
        restaurant: "tazaa",
      },
      {
        slug: "tazaa-dinner",
        title: "Dinner",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/tazaa-dinner/cover.webp",
        color: "#1a1a2e",
        restaurant: "tazaa",
        variants: [
          { lang: "eng", label: "EN", slug: "tazaa-dinner" },
          { lang: "rus", label: "РУ", slug: "tazaa-dinner-rus" },
        ],
      },
      {
        slug: "beverage",
        title: "Premium Beverage",
        subtitle: "All-Inclusive",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#1a1a2e",
        restaurant: "tazaa",
      },
    ],
  },
  {
    slug: "acquapazza",
    name: "Acquapazza",
    tagline: "Italian Cuisine",
    logoUrl: "/logos/acquapazza.png",
    menus: [
      {
        slug: "acquapazza-lunch",
        title: "Lunch",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/acquapazza-lunch-eng/cover.webp",
        color: "#2E5090",
        featured: true,
        restaurant: "acquapazza",
        variants: [
          { lang: "eng", label: "EN", slug: "acquapazza-lunch-eng" },
          { lang: "chn", label: "中文", slug: "acquapazza-lunch-chn" },
          { lang: "jpn", label: "日本語", slug: "acquapazza-lunch-jpn" },
          { lang: "rus", label: "РУ", slug: "acquapazza-lunch-rus" },
        ],
      },
      {
        slug: "acquapazza-dinner",
        title: "Dinner",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/acquapazza-dinner-eng/cover.webp",
        color: "#1B4D3E",
        restaurant: "acquapazza",
        variants: [
          { lang: "eng", label: "EN", slug: "acquapazza-dinner-eng" },
          { lang: "chn", label: "中文", slug: "acquapazza-dinner-chn" },
          { lang: "jpn", label: "日本語", slug: "acquapazza-dinner-jpn" },
          { lang: "rus", label: "РУ", slug: "acquapazza-dinner-rus" },
        ],
      },
      {
        slug: "shisha-cigar",
        title: "Shisha & Cigar",
        subtitle: "Menu",
        category: "Lounge",
        pageCount: 0,
        coverUrl: "/data/menus/shisha-cigar/cover.webp",
        color: "#4A0E0E",
        restaurant: "acquapazza",
      },
      {
        slug: "beverage",
        title: "Premium Beverage",
        subtitle: "All-Inclusive",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#1a1a2e",
        restaurant: "acquapazza",
      },
    ],
  },
  {
    slug: "my-coffee",
    name: "My Coffee",
    tagline: "Coffee & Light Bites",
    logoUrl: "/logos/my-coffee.png",
    menus: [
      {
        slug: "mycoffee-menu",
        title: "Coffee Menu",
        subtitle: "",
        category: "Café",
        pageCount: 0,
        coverUrl: "/data/menus/mycoffee-menu/cover.webp",
        color: "#6F4E37",
        featured: true,
        restaurant: "my-coffee",
      },
    ],
  },
  {
    slug: "gingermoon",
    name: "Gingermoon",
    tagline: "Asian Fusion",
    logoUrl: "/logos/gingermoon.png",
    menus: [
      {
        slug: "gingermoon-menu",
        title: "Menu",
        subtitle: "",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/gingermoon-menu-eng/cover.webp",
        color: "#D4A853",
        featured: true,
        restaurant: "gingermoon",
        variants: [
          { lang: "eng", label: "EN", slug: "gingermoon-menu-eng" },
          { lang: "chn", label: "中文", slug: "gingermoon-menu-chn" },
          { lang: "jpn", label: "日本語", slug: "gingermoon-menu-jpn" },
          { lang: "rus", label: "РУ", slug: "gingermoon-menu-rus" },
        ],
      },
      {
        slug: "beverage",
        title: "Premium Beverage",
        subtitle: "All-Inclusive",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#1a1a2e",
        restaurant: "gingermoon",
      },
    ],
  },
];

/** Flat list of all menus across all restaurants (for backward compat) */
export const MENUS: MenuMeta[] = RESTAURANTS.flatMap((r) => r.menus);

/** Get a restaurant by slug */
export function getRestaurant(slug: string): Restaurant | undefined {
  return RESTAURANTS.find((r) => r.slug === slug);
}

/** Get all unique menu slugs that need processing (including variants) */
export function getAllMenuSlugs(): string[] {
  const slugs: string[] = [];
  for (const r of RESTAURANTS) {
    for (const m of r.menus) {
      if (m.variants && m.variants.length > 0) {
        for (const v of m.variants) {
          slugs.push(v.slug);
        }
      } else {
        slugs.push(m.slug);
      }
    }
  }
  return slugs;
}
