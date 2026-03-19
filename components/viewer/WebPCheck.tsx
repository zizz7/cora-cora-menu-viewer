"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebP support by loading a tiny 1×1 WebP image.
 * This is reliable across all browsers including iOS Safari,
 * which supports WebP decoding but not WebP canvas encoding.
 */
function detectWebPSupport(): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img.width === 1 && img.height === 1);
    img.onerror = () => resolve(false);
    // 1×1 white lossy WebP
    img.src =
      "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA";
  });
}

/**
 * Wraps children and checks for WebP support on mount.
 * If unsupported, renders a full-screen message instead of children.
 */
export default function WebPCheck({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    detectWebPSupport().then(setSupported);
  }, []);

  // Still checking — render children optimistically
  if (supported === null || supported) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-forest px-6 text-center">
      <h1 className="font-heading text-3xl font-semibold text-cream">
        Browser Update Required
      </h1>
      <p className="mt-3 max-w-sm font-body text-sm text-cream-muted">
        This menu viewer requires WebP image support. Please update your browser
        to the latest version to view the menu.
      </p>
      <a
        href="/"
        className="mt-6 rounded-full bg-amber px-8 py-3 font-body text-sm font-semibold text-forest shadow-lg transition-transform hover:scale-105 active:scale-95"
      >
        Back to Bookcase
      </a>
    </div>
  );
}
