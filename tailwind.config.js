/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      inter: ["Inter", "sans-serif"],
      montserrat: ["Montserrat", "serif"],
      russo: ["Russo One", "monospace"],
    },
    extend: {},
  },
  plugins: [],
}
