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
        blue: '#1f7fc4',
        orange: '#e2762e',
        'orange-dark': '#c9641f',
        ink: '#0f1922',
        body: '#46555f',
        muted: '#7d8b95',
        band: '#f4f6f8',
        'band-deep': '#e8ecef',
        line: '#d8dee3',
        'line-strong': '#b3bec6',
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      // Squared by default; the industrial reference uses no rounding at all.
      borderRadius: {
        none: '0',
        DEFAULT: '0',
        sm: '2px',
        md: '2px',
        lg: '2px',
        xl: '2px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
