import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // New palette
        primary: "#00C4B3",
        "primary-dark": "#00A89A",
        secondary: "#FFA16B",
        tertiary: "#F89ABA",
        surface: "#0F1923",
        "surface-card": "#1A2A36",
        "surface-elevated": "#243442",
        "on-surface": "#F0F0F0",
        "on-surface-muted": "rgba(240,240,240,0.5)",
        gold: "#D4A853",
        "gold-light": "#E8C97A",
        shelf: "#3E2723",
        "shelf-light": "#5D4037",
        // Legacy (viewer pages still use these)
        forest: "var(--color-forest)",
        amber: "var(--color-amber)",
        cream: "var(--color-cream)",
        "cream-muted": "var(--color-cream-muted)",
        "header-bg": "var(--color-header-bg)",
        "header-border": "var(--color-header-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
