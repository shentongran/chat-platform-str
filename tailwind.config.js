/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        warm: {
          50: '#FFF8F0',
          100: '#FFE8D6',
          200: '#FFD4B8',
          300: '#FFBE98',
          400: '#FFA878',
          500: '#FF8A65',
          600: '#FF7043',
          700: '#F4511E',
          800: '#E64A19',
          900: '#D84315',
        },
        soft: {
          pink: '#FFCDD2',
          green: '#B2DFDB',
          purple: '#E1BEE7',
          yellow: '#FFF9C4',
          blue: '#BBDEFB',
        },
        cream: {
          50: '#FFFBF5',
          100: '#FFF8F0',
          200: '#FFEFE0',
        },
        darkwarm: {
          50: '#3D3833',
          100: '#35302C',
          200: '#2D2A26',
          300: '#252320',
          400: '#1D1B19',
        }
      },
      fontFamily: {
        display: ['"LXGW WenKai"', '"Noto Serif SC"', 'serif'],
        body: ['"Noto Sans SC"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        warm: '0 4px 20px -2px rgba(255, 138, 101, 0.3)',
        soft: '0 2px 12px -2px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'bounce-soft': 'bounce-soft 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'slide-down': 'slide-down 0.3s ease-out',
      },
      keyframes: {
        'bounce-soft': {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
