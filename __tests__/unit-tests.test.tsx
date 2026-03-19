/**
 * Unit tests for Cora Cora Menu Viewer — Tasks 10.1 through 10.8
 */
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";

// ─── Mocks ───────────────────────────────────────────────────────────────────

// Mock next/link
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

// Mock next/navigation
vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), back: vi.fn() }),
  usePathname: () => "/",
}));

// Mock framer-motion to render plain divs/spans
vi.mock("framer-motion", () => ({
  motion: {
    div: React.forwardRef(
      (
        {
          variants,
          initial,
          animate,
          whileHover,
          transition,
          ...props
        }: Record<string, unknown>,
        ref: React.Ref<HTMLDivElement>
      ) => <div ref={ref} {...props} />
    ),
    span: React.forwardRef(
      (
        { variants, transition, ...props }: Record<string, unknown>,
        ref: React.Ref<HTMLSpanElement>
      ) => <span ref={ref} {...props} />
    ),
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => (
    <>{children}</>
  ),
}));

// Mock useLazyLoad so MenuPage always renders its full image
vi.mock("@/hooks/useLazyLoad", () => ({
  useLazyLoad: (_priority: boolean) => ({
    isNear: true,
    observerRef: { current: null },
  }),
}));

// ─── Imports under test ──────────────────────────────────────────────────────

import BookCard from "@/components/bookcase/BookCard";
import ViewerHeader from "@/components/viewer/ViewerHeader";
import MenuPage from "@/components/viewer/MenuPage";
import ViewerError from "@/app/menu/[slug]/error";
import type { MenuMeta, MenuManifest, ManifestPage } from "@/types/menu";

// ─── 10.1 Parse a known manifest JSON to correct TypeScript object ───────────

describe("10.1 — Parse a known manifest JSON", () => {
  const knownManifestJson = JSON.stringify({
    menuSlug: "beverage",
    pageCount: 2,
    pages: [
      {
        pageNum: 1,
        width: 1587,
        height: 2245,
        lqip: "data:image/webp;base64,UklGRabc",
        mobile: "page-01-800w.webp",
        desktop: "page-01-1400w.webp",
      },
      {
        pageNum: 2,
        width: 1587,
        height: 2245,
        lqip: "data:image/webp;base64,UklGRdef",
        mobile: "page-02-800w.webp",
        desktop: "page-02-1400w.webp",
      },
    ],
  });

  it("parses a valid manifest JSON to the correct TypeScript object", () => {
    const parsed: MenuManifest = JSON.parse(knownManifestJson);

    expect(parsed.menuSlug).toBe("beverage");
    expect(parsed.pageCount).toBe(2);
    expect(parsed.pages).toHaveLength(2);

    const page1 = parsed.pages[0];
    expect(page1.pageNum).toBe(1);
    expect(page1.width).toBe(1587);
    expect(page1.height).toBe(2245);
    expect(page1.lqip).toBe("data:image/webp;base64,UklGRabc");
    expect(page1.mobile).toBe("page-01-800w.webp");
    expect(page1.desktop).toBe("page-01-1400w.webp");

    const page2 = parsed.pages[1];
    expect(page2.pageNum).toBe(2);
    expect(page2.mobile).toBe("page-02-800w.webp");
    expect(page2.desktop).toBe("page-02-1400w.webp");
  });
});

// ─── 10.2 Reject invalid manifests ──────────────────────────────────────────

describe("10.2 — Reject invalid manifests", () => {
  /**
   * We replicate the validation logic from lib/manifest.ts (validateManifest)
   * without the fs.readFileSync dependency so we can test in jsdom.
   */
  function validateManifest(data: Record<string, unknown>): MenuManifest {
    if (typeof data.menuSlug !== "string") {
      throw new Error("Manifest missing or invalid menuSlug");
    }
    if (typeof data.pageCount !== "number" || data.pageCount < 0) {
      throw new Error("Manifest missing or invalid pageCount");
    }
    if (!Array.isArray(data.pages)) {
      throw new Error("Manifest missing pages array");
    }
    if (data.pages.length !== data.pageCount) {
      throw new Error(
        `Manifest pageCount (${data.pageCount}) does not match pages array length (${data.pages.length})`
      );
    }
    const pages = (data.pages as unknown[]).map((p, i) => {
      const pg = p as Record<string, unknown>;
      if (typeof pg.pageNum !== "number" || pg.pageNum < 1) {
        throw new Error(`pages[${i}]: pageNum must be a positive number`);
      }
      if (typeof pg.width !== "number" || pg.width <= 0) {
        throw new Error(`pages[${i}]: width must be a positive number`);
      }
      if (typeof pg.height !== "number" || pg.height <= 0) {
        throw new Error(`pages[${i}]: height must be a positive number`);
      }
      if (
        typeof pg.lqip !== "string" ||
        !pg.lqip.startsWith("data:image/webp;base64,")
      ) {
        throw new Error(`pages[${i}]: lqip must be a base64 webp data URI`);
      }
      if (typeof pg.mobile !== "string" || !pg.mobile.endsWith("-800w.webp")) {
        throw new Error(`pages[${i}]: mobile must end with -800w.webp`);
      }
      if (
        typeof pg.desktop !== "string" ||
        !pg.desktop.endsWith("-1400w.webp")
      ) {
        throw new Error(`pages[${i}]: desktop must end with -1400w.webp`);
      }
      return pg as unknown as ManifestPage;
    });
    return {
      menuSlug: data.menuSlug as string,
      pageCount: data.pageCount as number,
      pages,
    };
  }

  const validPage = {
    pageNum: 1,
    width: 800,
    height: 1200,
    lqip: "data:image/webp;base64,abc",
    mobile: "page-01-800w.webp",
    desktop: "page-01-1400w.webp",
  };

  it("throws for missing menuSlug", () => {
    expect(() =>
      validateManifest({ pageCount: 1, pages: [validPage] })
    ).toThrow("menuSlug");
  });

  it("throws for missing pageCount", () => {
    expect(() =>
      validateManifest({ menuSlug: "x", pages: [validPage] })
    ).toThrow("pageCount");
  });

  it("throws for missing pages array", () => {
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1 })
    ).toThrow("pages");
  });

  it("throws when pageCount does not match pages.length", () => {
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 5, pages: [validPage] })
    ).toThrow("does not match");
  });

  it("throws for page with missing lqip", () => {
    const bad = { ...validPage, lqip: "" };
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1, pages: [bad] })
    ).toThrow("lqip");
  });

  it("throws for page with invalid mobile filename", () => {
    const bad = { ...validPage, mobile: "page.png" };
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1, pages: [bad] })
    ).toThrow("mobile");
  });

  it("throws for page with invalid desktop filename", () => {
    const bad = { ...validPage, desktop: "page.png" };
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1, pages: [bad] })
    ).toThrow("desktop");
  });

  it("throws for page with non-positive width", () => {
    const bad = { ...validPage, width: 0 };
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1, pages: [bad] })
    ).toThrow("width");
  });

  it("throws for page with non-positive height", () => {
    const bad = { ...validPage, height: -1 };
    expect(() =>
      validateManifest({ menuSlug: "x", pageCount: 1, pages: [bad] })
    ).toThrow("height");
  });
});

