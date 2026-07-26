import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.25rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand palette from zandooptics.com: warm gold + soft teal + mint.
        // ink / cream / surface are theme-aware (CSS variables swap in dark mode);
        // night is a fixed near-black for intentionally-dark areas (header, overlays).
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          soft: "rgb(var(--ink-soft) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
        },
        night: {
          DEFAULT: "#0e0e0e",
          soft: "#2b2b2b",
        },
        gold: {
          DEFAULT: "#caaa70",
          light: "#ddc79a",
          dark: "#a9884e",
        },
        teal: {
          DEFAULT: "#1accbf",
          dark: "#14a79c",
        },
        cream: "rgb(var(--cream) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -14px rgba(20, 167, 156, 0.18)",
        "card-hover": "0 18px 45px -14px rgba(202, 170, 112, 0.30)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pop-in": {
          "0%": { opacity: "0", transform: "translateY(14px) scale(0.97)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "zoom-in": {
          "0%": { opacity: "0", transform: "scale(0.94)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        "pop-in": "pop-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "zoom-in": "zoom-in 0.3s ease-out both",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
