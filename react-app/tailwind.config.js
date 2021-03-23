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
      backgroundImage: theme => ({
         'guy-pattern': "url('https://pairyopet.s3-us-west-1.amazonaws.com/laughing-man-holding-pen-in-meeting.jpg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
