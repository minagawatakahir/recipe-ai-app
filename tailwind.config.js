/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        recipe: {
          warm: '#FFA500',
          light: '#FFE4B5',
          dark: '#8B4513',
        }
      }
    },
  },
  plugins: [],
}
