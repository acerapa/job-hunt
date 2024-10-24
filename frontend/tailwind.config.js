/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        main: '#31473A',
        sub: '#EDF4F2',
        'gray-strong': '#737373',
        'light-green': '#9CB1A5',
        'sub-light-green': '#9FD9B7',
        'more-light-green': '#9DB0A5',
        'light-blue': 'rgba(228,236,252,0.5)',
        'blue-lt': '#6CA3E4',
        'green-theme': '#F4F8F6',
        'green-bright': '#299254',
        'blue-bright': '#3884F6',
        'green-weak': '#7AD48E',
        'pail-blue': '#E2F2F8',
        'pail-green': '#EBFFF0',
        'pail-gray': '#BAB5B5'
      },
      fontSize: {
        xxs: '0.5rem'
      }
    }
  },
  plugins: []
}
