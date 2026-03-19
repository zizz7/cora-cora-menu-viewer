// Feature: cora-cora-menu-viewer, Property 6: First two pages eager load
// **Validates: Requirements 3.5**

import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import React from "react";

// Mock useLazyLoad to always return isNear=true
vi.mock("@/hooks/useLazyLoad", () => ({
  useLazyLoad: () => ({
    isNear: true,
    observerRef: { current: null },
  }),
}));

import MenuPage from "@/components/viewer/MenuPage";

describe("Property 6: First two pages eager load", () => {
  it("pages 1-2 have priority=true (eager), pages 3+ have priority=false (lazy)", () => {
    fc.assert(
      fc.property(
        fc.integer({ min: 2, max: 30 }),
        (totalPages) => {
          for (let pageNum = 1; pageNum <= Math.min(totalPages, 5); pageNum++) {
            const priority = pageNum <= 2;

            const { container, unmount } = render(
              React.createElement(MenuPage, {
                pageNum,
                totalPages,
                lqip: "data:image/webp;base64,AAAA",
                mobileUrl: `page-${pageNum}-800w.webp`,
                desktopUrl: `page-${pageNum}-1400w.webp`,
                aspectRatio: 0.707,
                isInWindow: true,
                priority,
                onVisible: () => {},
                onLoadError: () => {},
              })
            );

            // Find the full-resolution img
            const imgs = container.querySelectorAll("img");
            const fullImg = Array.from(imgs).find(
              (img) => img.getAttribute("srcset") !== null
            );

            expect(fullImg).toBeTruthy();

            if (pageNum <= 2) {
              expect(fullImg!.getAttribute("loading")).toBe("eager");
            } else {
              expect(fullImg!.getAttribute("loading")).toBe("lazy");
            }

            unmount();
          }
        }
      ),
      { numRuns: 100 }
    );
  });
});
