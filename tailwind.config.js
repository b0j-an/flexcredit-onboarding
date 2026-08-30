/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          petrol: '#003A53',
          'petrol-dark': '#002536',
          'petrol-deep': '#001925',
          'petrol-light': '#005073',
          green: '#8DC63F',
          'green-light': '#9ED74E',
          'green-dark': '#72A42F',
          cyan: '#1696D4',
          'cyan-light': '#3DB3F0',
          'cyan-dark': '#0F73A3',
          cream: '#F8F9FA',
          'cream-warm': '#F7F4F0',
          dark: '#1E293B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-green': '0 0 25px -5px rgba(141, 198, 63, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(22, 150, 212, 0.4)',
        'card-elevated': '0 10px 30px -10px rgba(0, 58, 83, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up': 'slideUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
