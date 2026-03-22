"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export interface MenuPageProps {
  pageNum: number;
  totalPages: number;
  lqip: string;
  mobileUrl: string;
  desktopUrl: string;
  aspectRatio: number;
  isInWindow: boolean;
  priority: boolean;
  onVisible: (pageNum: number) => void;
  onLoadError: (pageNum: number) => void;
}

export default function MenuPage({
  pageNum,
  totalPages,
  lqip,
  mobileUrl,
  desktopUrl,
  aspectRatio,
  isInWindow,
  priority,
  onVisible,
  onLoadError,
}: MenuPageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isInWindow || !containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) onVisible(pageNum);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [isInWindow, pageNum, onVisible]);

  const handleLoad = useCallback(() => { setLoaded(true); setError(false); }, []);
  const handleError = useCallback(() => { setError(true); onLoadError(pageNum); }, [pageNum, onLoadError]);
  const handleRetry = useCallback(() => { setError(false); setLoaded(false); }, []);

  if (!isInWindow) {
    return (
      <div data-page={pageNum} style={{ aspectRatio: `${aspectRatio}` }} className="w-full bg-forest" />
    );
  }

  return (
    <div
      ref={containerRef}
      data-page={pageNum}
      className="relative w-full overflow-hidden"
      style={{ aspectRatio: `${aspectRatio}` }}
    >
      {/* LQIP placeholder */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={lqip}
        aria-hidden="true"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ filter: "blur(12px)", transform: "scale(1.05)" }}
      />

      {/* Full resolution image */}
      {!error && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          key={`${mobileUrl}-${error}`}
          srcSet={`${mobileUrl} 800w, ${desktopUrl} 1400w`}
          sizes="(max-width: 768px) 100vw, 900px"
          src={desktopUrl}
          alt={`Menu page ${pageNum} of ${totalPages}`}
          loading={priority ? "eager" : "lazy"}
          // @ts-expect-error fetchpriority not in React types yet
          fetchpriority={priority ? "high" : "auto"}
          decoding={priority ? "sync" : "async"}
          onLoad={handleLoad}
          onError={handleError}
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 150ms ease-in-out",
          }}
        />
      )}

      {/* Loading spinner */}
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-8 h-8 rounded-full animate-spin" style={{ borderWidth: 3, borderColor: "rgba(255,255,255,0.4)", borderTopColor: "rgba(255,255,255,0.9)", borderStyle: "solid" }} />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button onClick={handleRetry} className="rounded-full bg-amber px-5 py-2 font-body text-sm font-semibold text-forest shadow-lg">Retry</button>
        </div>
      )}
    </div>
  );
}
