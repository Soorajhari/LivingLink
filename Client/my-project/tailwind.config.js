/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },


      backgroundColor: {
        'custom-light': '#fff9ed',
        'custom-black': '#434242',
        'custom-gray': '#e4e6eb',
      },
      backdropFilter: {
        'none': 'none',
        'blur': 'blur(20px)',
      }
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive']
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
}
