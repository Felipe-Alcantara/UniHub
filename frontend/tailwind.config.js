/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        unihub: {
          primary: '#6366F1',
          'primary-bright': '#818CF8',
          accent: '#8B5CF6',
          'accent-bright': '#A78BFA',
        },
      },
      animation: {
        'glow-breathe': 'glow-breathe 3s ease-in-out infinite',
        'glow-breathe-subtle': 'glow-breathe-subtle 3.8s ease-in-out infinite',
        'float-up': 'float-up 6s ease-in-out infinite',
        'shimmer': 'shimmer 1s ease-in-out',
        'gradient-orbit': 'gradient-orbit 7.5s ease-in-out infinite',
      },
      keyframes: {
        'glow-breathe': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(99, 102, 241, 0.35)' },
        },
        'glow-breathe-subtle': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(99, 102, 241, 0.1)' },
          '50%': { boxShadow: '0 0 15px rgba(99, 102, 241, 0.2)' },
        },
        'float-up': {
          '0%': { transform: 'translateY(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-150px)', opacity: 0 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-orbit': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
