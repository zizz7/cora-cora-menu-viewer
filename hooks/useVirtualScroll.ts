import { useCallback } from "react";

/**
 * Returns a memoized function that checks if a page is within the 6-page
 * virtual scroll window centered on the current page.
 *
 * Window: [max(1, currentPage - 3), min(totalPages, currentPage + 3)]
 */
export function useVirtualScroll(
  currentPage: number,
  totalPages: number
): (pageNum: number) => boolean {
  return useCallback(
    (pageNum: number): boolean => {
      const lower = Math.max(1, currentPage - 3);
      const upper = Math.min(totalPages, currentPage + 3);
      return pageNum >= lower && pageNum <= upper;
    },
    [currentPage, totalPages]
  );
}
