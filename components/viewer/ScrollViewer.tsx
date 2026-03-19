"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import type { MenuManifest } from "@/types/menu";
import ViewerHeader from "./ViewerHeader";
import MenuPage from "./MenuPage";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSwipeDownClose } from "@/hooks/useSwipeDownClose";

export interface ScrollViewerProps {
  manifest: MenuManifest;
  menuTitle: string;
  cdnBaseUrl: string;
}

export default function ScrollViewer({
  manifest,
  menuTitle,
  cdnBaseUrl,
}: ScrollViewerProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPage = usePageTracker(containerRef);
  const isInWindow = useVirtualScroll(currentPage, manifest.pageCount);

  const handleBack = useCallback(() => {
    router.push("/");
  }, [router]);

  // 7.3 — Push history state on mount so browser back returns to bookcase
  useEffect(() => {
    window.history.pushState({ viewer: true }, "");

    const handlePopState = () => {
      router.push("/");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router]);

  // 7.4 — Swipe-down-to-close on touch devices
  useSwipeDownClose(handleBack);

  const handleVisible = useCallback((_pageNum: number) => {
    // Page visibility is now tracked by usePageTracker via IntersectionObserver
  }, []);

  const handleLoadError = useCallback((pageNum: number) => {
    console.error(`Failed to load page ${pageNum}`);
  }, []);

  const baseUrl = `${cdnBaseUrl}/menus/${manifest.menuSlug}`;

  return (
    <div className="min-h-screen bg-forest">
      <ViewerHeader
        title={menuTitle}
        currentPage={currentPage}
        totalPages={manifest.pageCount}
        onBack={handleBack}
      />

      <main className="mx-auto" style={{ maxWidth: "900px" }}>
        <div ref={containerRef} className="flex flex-col" style={{ gap: "2px" }}>
          {manifest.pages.map((page) => (
            <MenuPage
              key={page.pageNum}
              pageNum={page.pageNum}
              totalPages={manifest.pageCount}
              lqip={page.lqip}
              mobileUrl={`${baseUrl}/${page.mobile}`}
              desktopUrl={`${baseUrl}/${page.desktop}`}
              aspectRatio={page.width / page.height}
              isInWindow={isInWindow(page.pageNum)}
              priority={page.pageNum <= 2}
              onVisible={handleVisible}
              onLoadError={handleLoadError}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
