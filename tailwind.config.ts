import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        display: ["var(--font-bebas)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        heading: ["var(--font-neue)", "sans-serif"],
      },
      colors: {
        film: {
          black: "#080808",
          deep: "#0d0d0f",
          card: "#111114",
          border: "#1a1a1f",
          muted: "#2a2a35",
          gold: "#c9a84c",
          amber: "#e8b84b",
          silver: "#a8b0c0",
          white: "#f0f4ff",
          red: "#e63946",
          blue: "#4361ee",
          cyan: "#4cc9f0",
        },
      },
      backgroundImage: {
        "film-grain": "url('/grain.png')",
        "vignette": "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%)",
      },
      keyframes: {
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "92%": { opacity: "1" },
          "93%": { opacity: "0.85" },
          "94%": { opacity: "1" },
          "96%": { opacity: "0.9" },
          "97%": { opacity: "1" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "ticker": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6", filter: "blur(20px)" },
          "50%": { opacity: "1", filter: "blur(30px)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "counter": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "flicker": "flicker 8s infinite",
        "scan": "scan 6s linear infinite",
        "ticker": "ticker 30s linear infinite",
        "glow-pulse": "glow-pulse 4s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;