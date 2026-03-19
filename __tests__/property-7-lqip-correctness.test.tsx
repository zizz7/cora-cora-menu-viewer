// Feature: cora-cora-menu-viewer, Property 7: LQIP correctness
// **Validates: Requirements 4.1, 4.4, 4.5**

import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import React from "react";

// Mock useLazyLoad
vi.mock("@/hooks/useLazyLoad", () => ({
  useLazyLoad: () => ({
    isNear: true,
    observerRef: { current: null },
  }),
}));

import MenuPage from "@/components/viewer/MenuPage";

describe("Property 7: LQIP correctness", () => {
  it("base64 data URI src, aria-hidden=true, empty alt", () => {
    fc.assert(
      fc.property(
        fc.base64String({ minLength: 4, maxLength: 40 }),
        fc.integer({ min: 1, max: 50 }),
        (b64, pageNum) => {
          const lqip = `data:image/webp;base64,${b64}`;

          const { container, unmount } = render(
            React.createElement(MenuPage, {
              pageNum,
              totalPages: 50,
              lqip,
              mobileUrl: "page-01-800w.webp",
              desktopUrl: "page-01-1400w.webp",
              aspectRatio: 0.707,
              isInWindow: true,
              priority: true,
              onVisible: () => {},
              onLoadError: () => {},
            })
          );

          // Find the LQIP img (the one with aria-hidden)
          const lqipImg = container.querySelector('img[aria-hidden="true"]');
          expect(lqipImg).toBeTruthy();

          // src is the base64 data URI
          expect(lqipImg!.getAttribute("src")).toBe(lqip);

          // aria-hidden is "true"
          expect(lqipImg!.getAttribute("aria-hidden")).toBe("true");

          // alt is empty
          expect(lqipImg!.getAttribute("alt")).toBe("");

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
