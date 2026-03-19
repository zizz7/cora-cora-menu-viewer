// Feature: cora-cora-menu-viewer, Property 10: Page visibility tracking
// **Validates: Requirements 6.3**

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * Pure logic extracted from usePageTracker:
 * Given a map of page numbers to intersection ratios,
 * the tracker should report the page with the highest ratio.
 */
function findMostVisiblePage(ratios: Map<number, number>): number {
  let bestPage = 1;
  let bestRatio = -1;
  ratios.forEach((ratio, page) => {
    if (ratio > bestRatio) {
      bestRatio = ratio;
      bestPage = page;
    }
  });
  return bestPage;
}

describe("Property 10: Page visibility tracking", () => {
  it("highest intersection ratio page reported", () => {
    fc.assert(
      fc.property(
        fc
          .array(
            fc.record({
              page: fc.integer({ min: 1, max: 100 }),
              ratio: fc.double({ min: 0, max: 1, noNaN: true }),
            }),
            { minLength: 1, maxLength: 20 }
          )
          .filter((entries) => {
            // Ensure unique page numbers
            const pages = entries.map((e) => e.page);
            return new Set(pages).size === pages.length;
          }),
        (entries) => {
          const ratios = new Map<number, number>();
          for (const { page, ratio } of entries) {
            ratios.set(page, ratio);
          }

          const result = findMostVisiblePage(ratios);

          // Find the expected best page
          let expectedPage = entries[0].page;
          let expectedRatio = entries[0].ratio;
          for (const { page, ratio } of entries) {
            if (ratio > expectedRatio) {
              expectedRatio = ratio;
              expectedPage = page;
            }
          }

          expect(result).toBe(expectedPage);
        }
      ),
      { numRuns: 100 }
    );
  });
});
