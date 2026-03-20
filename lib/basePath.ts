/**
 * Returns the Next.js basePath at runtime.
 * Set NEXT_PUBLIC_BASE_PATH="/wp-content/uploads/menu" for WordPress deployment.
 * Leave empty for Railway / standalone deployment.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";
