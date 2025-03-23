// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <--- Add this line
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200%", // Erhöht die Hintergrundgröße für die Animation
      },
      keyframes: {
        "gradient-x": {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#850379",
          "primary-content": "#e9d0e4",
          secondary: "#090647",
          "secondary-content": "#c5cada",
          accent: "#354FCC",
          "accent-content": "#d2ddf8",
          neutral: "#963A8D",
          "neutral-content": "#ecd7e8",
          "base-100": "#ffffff",
          "base-200": "#dedede",
          "base-300": "#bebebe",
          "base-content": "#161616",
          info: "#CC3766",
          "info-content": "#fad9df",
          success: "#00dd00",
          "success-content": "#001100",
          warning: "#fb923c",
          "warning-content": "#150801",
          error: "#ff003a",
          "error-content": "#160001",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
export default config;
