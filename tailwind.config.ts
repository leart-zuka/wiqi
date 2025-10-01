// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"], // <--- Add this line
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundSize: {
        "200%": "200%",
      },
      keyframes: {
        "gradient-x": {
          "0%": {
            "background-position": "0% 50%",
          },
          "50%": {
            "background-position": "100% 50%",
          },
          "100%": {
            "background-position": "0% 50%",
          },
        },
        "spin-slow": {
          "0%": {
            transform: "rotate(0deg)",
          },
          "100%": {
            transform: "rotate(360deg)",
          },
        },
        "spin-slow-reverse": {
          "0%": {
            transform: "rotate(360deg)",
          },
          "100%": {
            transform: "rotate(0deg)",
          },
        },
        "bounce-slow": {
          "0%, 100%": {
            transform: "translateY(0)",
            "animation-timing-function": "cubic-bezier(0.8,0,1,1)",
          },
          "50%": {
            transform: "translateY(-25%)",
            "animation-timing-function": "cubic-bezier(0,0,0.2,1)",
          },
        },
        "pulse-slow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.3",
          },
        },
        "float-equation": {
          "0%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.2",
          },
          "50%": {
            transform: "translateY(-20px) rotate(1deg)",
            opacity: "0.4",
          },
          "100%": {
            transform: "translateY(0px) rotate(0deg)",
            opacity: "0.2",
          },
        },
      },
      animation: {
        "gradient-x": "gradient-x 10s ease infinite",
        "spin-slow": "spin-slow 8s linear infinite",
        "spin-slow-reverse": "spin-slow-reverse 12s linear infinite",
        "bounce-slow": "bounce-slow 3s ease-in-out infinite",
        "pulse-slow": "pulse-slow 4s ease-in-out infinite",
        "float-equation": "float-equation 6s ease-in-out infinite",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
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
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"),
    require("tailwindcss-animate"),
  ],
};
export default config;
