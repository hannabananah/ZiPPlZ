/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  important: true,
  theme: {
    extend: {
      fontSize: {
        title: ['2rem', '2rem'],
        label: ['1rem', '1.5rem'],
        subTitle: ['1.125rem', '1.75rem'],
        desc: ['0.938rem', '1.313rem'],
        content: ['0.875rem', '1.25rem'],
        subContent: ['0.813rem', '1.125rem'],
      },
      colors: {
        'main-color': '#73744A',
        'sub-color': '#E9E8D5',
        'black-color': '#111111',
        'light-beige': '#f2efef',
        gray: '#626262',
      },
      fontFamily: {
        nanum: [
          'Nanum Gothic',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
          'Trebuchet MS',
          'sans-serif',
        ],
        noto: [
          'Noto Sans KR',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
          'Apple Color Emoji',
          'Segoe UI Emoji',
          'Segoe UI Symbol',
          'Noto Color Emoji',
          'Trebuchet MS',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
