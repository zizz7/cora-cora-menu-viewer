// Feature: cora-cora-menu-viewer, Property 1: Manifest round-trip serialization
// **Validates: Requirements 1.5**

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import type { MenuManifest, ManifestPage } from "@/types/menu";

function padNum(n: number): string {
  return String(n).padStart(2, "0");
}

/** Arbitrary for a single ManifestPage */
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

describe("Property 1: Manifest round-trip serialization", () => {
  it("serializing to JSON and parsing back produces a deeply equal object", () => {
    fc.assert(
      fc.property(menuManifestArb, (manifest) => {
        const json = JSON.stringify(manifest);
        const parsed = JSON.parse(json) as MenuManifest;
        expect(parsed).toEqual(manifest);
      }),
      { numRuns: 100 }
    );
  });
});
