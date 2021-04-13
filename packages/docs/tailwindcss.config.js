const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: {
    mode: 'all',
    enabled: process.env.NODE_ENV === 'production',
    content: ['pages']
      .map((p) => ['js'].map((e) => `./${p}/**/*.${e}`))
      .flat(3),
  },
  darkMode: false,
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