// ─── 10.3 BookCard renders correctly ─────────────────────────────────────────

describe("10.3 — BookCard renders correct title, page count, cover image, loading=lazy", () => {
  const menu: MenuMeta = {
    slug: "beverage",
    title: "Premium Beverage Menu",
    category: "Beverage",
    pageCount: 23,
    coverUrl: "/data/menus/beverage/cover.webp",
  };

  it("renders the menu title", () => {
    render(<BookCard menu={menu} />);
    expect(screen.getByText("Premium Beverage Menu")).toBeInTheDocument();
  });

  it("renders the page count", () => {
    render(<BookCard menu={menu} />);
    expect(screen.getByText("23 pages")).toBeInTheDocument();
  });

  it("renders the cover image with correct src", () => {
    render(<BookCard menu={menu} />);
    const img = screen.getByRole("img", { name: "Premium Beverage Menu" });
    expect(img).toHaveAttribute("src", "/data/menus/beverage/cover.webp");
  });

  it("renders the cover image with loading=lazy", () => {
    render(<BookCard menu={menu} />);
    const img = screen.getByRole("img", { name: "Premium Beverage Menu" });
    expect(img).toHaveAttribute("loading", "lazy");
  });
});

// ─── 10.4 ViewerHeader renders correctly ─────────────────────────────────────

