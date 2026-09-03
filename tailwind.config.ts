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
        navy: '#003261',
        'navy-deep': '#00223f',
        blue: '#0d6ba8',
        orange: '#fe7612',
        'orange-dark': '#e2650a',
        'orange-ink': '#b85508',
        ink: '#12202e',
        body: '#46586a',
        muted: '#7d8ea0',
        band: '#f5f7f9',
        'band-deep': '#e7edf3',
        line: '#d8e2ea',
        'line-strong': '#b6c5d3',
      },
      fontFamily: {
        sans: ['var(--font-barlow)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['var(--font-barlow-condensed)', 'var(--font-barlow)', 'sans-serif'],
        mono: ['var(--font-plex-mono)', 'ui-monospace', 'monospace'],
      },
      // Soft radius scale used consistently across the whole site.
      borderRadius: {
        none: '0',
        DEFAULT: '8px',
        sm: '8px',
        md: '10px',
        lg: '12px',
        xl: '18px',
        '2xl': '22px',
        full: '9999px',
      },
    },
  },
  plugins: [],
};

export default config;
