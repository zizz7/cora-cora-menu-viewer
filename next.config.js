const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  runtimeCaching: [
    {
      urlPattern: /\.webp$/,
      handler: "CacheFirst",
      options: {
        cacheName: "menu-pages",
        expiration: {
          maxEntries: 200,
          maxAgeSeconds: 604800, // 7 days
        },
      },
    },
    {
      urlPattern: /\/(menu\/.*)?$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "pages",
      },
    },
    {
      urlPattern: /manifest\.json$/,
      handler: "StaleWhileRevalidate",
      options: {
        cacheName: "manifests",
      },
    },
  ],
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  images: {
    unoptimized: true,
  },
};

module.exports = withPWA(nextConfig);
