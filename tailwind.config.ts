import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // or 'media' if preferred
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          10: "#FFFFFF", // text
          20: "#A0A0A0", // body
          30: "#6B6B6B", // secondary
          40: "#2A2A2A", // borders
          50: "#1E1E1E", // cards
          55: "#121212", // main background
          60: "#000000", // base black
        },
        primary: "#63BA0B",
        accent: {
          DEFAULT: "#0BBABA",
          alt: "#620BBA",
          danger: "#BA0B0B",
        },
        status: {
          danger: "#B41C2B",
          success: "#00A652",
          warning: "#F0AD4E",
          info: "#388CFA",
        },
      },
    },
  },
  plugins: [],
}

export default config