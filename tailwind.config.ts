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
  			'200%': '200%'
  		},
  		keyframes: {
  			'gradient-x': {
  				'0%': {
  					'background-position': '0% 50%'
  				},
  				'50%': {
  					'background-position': '100% 50%'
  				},
  				'100%': {
  					'background-position': '0% 50%'
  				}
  			}
  		},
  		animation: {
  			'gradient-x': 'gradient-x 10s ease infinite'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		}
  	}
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
  plugins: [require("@tailwindcss/typography"), require("daisyui"), require("tailwindcss-animate")],
};
export default config;
