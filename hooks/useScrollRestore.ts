import { useCallback } from "react";

interface ScrollRestore {
  save: () => void;
  restore: () => void;
}

/**
 * Saves and restores scroll position to sessionStorage by key.
 * Handles sessionStorage unavailability gracefully.
 */
export function useScrollRestore(key: string): ScrollRestore {
  const save = useCallback(() => {
    try {
      sessionStorage.setItem(key, String(window.scrollY));
    } catch {
      // sessionStorage unavailable — degrade silently
    }
  }, [key]);

  const restore = useCallback(() => {
    try {
      const stored = sessionStorage.getItem(key);
      if (stored !== null) {
        const y = Number(stored);
        if (!isNaN(y)) {
          window.scrollTo(0, y);
        }
      }
    } catch {
      // sessionStorage unavailable — degrade silently
    }
  }, [key]);

  return { save, restore };
}
