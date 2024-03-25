/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        blackPrimary: "#1B1B1B",
        darkGray: "#7A7A7A",
        yellowSecondary: "#FFD15B",
        lightGray: "#EDEDED",
      },
      fontFamily: {
        manrope: ["Manrope", "sans-serif"],
        anton: ["Anton", "sans-serif"],
      },
    },
  },
  plugins: ["prettier-plugin-tailwindcss"],
};
