module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        light: '#FFE8D6',
        light2: '#e6d2c2',
        dark: '#0C1618',
        secondary: '#4F7D7C',
        primary: {
          100: '#CFB5B5',
          200: '#A67777',
          300: '#7B5151',
          400: '#6F4949',
          500: '#4A3030',
          600: '#191010',
        },
      },

      fontFamily: {
        worksans: ['Work Sans'],
      },

      padding: {
        full: '100%',
        '1/4': '25%',
        '1/6': '16.666667%',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
};
