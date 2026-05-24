/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
      },
      colors: {
        atletiza: {
          bg: '#131518',
          surface: '#1E2127',
          accent: '#E86A10',
          'accent-hover': '#FF7B1C',
          text: '#FFFFFF',
          'text-secondary': '#8A919E',
          'text-soft': '#C8CDD6',
        },
      },
    },
  },
  plugins: [],
}
