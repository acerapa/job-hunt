/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        main: '#31473A',
        sub: '#EDF4F2',
        'light-green': '#9CB1A5',
        'more-light-green': '#9DB0A5'
      }
    }
  },
  plugins: []
}
