/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: {
          DEFAULT: '#1f6356;',
          dark: '#1F6356', //dont worry bout it
        },
        secondary: {
          DEFAULT: '#1aaf89;',
          dark: '#1AAF89', //dont worry bout it
        },
        background: {
          DEFAULT: '#EDEDED',
          dark: '#24162', //dont worry bout it
        },
        text: {
          DEFAULT: '#241623',
          dark: '#EDEDED', //dont worry bout it
        },
      },
      
    },
  },
      
  plugins: [
    require('daisyui'),
  ],

  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"],
          primary: '#1f6356',
          secondary: '#1aaf89',
          "bg-primary": '#EDEDED',
          "text-primary": '#241623',
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          //TBA
        }
      },
    ],
  },

};
