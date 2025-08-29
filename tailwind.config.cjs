/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#006A4E',
        secondary: '#F42A41',
        light: '#f0f2f5',
      },
      fontFamily: {
        sans: ['Roboto', 'system-ui'],
        display: ['Hind Siliguri', 'system-ui'],
      }
    },
  },
  plugins: [],
}
