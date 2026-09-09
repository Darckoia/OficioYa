import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef6ff',
          100: '#d9ebff',
          200: '#bcdcff',
          300: '#8fc5ff',
          400: '#5aa6ff',
          500: '#287dff',
          600: '#155ce4',
          700: '#1548bf',
          800: '#183f98',
          900: '#1a3779'
        },
        ink: '#0f172a',
        sand: '#f8fafc'
      },
      boxShadow: {
        soft: '0 20px 45px -25px rgba(15, 23, 42, 0.35)'
      }
    }
  },
  plugins: []
};

export default config;
