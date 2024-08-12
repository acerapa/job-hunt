/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        main: '#31473A',
        sub: '#EDF4F2',
        'light-green': '#9CB1A5',
        'sub-light-green': '#9FD9B7',
        'more-light-green': '#9DB0A5',
        'light-blue': 'rgba(228,236,252,0.5)'
      },
      fontSize: {
        xxs: '0.5rem'
      }
    }
  },
  plugins: []
}
