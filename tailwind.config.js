/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8F0',
        'ice-pink': '#FF6B9D',
        'ice-purple': '#C44569',
        'ice-blue': '#00D4FF',
        'ice-gold': '#FFD700',
        dark: '#0F0F0F',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 107, 157, 0.5)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 107, 157, 0.8)',
          },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
    },
  },
  plugins: [],
};
