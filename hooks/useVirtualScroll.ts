import { useCallback } from "react";

/**
 * Returns a memoized function that checks if a page is within the
 * virtual scroll window centered on the current page.
 *
 * Window: [max(1, currentPage - 5), min(totalPages, currentPage + 5)]
 * Using ±5 (11-page window) to prevent pages from unmounting too
 * aggressively on mobile where fast scrolling is common.
 */
export function useVirtualScroll(
  currentPage: number,
  totalPages: number
): (pageNum: number) => boolean {
  return useCallback(
    (pageNum: number): boolean => {
      const lower = Math.max(1, currentPage - 5);
      const upper = Math.min(totalPages, currentPage + 5);
      return pageNum >= lower && pageNum <= upper;
    },
    [currentPage, totalPages]
  );
}
