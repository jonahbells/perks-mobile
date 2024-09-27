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
          400: "#9ca3af"
        }
          

      },
      fontFamily: {
        pthin: ["Poppins-Thin", "sans-serif"],
        pextralight: ["Poppins-ExtraLight", "sans-serif"],
        plight: ["Poppins-Light", "sans-serif"],
        pregular: ["Poppins-Regular", "sans-serif"],
        pmedium: ["Poppins-Medium", "sans-serif"],
        psemibold: ["Poppins-SemiBold", "sans-serif"],
        pbold: ["Poppins-Bold", "sans-serif"],
        pextrabold: ["Poppins-ExtraBold", "sans-serif"],
        pblack: ["Poppins-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};