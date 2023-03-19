/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        neutralBlue50: 'hsl(217, 16%, 45%)',
        neutralBlue100: 'hsl(229, 64%, 46%)',
        neutralDark: 'hsl(229, 25%, 31%)',
      },
    },
  },
  plugins: [],
}
