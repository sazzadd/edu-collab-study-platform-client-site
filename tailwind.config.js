// @type {import('tailwindcss').Config}
import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        freeAnimation: {
          '0%, 100%': {
            transform: 'scale(1)',
            backgroundColor: '#bbf7d0', // Light Green
            color: '#047857', // Dark Green
          },
          '50%': {
            transform: 'scale(1.1)',
            backgroundColor: '#10b981', // Bright Green
            color: '#ffffff', // White
          },
        },
      },
      animation: {
        pulseFree: 'freeAnimation 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
});
