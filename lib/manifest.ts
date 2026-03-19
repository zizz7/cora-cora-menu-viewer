import fs from "fs";
import path from "path";
import type { MenuManifest, ManifestPage } from "@/types/menu";

/**
 * Validate that a parsed object conforms to the ManifestPage shape.
 * Throws a descriptive error when a required field is missing or malformed.
 */
function validatePage(page: unknown, index: number): ManifestPage {
  const p = page as Record<string, unknown>;

  if (typeof p.pageNum !== "number" || p.pageNum < 1) {
    throw new Error(`pages[${index}]: pageNum must be a positive number`);
  }
  if (typeof p.width !== "number" || p.width <= 0) {
    throw new Error(`pages[${index}]: width must be a positive number`);
  }
  if (typeof p.height !== "number" || p.height <= 0) {
    throw new Error(`pages[${index}]: height must be a positive number`);
  }
  if (typeof p.lqip !== "string" || !p.lqip.startsWith("data:image/webp;base64,")) {
    throw new Error(`pages[${index}]: lqip must be a base64 webp data URI`);
  }
  if (typeof p.mobile !== "string" || !p.mobile.endsWith("-800w.webp")) {
    throw new Error(`pages[${index}]: mobile must end with -800w.webp`);
  }
  if (typeof p.desktop !== "string" || !p.desktop.endsWith("-1400w.webp")) {
    throw new Error(`pages[${index}]: desktop must end with -1400w.webp`);
  }

  return p as unknown as ManifestPage;
}

/**
 * Load and validate a menu manifest from disk.
 *
 * Reads `data/menus/{slug}/manifest.json` relative to the project root,
 * parses the JSON, and performs basic schema validation.
 *
 * Designed for server-side / RSC usage (uses `fs.readFileSync`).
 */
export function loadManifest(slug: string): MenuManifest {
  const manifestPath = path.join(process.cwd(), "data", "menus", slug, "manifest.json");

  let raw: string;
  try {
    raw = fs.readFileSync(manifestPath, "utf-8");
  } catch {
    throw new Error(`Manifest not found for menu "${slug}" at ${manifestPath}`);
  }

  const data = JSON.parse(raw) as Record<string, unknown>;

  if (typeof data.menuSlug !== "string") {
    throw new Error("Manifest missing or invalid menuSlug");
  }
  if (typeof data.pageCount !== "number" || data.pageCount < 0) {
    throw new Error("Manifest missing or invalid pageCount");
  }
  if (!Array.isArray(data.pages)) {
    throw new Error("Manifest missing pages array");
  }
  if (data.pages.length !== data.pageCount) {
    throw new Error(
      `Manifest pageCount (${data.pageCount}) does not match pages array length (${data.pages.length})`
    );
  }

  const pages = data.pages.map((p: unknown, i: number) => validatePage(p, i));

  return {
    menuSlug: data.menuSlug as string,
    pageCount: data.pageCount as number,
    pages,
  };
}
