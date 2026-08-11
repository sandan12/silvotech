export function SiliconeFlow() {
  return (
    <div className="silicone-flow" aria-hidden="true">
      <svg viewBox="0 0 1200 640" className="silicone-flow__svg">
        <defs>
          <linearGradient id="siliconeBody" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="18%" stopColor="rgba(255,255,255,0.94)" />
            <stop offset="36%" stopColor="rgba(219,238,247,0.68)" />
            <stop offset="52%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="72%" stopColor="rgba(255,255,255,0.88)" />
            <stop offset="100%" stopColor="rgba(189,214,228,0.22)" />
          </linearGradient>
          <linearGradient id="siliconeInner" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="42%" stopColor="rgba(255,255,255,0.58)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.18)" />
          </linearGradient>
          <linearGradient id="warmRefraction" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(226,118,46,0)" />
            <stop offset="44%" stopColor="rgba(226,118,46,0.28)" />
            <stop offset="58%" stopColor="rgba(255,255,255,0.76)" />
            <stop offset="100%" stopColor="rgba(226,118,46,0)" />
          </linearGradient>
          <filter id="liquidBlur" x="-10%" y="-45%" width="120%" height="190%">
            <feGaussianBlur stdDeviation="1.15" />
          </filter>
          <filter id="softShadow" x="-18%" y="-60%" width="136%" height="220%">
            <feGaussianBlur stdDeviation="18" />
          </filter>
        </defs>
        <path className="silicone-flow__ambient" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__shadow" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__tube" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__inner" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__warm" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__glint silicone-flow__glint--a" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
        <path className="silicone-flow__glint silicone-flow__glint--b" d="M-80 422 C130 85 395 110 565 312 C700 472 920 455 1280 115" />
      </svg>
    </div>
  )
}
