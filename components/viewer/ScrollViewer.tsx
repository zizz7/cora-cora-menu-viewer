"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { MenuManifest } from "@/types/menu";
import type { MenuVariant } from "@/types/menu";
import ViewerHeader from "./ViewerHeader";
import MenuPage from "./MenuPage";
import { useVirtualScroll } from "@/hooks/useVirtualScroll";
import { usePageTracker } from "@/hooks/usePageTracker";
import { useSwipeDownClose } from "@/hooks/useSwipeDownClose";
import { BASE_PATH } from "@/lib/basePath";

export interface ScrollViewerProps {
  manifest: MenuManifest;
  menuTitle: string;
  cdnBaseUrl: string;
  backUrl?: string;
  variants?: MenuVariant[];
}

export default function ScrollViewer({
  manifest: initialManifest,
  menuTitle,
  cdnBaseUrl,
  backUrl = "/",
  variants,
}: ScrollViewerProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [manifest, setManifest] = useState(initialManifest);
  const [activeLang, setActiveLang] = useState(
    variants && variants.length > 0 ? variants[0].lang : "eng"
  );
  const [loadingLang, setLoadingLang] = useState(false);

  const currentPage = usePageTracker(containerRef);
  const isInWindow = useVirtualScroll(currentPage, manifest.pageCount);

  const handleBack = useCallback(() => {
    router.replace(backUrl);
  }, [router, backUrl]);

  useEffect(() => {
    window.history.pushState({ viewer: true }, "");
    const handlePopState = () => {
      router.replace(backUrl);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [router, backUrl]);

  useSwipeDownClose(handleBack);

  const handleLangSwitch = useCallback(
    async (variant: MenuVariant) => {
      if (variant.lang === activeLang || loadingLang) return;
      setLoadingLang(true);
      try {
        const res = await fetch(
          `${BASE_PATH}/data/menus/${variant.slug}/manifest.json`
        );
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        setManifest(data);
        setActiveLang(variant.lang);
        // Scroll to top on language switch
        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (err) {
        console.error("Language switch failed:", err);
      } finally {
        setLoadingLang(false);
      }
    },
    [activeLang, loadingLang]
  );

  const handleVisible = useCallback((_pageNum: number) => {}, []);
  const handleLoadError = useCallback((pageNum: number) => {
    console.error(`Failed to load page ${pageNum}`);
  }, []);

  const baseUrl = `${cdnBaseUrl}/menus/${manifest.menuSlug}`;

  // Preload first 3 pages for instant display
  const preloadPages = manifest.pages.slice(0, 3);

  return (
    <div className="min-h-screen bg-surface">
      {/* Preload first pages so browser fetches them immediately */}
      {preloadPages.map((page) => (
        <link
          key={`preload-${page.pageNum}`}
          rel="preload"
          as="image"
          href={`${baseUrl}/${page.mobile}`}
          // @ts-expect-error fetchpriority not in React types yet
          fetchpriority="high"
          imageSrcSet={`${baseUrl}/${page.mobile} 800w, ${baseUrl}/${page.desktop} 1400w`}
          imageSizes="(max-width: 768px) 100vw, 900px"
        />
      ))}
      <ViewerHeader
        title={menuTitle}
        currentPage={currentPage}
        totalPages={manifest.pageCount}
        onBack={handleBack}
      />

      {/* Language picker */}
      {variants && variants.length > 1 && (
        <div className="sticky top-[52px] z-40 bg-surface/95 backdrop-blur-sm border-b border-black/5">
          <div className="max-w-[900px] mx-auto flex items-center justify-center gap-1 py-2 px-4">
            {variants.map((v) => (
              <button
                key={v.lang}
                onClick={() => handleLangSwitch(v)}
                disabled={loadingLang}
                className={`px-3 py-1 rounded-full font-body text-xs font-semibold transition-colors ${
                  activeLang === v.lang
                    ? "bg-primary text-surface"
                    : "bg-surface-card text-on-surface-muted hover:text-on-surface"
                } ${loadingLang ? "opacity-50" : ""}`}
              >
                {v.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <main className="mx-auto" style={{ maxWidth: "900px" }}>
        <div ref={containerRef} className="flex flex-col" style={{ gap: "2px" }}>
          {manifest.pages.map((page) => (
            <MenuPage
              key={`${manifest.menuSlug}-${page.pageNum}`}
              pageNum={page.pageNum}
              totalPages={manifest.pageCount}
              lqip={page.lqip}
              mobileUrl={`${baseUrl}/${page.mobile}`}
              desktopUrl={`${baseUrl}/${page.desktop}`}
              aspectRatio={page.width / page.height}
              isInWindow={isInWindow(page.pageNum)}
              priority={page.pageNum <= 3}
              onVisible={handleVisible}
              onLoadError={handleLoadError}
            />
          ))}
        </div>
      </main>
    </div>
  );
}
