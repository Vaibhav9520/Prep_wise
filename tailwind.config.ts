import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Fresh & Motivating Color Theme
        'fresh-green': {
          DEFAULT: '#1A936F',
          light: '#22B88A',
          dark: '#157A5C',
        },
        'ocean-blue': {
          DEFAULT: '#2D7DD2',
          light: '#4A9FE8',
          dark: '#1F5FA3',
        },
        'warm-peach': {
          DEFAULT: '#F4A896',
          light: '#FFB8A8',
          dark: '#E89684',
        },
        'light-mint': '#E8FFF7',
        'midnight': '#0E1A1A',
      },
      fontFamily: {
        sans: ['var(--font-mona-sans)', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;