import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "var(--color-forest)",
        amber: "var(--color-amber)",
        cream: "var(--color-cream)",
        "cream-muted": "var(--color-cream-muted)",
        "header-bg": "var(--color-header-bg)",
        "header-border": "var(--color-header-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
