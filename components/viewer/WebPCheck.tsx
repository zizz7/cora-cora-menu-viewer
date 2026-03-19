"use client";

import { useEffect, useState } from "react";

/**
 * Detects WebP support using a canvas-based feature check.
 * Returns true if the browser can encode WebP via canvas.toDataURL.
 */
function detectWebPSupport(): boolean {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 1;
    canvas.height = 1;
    return canvas.toDataURL("image/webp").startsWith("data:image/webp");
  } catch {
    return false;
  }
}

/**
 * Wraps children and checks for WebP support on mount.
 * If unsupported, renders a full-screen message instead of children.
 */
export default function WebPCheck({ children }: { children: React.ReactNode }) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(detectWebPSupport());
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
