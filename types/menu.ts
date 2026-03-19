/**
 * Shared types for the Cora Cora Menu Viewer.
 *
 * These interfaces define the data structures used across the
 * manifest loading layer, bookcase, and viewer components.
 */

/** A single page entry within a menu manifest. */
export interface ManifestPage {
  pageNum: number;
  width: number;
  height: number;
  /** Base-64 data URI (e.g. "data:image/webp;base64,…") */
  lqip: string;
  /** Filename for the 800 px-wide mobile variant (e.g. "page-01-800w.webp") */
  mobile: string;
  /** Filename for the 1400 px-wide desktop variant (e.g. "page-01-1400w.webp") */
  desktop: string;
}

/** Top-level manifest describing every page of a single menu. */
export interface MenuManifest {
  menuSlug: string;
  pageCount: number;
  pages: ManifestPage[];
}

/** Lightweight metadata shown on the Bookcase landing page. */
export interface MenuMeta {
  slug: string;
  title: string;
  category: string;
  pageCount: number;
  /** Path to the cover image (e.g. "/data/menus/beverage/cover.webp") */
  coverUrl: string;
}
