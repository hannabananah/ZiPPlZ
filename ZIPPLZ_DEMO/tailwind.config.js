// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{html,js,tsx}"],
  important: true,
  theme: {
    fontSize: {
      'zp-3xl': ['2rem', '2rem'],
      'zp-2xl': ['1.5rem', '2rem'],
      'zp-xl': ['1rem', '1.5rem'],
      'zp-lg': ['1.125rem', '1.75rem'],
      'zp-md': ['0.938rem', '1.313rem'],
      'zp-sm': ['0.875rem', '1.25rem'],
      'zp-xs': ['0.813rem', '1.125rem'],
      'zp-2xs': ['0.688rem', '0.875rem'],
      'zp-3xs': ['0.563rem', '0.875rem'],
    },
    colors: {
      'zp-main-color': '#73744A',
      'zp-sub-color': '#E9E8D5',
      'zp-black': '#111',
      'zp-white': '#FFF',
      'zp-gray': '#626262',
      'zp-red': '#FF0000',
      'zp-yellow': '#ECE21B',
      'zp-light-gray': '#CCC',
      'zp-slight-white': '#FAFAFA',
      'zp-light-beige': '#f6f6f6',
      'zp-light-yellow': '#F6F7E2',
      'zp-light-orange': '#FFFDF7',
      'zp-transparent': 'transparent',
    },
    borderRadius: {
      'zp-radius-big': '1rem',
      'zp-radius-bubble': '0.844rem',
      'zp-radius-btn': '0.375rem',
      'zp-radius-full': '9999px',
      'zp-radius-none': '0px',
    },
    dropShadow: {
      'zp-normal': '0 3px 6px rgba(0, 0, 0, 0.1)',
      'zp-deep': '0 3px 3px rgb(0, 0, 0, 0.3)',
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
      metamorphous: 'Metamorphous',
    },
    extend: {
      screens: {
        sm: '400px', // 기존 sm의 범위를 600px로 변경
        md: '500px', // 기존 md의 범위를 800px로 변경
        // 필요에 따라 다른 브레이크포인트도 수정 가능
        lg: '1024px',
        xl: '1280px',
      },
    },
  },
  plugins: [],
};
