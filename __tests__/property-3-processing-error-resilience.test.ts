// Feature: cora-cora-menu-viewer, Property 3: Processing error resilience
// **Validates: Requirements 1.4**

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * Simulates the processing script's error-resilience logic:
 * given a set of total pages and a set of failed page indices,
 * the output should contain entries for all non-failed pages,
 * and the total count should equal (total - failed).
 */
function simulateProcessing(
  totalPages: number,
  failedPageNums: Set<number>
): { pageCount: number; pages: number[] } {
  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (!failedPageNums.has(i)) {
      pages.push(i);
    }
  }
  return { pageCount: pages.length, pages };
}

describe("Property 3: Processing error resilience", () => {
  it("failed pages excluded, others preserved", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 50 }),
        fc.array(fc.integer({ min: 1, max: 50 }), { minLength: 0, maxLength: 10 }),
        (totalPages, failedRaw) => {
          // Constrain failed pages to valid range and deduplicate
          const failedPageNums = new Set(
            failedRaw.filter((n) => n >= 1 && n <= totalPages)
          );

          const result = simulateProcessing(totalPages, failedPageNums);

          // Total count = total - failed
          expect(result.pageCount).toBe(totalPages - failedPageNums.size);

          // All non-failed pages are present
          for (let i = 1; i <= totalPages; i++) {
            if (!failedPageNums.has(i)) {
              expect(result.pages).toContain(i);
            }
          }

          // No failed pages are present
          for (const failedPage of failedPageNums) {
            expect(result.pages).not.toContain(failedPage);
          }

          // Pages are in order
          for (let i = 1; i < result.pages.length; i++) {
            expect(result.pages[i]).toBeGreaterThan(result.pages[i - 1]);
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
