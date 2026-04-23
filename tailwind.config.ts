import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          base: "#63322c",
          light: "#7d4038",
          lighter: "#efebeb",
          darker: "#3c1f1b",
        },
        beige: {
          lighter: "#fdf9f6",
          base: "#e8c5a5",
        },
        yellow: {
          base: "#f2ae40",
          light: "#fbdfb1",
        },
        text: {
          900: "#140b0a",
          500: "#585251",
          300: "#c4c2c2",
          white: "#ffffff",
        },
        bg: {
          white: "#ffffff",
          soft: "#ecebeb",
        },
        charcoal: {
          darker: "#1e2429",
          base: "#313b44",
        },
        stroke: {
          soft: "#ecebeb",
          strong: "#140b0a",
        },
      },
      fontFamily: {
        jost: ["var(--font-jost)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        pill: "32px",
      },
    },
  },
  plugins: [],
};
export default config;
