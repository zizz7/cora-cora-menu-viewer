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
    name: "Teien®",
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
        color: "#FFA168",
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
        color: "#F89ABA",
        restaurant: "teien",
      },
      {
        slug: "beverage",
        title: "Premium All Inclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#00C4B3",
        restaurant: "teien",
      },
      {
        slug: "beverage-exclusive",
        title: "Exclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage-exclusive/cover.webp",
        color: "#97CAEB",
        restaurant: "teien",
      },
    ],
  },
  {
    slug: "tazaa",
    name: "Tazäa®",
    tagline: "All Day Dining",
    logoUrl: "/logos/tazaa.png",
    menus: [
      {
        slug: "tazaa-lunch",
        title: "Lunch",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/tazaa-lunch/cover.webp",
        color: "#FFA168",
        restaurant: "tazaa",
        variants: [
          { lang: "eng", label: "EN", slug: "tazaa-lunch" },
          { lang: "chn", label: "中文", slug: "tazaa-lunch-chn" },
          { lang: "ger", label: "DE", slug: "tazaa-lunch-ger" },
          { lang: "jpn", label: "日本語", slug: "tazaa-lunch-jpn" },
          { lang: "rus", label: "РУ", slug: "tazaa-lunch-rus" },
        ],
      },
      {
        slug: "tazaa-dinner",
        title: "Dinner",
        subtitle: "Menu",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/tazaa-dinner/cover.webp",
        color: "#F89ABA",
        restaurant: "tazaa",
        variants: [
          { lang: "eng", label: "EN", slug: "tazaa-dinner" },
          { lang: "chn", label: "中文", slug: "tazaa-dinner-chn" },
          { lang: "ger", label: "DE", slug: "tazaa-dinner-ger" },
          { lang: "jpn", label: "日本語", slug: "tazaa-dinner-jpn" },
          { lang: "rus", label: "РУ", slug: "tazaa-dinner-rus" },
        ],
      },
      {
        slug: "beverage",
        title: "Premium All Inclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#00C4B3",
        restaurant: "tazaa",
      },
      {
        slug: "beverage-exclusive",
        title: "Exclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage-exclusive/cover.webp",
        color: "#97CAEB",
        restaurant: "tazaa",
      },
    ],
  },
  {
    slug: "acquapazza",
    name: "Acquapazza®",
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
        color: "#97CAEB",
        restaurant: "acquapazza",
        variants: [
          { lang: "eng", label: "EN", slug: "acquapazza-lunch-eng" },
          { lang: "chn", label: "中文", slug: "acquapazza-lunch-chn" },
          { lang: "ger", label: "DE", slug: "acquapazza-lunch-ger" },
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
        color: "#FFA168",
        restaurant: "acquapazza",
        variants: [
          { lang: "eng", label: "EN", slug: "acquapazza-dinner-eng" },
          { lang: "chn", label: "中文", slug: "acquapazza-dinner-chn" },
          { lang: "ger", label: "DE", slug: "acquapazza-dinner-ger" },
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
        color: "#F89ABA",
        restaurant: "acquapazza",
      },
      {
        slug: "beverage",
        title: "Premium All Inclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#00C4B3",
        restaurant: "acquapazza",
      },
      {
        slug: "beverage-exclusive",
        title: "Exclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage-exclusive/cover.webp",
        color: "#97CAEB",
        restaurant: "acquapazza",
      },
    ],
  },
  {
    slug: "my-coffee",
    name: "MYCOFFEE®",
    tagline: "Beverages & Snacks",
    logoUrl: "/logos/my-coffee.png",
    menus: [
      {
        slug: "mycoffee-menu",
        title: "Coffee",
        subtitle: "Menu",
        category: "Café",
        pageCount: 0,
        coverUrl: "/data/menus/mycoffee-menu/cover.webp",
        color: "#FFA168",
        restaurant: "my-coffee",
      },
    ],
  },
  {
    slug: "gingermoon",
    name: "Ginger Moon®",
    tagline: "Asian Cuisine",
    logoUrl: "/logos/gingermoon.png",
    menus: [
      {
        slug: "gingermoon-menu",
        title: "Menu",
        subtitle: "",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/gingermoon-menu-eng/cover.webp",
        color: "#F89ABA",
        restaurant: "gingermoon",
        variants: [
          { lang: "eng", label: "EN", slug: "gingermoon-menu-eng" },
          { lang: "chn", label: "中文", slug: "gingermoon-menu-chn" },
          { lang: "ger", label: "DE", slug: "gingermoon-menu-ger" },
          { lang: "jpn", label: "日本語", slug: "gingermoon-menu-jpn" },
          { lang: "rus", label: "РУ", slug: "gingermoon-menu-rus" },
        ],
      },
      {
        slug: "beverage",
        title: "Premium All Inclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage/cover.webp",
        color: "#00C4B3",
        restaurant: "gingermoon",
      },
      {
        slug: "beverage-exclusive",
        title: "Exclusive Beverage",
        subtitle: "Menu",
        category: "Beverages",
        pageCount: 0,
        coverUrl: "/data/menus/beverage-exclusive/cover.webp",
        color: "#97CAEB",
        restaurant: "gingermoon",
      },
    ],
  },
  {
    slug: "grab-and-go",
    name: "Grab & Go®",
    tagline: "Takeaway",
    logoUrl: "/logos/grab-and-go.png",
    menus: [
      {
        slug: "grabandgo-menu",
        title: "Menu",
        subtitle: "",
        category: "Dining",
        pageCount: 0,
        coverUrl: "/data/menus/grabandgo-menu/cover.webp",
        color: "#FFA168",
        restaurant: "grab-and-go",
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
