/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6132bc",
        secondary: {
          DEFAULT: "#f5f5f5",
          100: "#bfdbfe",
          200: "#93c5fd",
        },
        black: {
          DEFAULT: "#01030A",
          100: "#1E1E2D",
          200: "#232533",
          300: "#222222",
          400: "#aaaaaa"
        },
        white: {
          DEFAULT: "#ffffff",
        },
        gray: {
          DEFAULT: "#e3e3e3",
        }
          

      },
      fontFamily: {
        pthin: ["Outfit-Thin", "sans-serif"],
        pextralight: ["Outfit-ExtraLight", "sans-serif"],
        plight: ["Outfit-Light", "sans-serif"],
        pregular: ["Outfit-Regular", "sans-serif"],
        pmedium: ["Outfit-Medium", "sans-serif"],
        psemibold: ["Outfit-SemiBold", "sans-serif"],
        pbold: ["Outfit-Bold", "sans-serif"],
        pextrabold: ["Outfit-ExtraBold", "sans-serif"],
        pblack: ["Outfit-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};