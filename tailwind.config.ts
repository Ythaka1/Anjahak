import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: "var(--earth)",
        forest: "var(--forest)",
        canopy: "var(--canopy)",
        sage: "var(--sage)",
        harvest: "var(--harvest)",
        gold: "var(--gold)",
        dusk: "var(--dusk)",
        parchment: "var(--parchment)",
      },
      fontFamily: {
        cormorant: ["var(--font-cormorant)", "Georgia", "serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      boxShadow: {
        card: "0 4px 24px rgba(26,18,8,0.08)",
        "card-hover": "0 24px 48px rgba(26,18,8,0.18)",
        glass: "0 24px 64px rgba(26,18,8,0.1), inset 0 1px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(26,18,8,0.04)",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      backgroundImage: {
        "gold-line": "linear-gradient(90deg, transparent, var(--gold), transparent)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
};

export default config;
