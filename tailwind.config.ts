import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#50BEAD',
        secondary: '#8EDACE',
        subfont: '#C3C3C3',
        focusColor: '#454545',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable'],
      },
    },
  },
  plugins: [],
} satisfies Config;
