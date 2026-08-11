export function SiliconeFlow() {
  return (
    <div className="silicone-flow liquid-glass-strong" aria-hidden="true">
      <svg viewBox="0 0 1400 520" className="silicone-flow__svg">
        <defs>
          <linearGradient id="hoseGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.02)" />
            <stop offset="16%" stopColor="rgba(255,255,255,0.78)" />
            <stop offset="34%" stopColor="rgba(210,231,244,0.22)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.06)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.58)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.04)" />
          </linearGradient>
          <linearGradient id="hoseEdge" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
            <stop offset="48%" stopColor="rgba(255,255,255,0.92)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <linearGradient id="hoseWarm" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(226,118,46,0)" />
            <stop offset="42%" stopColor="rgba(226,118,46,0.18)" />
            <stop offset="55%" stopColor="rgba(255,255,255,0.55)" />
            <stop offset="100%" stopColor="rgba(226,118,46,0)" />
          </linearGradient>
          <filter id="glassSoft" x="-12%" y="-90%" width="124%" height="280%">
            <feGaussianBlur stdDeviation="1.8" />
          </filter>
          <filter id="glassShadow" x="-15%" y="-140%" width="130%" height="380%">
            <feGaussianBlur stdDeviation="24" />
          </filter>
        </defs>
        <path className="hose-aurora hose-aurora--a" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-aurora hose-aurora--b" d="M-180 392 C90 92 430 126 650 305 C875 490 1128 360 1525 148" />
        <path className="hose-shadow" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-body" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-inner" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-edge hose-edge--top" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-edge hose-edge--bottom" d="M-180 392 C90 92 430 126 650 305 C875 490 1128 360 1525 148" />
        <path className="hose-warm" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-glint hose-glint--one" d="M-140 330 C115 40 420 116 615 286 C820 465 1090 342 1540 82" />
        <path className="hose-glint hose-glint--two" d="M-180 392 C90 92 430 126 650 305 C875 490 1128 360 1525 148" />
      </svg>
    </div>
  )
}
