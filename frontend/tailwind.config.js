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
        },
        secondary: {
          DEFAULT: '#1aaf89;',
        },
        background: {
          DEFAULT: '#EDEDED',
        },
        text: {
          DEFAULT: '#241623',
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
      },
    ],
  },

};
