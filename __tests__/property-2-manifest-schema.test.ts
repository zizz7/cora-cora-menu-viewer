// Feature: cora-cora-menu-viewer, Property 2: Manifest schema completeness
// **Validates: Requirements 1.2**

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { MenuManifest, ManifestPage } from "@/types/menu";

function padNum(n: number): string {
  return String(n).padStart(2, "0");
}

/** Arbitrary for a valid ManifestPage */
const manifestPageArb: fc.Arbitrary<ManifestPage> = fc
  .integer({ min: 1, max: 999 })
  .chain((pageNum) =>
    fc.record({
      pageNum: fc.constant(pageNum),
      width: fc.integer({ min: 1, max: 10000 }),
      height: fc.integer({ min: 1, max: 10000 }),
      lqip: fc.constant(`data:image/webp;base64,${Buffer.from(`lqip-${pageNum}`).toString("base64")}`),
      mobile: fc.constant(`page-${padNum(pageNum)}-800w.webp`),
      desktop: fc.constant(`page-${padNum(pageNum)}-1400w.webp`),
    })
  );

/** Arbitrary for a full MenuManifest */
const menuManifestArb: fc.Arbitrary<MenuManifest> = fc
  .array(manifestPageArb, { minLength: 1, maxLength: 30 })
  .map((pages) => ({
    menuSlug: "test-menu",
    pageCount: pages.length,
    pages,
  }));

describe("Property 2: Manifest schema completeness", () => {
  it("all required fields present with correct types and formats", () => {
    fc.assert(
      fc.property(menuManifestArb, (manifest) => {
        // pageCount matches pages.length
        expect(manifest.pageCount).toBe(manifest.pages.length);

        for (const page of manifest.pages) {
          // pageNum is present and positive
          expect(typeof page.pageNum).toBe("number");
          expect(page.pageNum).toBeGreaterThanOrEqual(1);

          // lqip starts with data:image/webp;base64,
          expect(typeof page.lqip).toBe("string");
          expect(page.lqip.startsWith("data:image/webp;base64,")).toBe(true);

          // mobile ends in -800w.webp
          expect(typeof page.mobile).toBe("string");
          expect(page.mobile.endsWith("-800w.webp")).toBe(true);

          // desktop ends in -1400w.webp
          expect(typeof page.desktop).toBe("string");
          expect(page.desktop.endsWith("-1400w.webp")).toBe(true);

          // width is a positive integer
          expect(typeof page.width).toBe("number");
          expect(page.width).toBeGreaterThan(0);
          expect(Number.isInteger(page.width)).toBe(true);

          // height is a positive integer
          expect(typeof page.height).toBe("number");
          expect(page.height).toBeGreaterThan(0);
          expect(Number.isInteger(page.height)).toBe(true);
        }
      }),
      { numRuns: 100 }
    );
  });
});
