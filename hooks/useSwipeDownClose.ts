import { useEffect, useRef } from "react";

/**
 * Detects a swipe-down gesture from the top of the page on touch devices.
 * Only triggers when scrolled to top (scrollY === 0) and swipe distance
 * exceeds the threshold (default 100px).
 */
export function useSwipeDownClose(onClose: () => void, threshold = 100) {
  const startYRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        startYRef.current = e.touches[0].clientY;
      } else {
        startYRef.current = null;
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (startYRef.current === null) return;

      const endY = e.changedTouches[0].clientY;
      const distance = endY - startYRef.current;

      if (distance >= threshold) {
        onClose();
      }

      startYRef.current = null;
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [onClose, threshold]);
}
