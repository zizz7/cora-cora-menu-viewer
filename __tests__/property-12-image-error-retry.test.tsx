// Feature: cora-cora-menu-viewer, Property 12: Image error retry button
// **Validates: Requirements 12.1**

import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render, fireEvent, screen } from "@testing-library/react";
import React from "react";

// Mock useLazyLoad to always return isNear=true
vi.mock("@/hooks/useLazyLoad", () => ({
  useLazyLoad: () => ({
    isNear: true,
    observerRef: { current: null },
  }),
}));

import MenuPage from "@/components/viewer/MenuPage";

describe("Property 12: Image load error shows retry button", () => {
  it("error triggers retry button display", () => {
    fc.assert(
      fc.property(fc.integer({ min: 1, max: 50 }), (pageNum) => {
        const { container, unmount } = render(
          React.createElement(MenuPage, {
            pageNum,
            totalPages: 50,
            lqip: "data:image/webp;base64,AAAA",
            mobileUrl: "page-01-800w.webp",
            desktopUrl: "page-01-1400w.webp",
            aspectRatio: 0.707,
            isInWindow: true,
            priority: true,
            onVisible: () => {},
            onLoadError: () => {},
          })
        );

        // Find the full-resolution img and trigger error
        const imgs = container.querySelectorAll("img");
        const fullImg = Array.from(imgs).find(
          (img) => img.getAttribute("srcset") !== null
        );
        expect(fullImg).toBeTruthy();

        fireEvent.error(fullImg!);

        // Retry button should now be visible
        const retryButton = screen.getByText("Retry");
        expect(retryButton).toBeTruthy();
        expect(retryButton.tagName).toBe("BUTTON");

        // LQIP should still be present
        const lqipImg = container.querySelector('img[aria-hidden="true"]');
        expect(lqipImg).toBeTruthy();

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
