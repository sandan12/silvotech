export function SiliconeFlow() {
  return (
    <div className="silicone-flow" aria-hidden="true">
      <svg viewBox="0 0 900 520" className="silicone-flow__svg" role="img">
        <defs>
          <linearGradient id="tubeStroke" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)" />
            <stop offset="32%" stopColor="rgba(255,255,255,0.88)" />
            <stop offset="58%" stopColor="rgba(186,213,230,0.72)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.22)" />
          </linearGradient>
          <linearGradient id="tubeCore" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
            <stop offset="48%" stopColor="rgba(226,243,255,0.32)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.62)" />
          </linearGradient>
          <filter id="softGlass" x="-20%" y="-40%" width="140%" height="180%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" />
          </filter>
        </defs>
        <path className="silicone-flow__shadow" d="M72 312 C184 132 370 125 474 244 C558 340 701 364 817 205" />
        <path className="silicone-flow__tube" d="M72 312 C184 132 370 125 474 244 C558 340 701 364 817 205" />
        <path className="silicone-flow__core" d="M72 312 C184 132 370 125 474 244 C558 340 701 364 817 205" />
        <path className="silicone-flow__highlight silicone-flow__highlight--one" d="M72 312 C184 132 370 125 474 244 C558 340 701 364 817 205" />
        <path className="silicone-flow__highlight silicone-flow__highlight--two" d="M72 312 C184 132 370 125 474 244 C558 340 701 364 817 205" />
        <ellipse className="silicone-flow__end" cx="817" cy="205" rx="34" ry="20" transform="rotate(-34 817 205)" />
        <ellipse className="silicone-flow__hole" cx="817" cy="205" rx="18" ry="9" transform="rotate(-34 817 205)" />
      </svg>
    </div>
  )
}
