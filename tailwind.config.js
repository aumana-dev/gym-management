/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coach: {
          bg: '#0F0F0F',
          card: '#1A1A1A',
          accent: '#22C55E',
        },
      },
    },
  },
  plugins: [],
}

