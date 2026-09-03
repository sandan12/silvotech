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
        navy: '#2f4a6b',
        'navy-deep': '#243a56',
        blue: '#4a7ba6',
        orange: '#d2691e',
        'orange-dark': '#b8581a',
        ink: '#1e2732',
        body: '#4d5a66',
        muted: '#85929c',
        band: '#f6f7f9',
        'band-deep': '#eceff2',
        line: '#dde3e8',
        'line-strong': '#c2ccd4',
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
