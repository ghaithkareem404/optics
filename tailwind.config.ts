import type { Config } from "tailwindcss";

const config: Config = {
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
        // Deep, premium optics palette: midnight navy + warm gold accent.
        ink: {
          DEFAULT: "#0d1b2a",
          soft: "#1b263b",
          muted: "#415a77",
        },
        gold: {
          DEFAULT: "#c8a24a",
          light: "#e0c375",
          dark: "#a3822f",
        },
        cream: "#f7f4ee",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(13, 27, 42, 0.25)",
        "card-hover": "0 18px 45px -12px rgba(13, 27, 42, 0.35)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
