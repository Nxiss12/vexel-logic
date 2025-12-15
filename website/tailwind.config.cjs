/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./pages/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#06b6d4',
          dark: '#062b36'
        }
      },
      borderRadius: {
        '2xl': '1rem'
      }
    }
  },
  plugins: []
};
