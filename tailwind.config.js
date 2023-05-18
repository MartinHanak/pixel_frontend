/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'delay-bounce': 'delayBounce 3s linear infinite',
      },
      keyframes: {
        delayBounce: {
          '0%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-in-out'
          },
          '8.333%': {
            transform: 'translateY(-50%)',
            'animation-timing-function': 'ease-in-out'
          },
          '16.666%': {
            transform: 'translateY(0)',
            'animation-timing-function': 'ease-in-out'
          }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}

