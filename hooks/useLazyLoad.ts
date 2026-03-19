import { useEffect, useRef, useState } from "react";

/**
 * Uses IntersectionObserver with rootMargin '200px 0px' to determine
 * when a page element is near the viewport and should load its full image.
 *
 * Pages marked as priority bypass the observer and are always "near".
 */
export function useLazyLoad(priority: boolean): {
  isNear: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
} {
  const observerRef = useRef<HTMLDivElement>(null);
  const [isNear, setIsNear] = useState(priority);

  useEffect(() => {
    if (priority) return; // Priority pages are always near

    const el = observerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsNear(true);
          observer.disconnect(); // Once near, stay loaded
        }
      },
      { rootMargin: "200px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  return { isNear, observerRef };
}
