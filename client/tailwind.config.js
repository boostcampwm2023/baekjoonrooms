/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Pretendard'],
    },
    colors: {
      default_black: '#000000',
      default_white: '#FFFFFF',
      fg: 'var(--color--fg)',
      bg: 'var(--color--bg)',
      gutter: 'var(--color--gutter)',
      text_default: 'var(--color--text)',
      guide: 'var(--color--guide)',
      accent: 'var(--color--accent)',
      cyan: 'var(--color--cyan)',
      blue: 'var(--color--blue)',
      purple: 'var(--color--purple)',
      green: 'var(--color--green)',
      rose: 'var(--color--rose)',
      orange: 'var(--color--orange)',
      red: 'var(--color--red)',
      gold: 'var(--color--gold)',
    },
    extend: {},
  },
  plugins: [],
};
