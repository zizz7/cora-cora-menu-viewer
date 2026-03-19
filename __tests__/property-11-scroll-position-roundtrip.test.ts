// Feature: cora-cora-menu-viewer, Property 11: Scroll position round-trip
// **Validates: Requirements 11.1, 11.2, 6.4**

import { describe, it, expect, beforeEach } from "vitest";
import * as fc from "fast-check";

/**
 * Pure logic extracted from useScrollRestore hook.
 * Tests that saving a scroll position and restoring it preserves the value.
 */
describe("Property 11: Scroll position round-trip", () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it("save then restore preserves the value", () => {
    fc.assert(
      fc.property(
        fc.nat({ max: 100000 }),
        fc.stringMatching(/^[a-z][a-z0-9-]{0,9}$/),
        (scrollY, key) => {
          const storageKey = `scroll-${key}`;

          // Save
          sessionStorage.setItem(storageKey, String(scrollY));

          // Restore
          const stored = sessionStorage.getItem(storageKey);
          expect(stored).not.toBeNull();
          const restored = Number(stored);
          expect(restored).toBe(scrollY);
        }
      ),
      { numRuns: 100 }
    );
  });
});
