/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['PT_Sans', 'sans-serif'], // Set 'PT_Sans' as the default sans-serif font
      },
    },
  },
  plugins: [],
}