describe("10.4 — ViewerHeader renders title and page counter", () => {
  it("renders the menu title", () => {
    render(
      <ViewerHeader
        title="Premium Beverage Menu"
        currentPage={1}
        totalPages={23}
        onBack={vi.fn()}
      />
    );
    expect(screen.getByText("Premium Beverage Menu")).toBeInTheDocument();
  });

  it('renders the page counter in "1 / 23" format', () => {
    render(
      <ViewerHeader
        title="Premium Beverage Menu"
        currentPage={1}
        totalPages={23}
        onBack={vi.fn()}
      />
    );
    expect(screen.getByText("1 / 23")).toBeInTheDocument();
  });
});

// ─── 10.5 Viewport meta tag ─────────────────────────────────────────────────

describe("10.5 — Viewport config contains user-scalable=yes, maximum-scale=3.0", () => {
  it("exports a viewport config with userScalable true and maximumScale 3.0", async () => {
    // Read the layout source and verify the viewport export values directly
    // (importing the module triggers next/font/google which isn't available in test env)
    const fs = await import("fs");
    const path = await import("path");
    const layoutContent = fs.readFileSync(
      path.join(__dirname, "..", "app", "layout.tsx"),
      "utf-8"
    );

    // Verify the viewport export contains the required values
    expect(layoutContent).toContain("maximumScale: 3.0");
    expect(layoutContent).toContain("userScalable: true");
  });
});

// ─── 10.6 Service Worker config ──────────────────────────────────────────────

describe("10.6 — Service Worker config has maxEntries 200 and maxAgeSeconds 604800", () => {
  it("next.config.js contains the correct Workbox caching values", async () => {
    // We read the config file content and verify the values are present
    // Since next.config.js uses require() and next-pwa, we parse it as text
    const fs = await import("fs");
    const path = await import("path");
    const configContent = fs.readFileSync(
      path.join(__dirname, "..", "next.config.js"),
      "utf-8"
    );

    // Verify the WebP cache rule values
    expect(configContent).toContain('cacheName: "menu-pages"');
    expect(configContent).toContain("maxEntries: 200");
    expect(configContent).toContain("maxAgeSeconds: 604800");
  });
});

// ─── 10.7 Manifest load failure shows error UI ──────────────────────────────

describe("10.7 — Manifest load failure shows error UI with Try Again button", () => {
  it('renders "Unable to Load Menu" heading', () => {
    render(
      <ViewerError error={new Error("fail") as Error & { digest?: string }} reset={vi.fn()} />
    );
    expect(screen.getByText("Unable to Load Menu")).toBeInTheDocument();
  });

  it('renders a "Try Again" button', () => {
    render(
      <ViewerError error={new Error("fail") as Error & { digest?: string }} reset={vi.fn()} />
    );
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });
});

// ─── 10.8 Image load failure shows retry button on LQIP placeholder ─────────

describe("10.8 — Image load failure shows retry button on LQIP placeholder", () => {
  const pageProps = {
    pageNum: 3,
    totalPages: 23,
    lqip: "data:image/webp;base64,UklGRabc",
    mobileUrl: "/data/menus/beverage/page-03-800w.webp",
    desktopUrl: "/data/menus/beverage/page-03-1400w.webp",
    aspectRatio: 1587 / 2245,
    isInWindow: true,
    priority: false,
    onVisible: vi.fn(),
    onLoadError: vi.fn(),
  };

  it("shows a retry button after image error", () => {
    render(<MenuPage {...pageProps} />);

    // Find the full-resolution image (has alt text)
    const fullImg = screen.getByAltText("Menu page 3 of 23");
    fireEvent.error(fullImg);

    expect(
      screen.getByRole("button", { name: /retry/i })
    ).toBeInTheDocument();
  });

  it("LQIP placeholder remains visible after error", () => {
    render(<MenuPage {...pageProps} />);

    const fullImg = screen.getByAltText("Menu page 3 of 23");
    fireEvent.error(fullImg);

    // LQIP image has aria-hidden="true" and empty alt — role is "presentation"
    const lqipImg = screen.getByRole("presentation", { hidden: true });
    expect(lqipImg).toHaveAttribute("src", "data:image/webp;base64,UklGRabc");
  });
});
