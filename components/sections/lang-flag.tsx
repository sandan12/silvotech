import type { Locale } from '@/lib/i18n';

export default function LangFlag({ lang, className }: { lang: Locale; className?: string }) {
  const cls = `inline-block rounded-[2px] shadow-sm ${className ?? ''}`;
  switch (lang) {
    case 'pl':
      return (
        <svg viewBox="0 0 640 480" aria-label="Polski" className={cls}>
          <rect width="640" height="480" fill="#fff" />
          <rect width="640" height="240" fill="#dc143c" />
        </svg>
      );
    case 'en':
      return (
        <svg viewBox="0 0 640 480" aria-label="English" className={cls}>
          <path fill="#012169" d="M0 0h640v480H0z" />
          <path stroke="#fff" strokeWidth="60" d="m0 0 640 480M640 0 0 480" />
          <path stroke="#C8102E" strokeWidth="40" d="m0 0 640 480M640 0 0 480" />
          <path fill="#fff" d="M0 200h640v80H0zM280 0h80v480h-80z" />
          <path fill="#C8102E" d="M0 240h640v40H0zM320 0h40v480h-40z" />
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 640 480" aria-label="Deutsch" className={cls}>
          <rect width="640" height="160" fill="#000" />
          <rect y="160" width="640" height="160" fill="#d00" />
          <rect y="320" width="640" height="160" fill="#ffce00" />
        </svg>
      );
    case 'cs':
      return (
        <svg viewBox="0 0 640 480" aria-label="Čeština" className={cls}>
          <path fill="#fff" d="M0 0h640v240H0z" />
          <path fill="#d7141a" d="M0 240h640v240H0z" />
          <path fill="#11457e" d="M0 0v480l320-240z" />
        </svg>
      );
    case 'sk':
      return (
        <svg viewBox="0 0 640 480" aria-label="Slovenčina" className={cls}>
          <path fill="#fff" d="M0 0h640v480H0z" />
          <path fill="#0b4ea2" d="M0 160h640v160H0z" />
          <path fill="#ee1c25" d="M0 320h640v160H0z" />
          <path fill="#ee1c25" d="M95 195c-16 45-8 80 12 105 26-12 36-18 48-34 12 16 22 22 48 34 20-25 28-60 12-105-11-32-28-50-60-50s-49 18-60 50z" />
          <path fill="#fff" d="M137 225h38v80h-38z" />
          <path fill="#fff" d="M127 240h58v12h-58z" />
          <path fill="#fff" d="M127 264h58v12h-58z" />
          <path fill="#0b4ea2" d="M118 292h76l-10 26h-56z" />
        </svg>
      );
  }
}