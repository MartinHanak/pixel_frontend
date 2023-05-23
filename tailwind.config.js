/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': '580px'
      },
      gridTemplateColumns: {
        'form': 'minmax(max-content,1fr) 2fr'
      },
      animation: {
        'delay-bounce': 'delayBounce 3s linear infinite',
        'win': 'greenBlinking 3s linear 1 forwards',
        'wrong': 'redBlinking 3s linear 1 forwards',
        'fall-down': 'fallDown 0.5s ease-in-out 1 ',
        'go-up': 'goUp 0.5s ease-in-out 1 ',
        'go-left': 'goLeft 0.5s ease-in-out 1 forwards',
        'go-right': 'goRight 0.5s ease-in-out 1 forwards',
        'hide-up': 'hideUp 0.5s ease-in-out 1 forwards'
      },
      keyframes: {
        fallDown: {
          '0%': {
            transform: 'translateY(-100vh)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        },
        goUp: {
          '0%': {
            transform: 'translateY(100vh)',
            opacity: 0
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: 1
          }
        },
        hideUp: {
          '0%': {
            transform: 'translateY(0)',
            opacity: 1
          },
          '100%': {
            transform: 'translateY(-100vh)',
            opacity: 0,

          }
        },
        goRight: {
          '0%': {
            transform: 'translateX(0)',
            opacity: 1
          },'100%': {
            transform: 'translateX(100vw)',
            opacity: 0
          }
        },
        goLeft: {
          '0%': {
            transform: 'translateX(0)'
          },'100%': {
            transform: 'translateX(-100vw)'
          }
        },
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
        },
        greenBlinking: {
          '0%': {
            backgroundColor: '#22c55e' 
          }, 
          '10%' : {
            backgroundColor: '#14532d'
          },
          '20%' : {
            backgroundColor: '#22c55e'
          },
          '100%' : {
             backgroundColor: '#22c55e'
          }
        },
        redBlinking: {
          '0%' : {
            backgroundColor: "#f43f5e"
          },
          '20%' : {
            backgroundColor: "#881337"
          },
          '100%' : {
            backgroundColor: "#f43f5e"
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

