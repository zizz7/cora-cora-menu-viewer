// Feature: cora-cora-menu-viewer, Property 4: Bookcase renders all menus
// **Validates: Requirements 2.1**

import { describe, it, expect, vi } from "vitest";
import * as fc from "fast-check";
import { render } from "@testing-library/react";
import React from "react";
import type { MenuMeta } from "@/types/menu";

// Mock next/link to render a plain anchor
vi.mock("next/link", () => ({
  default: ({ children, href }: { children: React.ReactNode; href: string }) =>
    React.createElement("a", { href }, children),
}));

// Mock framer-motion to render plain divs
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(
      (props: Record<string, unknown>, ref: React.Ref<HTMLDivElement>) => {
        const {
          initial: _i, whileHover: _w, animate: _a, variants: _v,
          transition: _t, ...rest
        } = props;
        return React.createElement("div", { ...rest, ref });
      }
    ),
  },
}));

import BookcaseGrid from "@/components/bookcase/BookcaseGrid";


function makeMenu(index: number, pageCount: number): MenuMeta {
  return {
    slug: `menu-${index}`,
    title: `Menu Title ${index}`,
    category: "Beverage",
    pageCount,
    coverUrl: "/data/menus/test/cover.webp",
  };
}

const menuArb = fc.integer({ min: 1, max: 100 });

const menusArb: fc.Arbitrary<MenuMeta[]> = fc.oneof(
  menuArb.map((pc) => [makeMenu(0, pc)]),
  fc.tuple(menuArb, menuArb).map(([a, b]) => [makeMenu(0, a), makeMenu(1, b)]),
  fc.tuple(menuArb, menuArb, menuArb).map(([a, b, c]) => [makeMenu(0, a), makeMenu(1, b), makeMenu(2, c)]),
  fc.tuple(menuArb, menuArb, menuArb, menuArb).map(([a, b, c, d]) => [makeMenu(0, a), makeMenu(1, b), makeMenu(2, c), makeMenu(3, d)]),
  fc.tuple(menuArb, menuArb, menuArb, menuArb, menuArb).map(([a, b, c, d, e]) => [makeMenu(0, a), makeMenu(1, b), makeMenu(2, c), makeMenu(3, d), makeMenu(4, e)]),
);

describe("Property 4: Bookcase renders all menus", () => {
  it("one BookCard per MenuMeta with correct title and pageCount", () => {
    fc.assert(
      fc.property(menusArb, (menus) => {
        const { container, unmount } = render(
          React.createElement(BookcaseGrid, { menus })
        );

        const links = container.querySelectorAll("a");
        expect(links.length).toBe(menus.length);

        for (const menu of menus) {
          const h3s = container.querySelectorAll("h3");
          const titleEl = Array.from(h3s).find(
            (el) => el.textContent === menu.title
          );
          expect(titleEl).toBeTruthy();

          const ps = container.querySelectorAll("p");
          const pageCountEl = Array.from(ps).find(
            (el) => el.textContent?.trim() === `${menu.pageCount} pages`
          );
          expect(pageCountEl).toBeTruthy();
        }

        unmount();
      }),
      { numRuns: 100 }
    );
  });
});
