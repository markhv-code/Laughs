module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    extend: {
      colors: {
        'green-joker': '#a0e193',
        'red-joker': '#ec535f',
        'blue-joker': '#94bfff'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
