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
        // Brand palette taken from zandooptics.com: warm gold + soft teal + mint on near-black.
        ink: {
          DEFAULT: "#0e0e0e",
          soft: "#2b2b2b",
          muted: "#6b6b6b",
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
        // Reused everywhere as the light section background (the site's mint tint).
        cream: "#ecf3f2",
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
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
