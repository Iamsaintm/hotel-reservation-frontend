/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Gilda: ["Gilda Display", "serif"],
        Barlow: ["Barlow", "sans-serif"],
      },
    },
  },
  plugins: [],
};
