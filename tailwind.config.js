/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Light spectrum - Italian inspired palette
        // Pistachio greens (primary)
        'pistachio-50': '#F9FDF6',
        'pistachio-100': '#F0FAE8',
        'pistachio-200': '#E1F5D1',
        'pistachio-300': '#C8EDAA',
        'pistachio-400': '#B0E680',
        'pistachio-500': '#98DE64', // Main pistachio green
        'pistachio-600': '#7CC83A',
        'pistachio-700': '#5F9A2E',
        
        // Italian red (primary accent)
        'italian-red': '#DC143C',
        'red-50': '#FFF5F7',
        'red-100': '#FFE6EB',
        'red-200': '#FFCCD9',
        'red-300': '#FF99B2',
        'red-400': '#FF6680',
        'red-500': '#DC143C', // Main Italian red
        'red-600': '#C41230',
        'red-700': '#A00F26',
        
        // Italian cream and vanilla
        'cream': '#FFFAF5',
        'vanilla': '#FFF8F0',
        'ivory': '#F5F1EB',
        
        // Warm tones
        'tomato': '#FF6347',
        'warm-beige': '#E8D7C3',
        'sand': '#C4B5A0',
        
        // Soft Italian blues
        'mediterranean': '#4A90E2',
        'sky-blue': '#87CEEB',
        'sea-foam': '#93E9BE',
        
        // Gold and amber
        'gold': '#FFD700',
        'amber': '#FFC700',
        'ochre': '#CC8844',
        
        // Neutral light grays
        'cloud': '#F8F8F8',
        'mist': '#E8E8E8',
        'taupe': '#B8A0A0',
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
