import { useEffect, useRef, useState } from "react";

/**
 * Uses IntersectionObserver to track which page element has the highest
 * intersection ratio and reports it as the current page number.
 *
 * Observes elements with `data-page` attributes inside the given container ref.
 */
export function usePageTracker(
  containerRef: React.RefObject<HTMLElement | null>
): number {
  const [currentPage, setCurrentPage] = useState(1);
  const ratiosRef = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          const pageNum = Number(el.dataset.page);
          if (!isNaN(pageNum)) {
            ratiosRef.current.set(pageNum, entry.intersectionRatio);
          }
        }

        // Find the page with the highest intersection ratio
        let bestPage = 1;
        let bestRatio = -1;
        ratiosRef.current.forEach((ratio, page) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestPage = page;
          }
        });

        if (bestRatio > 0) {
          setCurrentPage(bestPage);
        }
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    // Observe all elements with data-page attribute
    const pages = container.querySelectorAll("[data-page]");
    pages.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [containerRef]);

  return currentPage;
}
