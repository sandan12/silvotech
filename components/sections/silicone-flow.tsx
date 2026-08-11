export function SiliconeFlow() {
  return (
    <div className="silicone-flow liquid-glass-strong" aria-hidden="true">
      <svg viewBox="0 0 1400 520" className="silicone-flow__svg">
        <defs>
          <path id="hoseMainPath" d="M-160 334 C60 94 315 68 518 206 C686 320 724 451 930 392 C1110 340 1185 160 1560 88" />
          <path id="hoseSecondaryPath" d="M-192 392 C62 132 324 98 548 236 C720 342 766 470 955 420 C1142 370 1228 205 1538 152" />
          <linearGradient id="hoseGlass" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="14%" stopColor="rgba(255,255,255,0.82)" />
            <stop offset="31%" stopColor="rgba(201,230,247,0.34)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="70%" stopColor="rgba(255,255,255,0.7)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
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
          <filter id="liquidSpecular" x="-20%" y="-160%" width="140%" height="420%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="0.7" />
          </filter>
          <clipPath id="hoseClip">
            <use href="#hoseMainPath" strokeWidth="78" strokeLinecap="round" fill="none" />
          </clipPath>
        </defs>
        <use className="hose-aurora hose-aurora--a" href="#hoseMainPath" />
        <use className="hose-aurora hose-aurora--b" href="#hoseSecondaryPath" />
        <use className="hose-shadow" href="#hoseMainPath" />
        <use className="hose-body" href="#hoseMainPath" />
        <use className="hose-inner" href="#hoseMainPath" />
        <g clipPath="url(#hoseClip)">
          <circle className="hose-bubble hose-bubble--one" cx="105" cy="315" r="14" />
          <circle className="hose-bubble hose-bubble--two" cx="305" cy="166" r="9" />
          <circle className="hose-bubble hose-bubble--three" cx="680" cy="354" r="12" />
          <circle className="hose-bubble hose-bubble--four" cx="1034" cy="335" r="8" />
          <path className="hose-liquid-band hose-liquid-band--one" d="M-40 336 C164 120 343 116 514 226 C690 338 733 433 926 378 C1094 330 1166 188 1415 122" />
          <path className="hose-liquid-band hose-liquid-band--two" d="M30 316 C240 102 394 132 554 244 C728 366 792 414 960 372 C1125 330 1208 182 1510 116" />
        </g>
        <use className="hose-edge hose-edge--top" href="#hoseMainPath" />
        <use className="hose-edge hose-edge--bottom" href="#hoseSecondaryPath" />
        <use className="hose-warm" href="#hoseMainPath" />
        <use className="hose-glint hose-glint--one" href="#hoseMainPath" />
        <use className="hose-glint hose-glint--two" href="#hoseSecondaryPath" />
      </svg>
    </div>
  )
}
