import type { Config } from 'tailwindcss';

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'blink': {
          '0%, 80%, 100%': { opacity: '0' },
          '40%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'blink': 'blink 1.4s infinite both',
      },
    },
  },
  content: [],
};

export default config;
