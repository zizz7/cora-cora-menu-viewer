// Feature: cora-cora-menu-viewer, Property 9: Page counter format
// **Validates: Requirements 6.1**

import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render, screen } from "@testing-library/react";
import React from "react";

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn() }),
}));

import ViewerHeader from "@/components/viewer/ViewerHeader";

describe("Property 9: Page counter format", () => {
  it('"X / Y" format with correct values', () => {
    fc.assert(
      fc.property(
        fc.string({ minLength: 1, maxLength: 30 }).filter((s) => s.trim().length > 0),
        fc.integer({ min: 1, max: 500 }),
        fc.integer({ min: 1, max: 500 }),
        (title, currentPage, totalPages) => {
          // Ensure currentPage <= totalPages
          const cp = Math.min(currentPage, totalPages);
          const tp = Math.max(currentPage, totalPages);

          const { unmount } = render(
            React.createElement(ViewerHeader, {
              title,
              currentPage: cp,
              totalPages: tp,
              onBack: () => {},
            })
          );

          const expected = `${cp} / ${tp}`;
          expect(screen.getByText(expected)).toBeTruthy();

          unmount();
        }
      ),
      { numRuns: 100 }
    );
  });
});
