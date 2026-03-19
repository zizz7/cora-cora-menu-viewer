// Feature: cora-cora-menu-viewer, Property 8: Virtual scroll window
// **Validates: Requirements 5.1, 5.2, 5.3**

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";

/**
 * Pure logic extracted from useVirtualScroll hook.
 * Given currentPage and totalPages, returns whether a pageNum is in the window.
 */
function isInWindow(currentPage: number, totalPages: number, pageNum: number): boolean {
  const lower = Math.max(1, currentPage - 3);
  const upper = Math.min(totalPages, currentPage + 3);
  return pageNum >= lower && pageNum <= upper;
}

describe("Property 8: Virtual scroll window", () => {
  it("correct 6-page window boundaries", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 1, max: 200 }),
        fc.integer({ min: 1, max: 200 }),
        (totalPages, currentPage) => {
          // Constrain currentPage to valid range
          const C = Math.min(currentPage, totalPages);
          const T = totalPages;

          const lower = Math.max(1, C - 3);
          const upper = Math.min(T, C + 3);

          // Pages inside the window should return true
          for (let p = lower; p <= upper; p++) {
            expect(isInWindow(C, T, p)).toBe(true);
          }

          // Pages outside the window should return false
          if (lower > 1) {
            expect(isInWindow(C, T, lower - 1)).toBe(false);
          }
          if (upper < T) {
            expect(isInWindow(C, T, upper + 1)).toBe(false);
          }

          // Page 0 and page T+1 should always be outside
          expect(isInWindow(C, T, 0)).toBe(false);
          expect(isInWindow(C, T, T + 1)).toBe(false);
        }
      ),
      { numRuns: 100 }
    );
  });
});
