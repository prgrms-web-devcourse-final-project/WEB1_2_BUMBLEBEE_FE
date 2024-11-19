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
      width: {
        custom: '330px',
      },
      boxShadow: {
        custom: '0 0 6px 0 rgba(0, 0, 0, 0.25)',
      },
      fontFamily: {
        pretendard: ['Pretendard Variable'],
      },
    },
  },
  plugins: [],
} satisfies Config;
