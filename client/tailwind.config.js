/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Pretendard'],
    },
    colors: {
      default_black: 'rgb(0 0 0 / <alpha-value>)',
      default_white: 'rgb(255 255 255 / <alpha-value>)',
      fg: 'rgb(var(--color--fg) / <alpha-value>)',
      bg: 'rgb(var(--color--bg) / <alpha-value>)',
      gutter: 'rgb(var(--color--gutter) / <alpha-value>)',
      text_default: 'rgb(var(--color--text) / <alpha-value>)',
      guide: 'rgb(var(--color--guide) / <alpha-value>)',
      accent: 'rgb(var(--color--accent) / <alpha-value>)',
      cyan: 'rgb(var(--color--cyan) / <alpha-value>)',
      blue: 'rgb(var(--color--blue) / <alpha-value>)',
      purple: 'rgb(var(--color--purple) / <alpha-value>)',
      green: 'rgb(var(--color--green) / <alpha-value>)',
      rose: 'rgb(var(--color--rose) / <alpha-value>)',
      orange: 'rgb(var(--color--orange) / <alpha-value>)',
      red: 'rgb(var(--color--red) / <alpha-value>)',
      gold: 'rgb(var(--color--gold) / <alpha-value>)',
    },
    extend: {},
  },
  plugins: [],
};
