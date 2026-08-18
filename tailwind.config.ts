import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: '#052d74',
        'navy-deep': '#03235b',
        blue: '#238ad8',
        orange: '#e2762e',
        'orange-dark': '#cf6325',
        ink: '#14233a',
        body: '#44566b',
        muted: '#8595a8',
        band: '#f7f8fa',
        'band-deep': '#eef1f5',
        line: '#e2e7ee',
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;