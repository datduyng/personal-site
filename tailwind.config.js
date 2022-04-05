const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      'main': '#000000',
      'secondary-reallight': '#222222',
      'secondary-light': '#444444', 
      'secondary': '#888888',
      'accent': '#6d30b6',
      'text': '#ffffff',
      'gray': {
        800: '#1f2937'
      }
    },
    extend: {},
    screens: {
      'xs': '300px',
      ...defaultTheme.screens, 
    }
  },
  plugins: [],
}
