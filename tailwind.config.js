/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Premium gelato shop color palette
        // Creamy neutrals (premium base)
        'cream': '#FFFAF5',
        'ivory': '#F8F5F0',
        'vanilla': '#FAF7F2',
        'off-white': '#F5F3F0',
        
        // Sophisticated greens (pistachio)
        'pistach-50': '#F4F8F3',
        'pistach-100': '#E8F1E6',
        'pistach-200': '#D1E3CD',
        'pistach-300': '#9DBE7D',
        'pistach-400': '#7BA557',
        'pistach-500': '#4A7C59', // Main pistachio - sophisticated
        'pistach-600': '#3A6347',
        'pistach-700': '#2D4D38',
        
        // Gold/caramel (warmth, luxury)
        'caramel': '#D4A574',
        'gold-dark': '#C29A5A',
        'gold-light': '#E8C9A0',
        'honey': '#DDAA4F',
        
        // Sophisticated neutrals
        'charcoal': '#3D3D3D',
        'grey-dark': '#4A4A4A',
        'grey-light': '#8B8B8B',
        'taupe': '#6B6360',
        'beige': '#D4C5B0',
        
        // Accents for depth
        'slate': '#5A5A5A',
        'warm-grey': '#A89A8F',
        
        // Legacy colors for compatibility
        'dark': '#2C2C2C',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'glow-pistachio': 'glowPistachio 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'slide-in-left': 'slideInLeft 0.7s ease-out',
        'slide-in-right': 'slideInRight 0.7s ease-out',
        'scale-in': 'scaleIn 0.5s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
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
        glowPistachio: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(152, 222, 100, 0.4)',
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(152, 222, 100, 0.7)',
          },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(60px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropFilter: {
        glass: 'blur(10px)',
      },
    },
  },
  plugins: [],
};
