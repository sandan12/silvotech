'use client'

import { useEffect, useRef } from 'react'

const LEAD_PATH = `M 78 302
C 42 244 70 154 148 151
C 214 148 236 205 192 242
C 154 274 116 260 118 304
C 120 348 180 360 236 303`

export function SiliconeScene() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let frame = 0
    const move = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 8
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 5
    }
    const animate = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.045
      pointer.y += (pointer.targetY - pointer.y) * 0.045
      element.style.setProperty('--silicone-x', `${pointer.x.toFixed(2)}px`)
      element.style.setProperty('--silicone-y', `${pointer.y.toFixed(2)}px`)
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('pointermove', move, { passive: true })
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', move)
    }
  }, [])

  return (
    <div ref={ref} className="silicone-word-scene" aria-hidden="true">
      <svg className="silicone-word-scene__svg" viewBox="0 0 1200 440" preserveAspectRatio="xMidYMid meet" role="presentation">
        <defs>
          <linearGradient id="hose-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#8eafc0" stopOpacity="0.55" />
            <stop offset="0.2" stopColor="#ffffff" stopOpacity="0.92" />
            <stop offset="0.46" stopColor="#b9d4e0" stopOpacity="0.64" />
            <stop offset="0.72" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="1" stopColor="#86aabd" stopOpacity="0.58" />
          </linearGradient>
          <linearGradient id="hose-core" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="0.5" stopColor="#d9ebf2" stopOpacity="0.56" />
            <stop offset="1" stopColor="#79a0b5" stopOpacity="0.62" />
          </linearGradient>
          <filter id="hose-shadow" x="-20%" y="-40%" width="140%" height="190%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
            <feOffset in="blur" dx="0" dy="10" result="offset" />
            <feColorMatrix in="offset" type="matrix" values="0 0 0 0 0.01 0 0 0 0 0.08 0 0 0 0 0.14 0 0 0 .42 0" result="shadow" />
            <feMerge><feMergeNode in="shadow" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="hose-tip-glow" x="-140%" y="-140%" width="380%" height="380%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <path className="silicone-hose-lead" d={LEAD_PATH} pathLength="1" />

        <g className="silicone-word-scene__word" filter="url(#hose-shadow)">
          <text x="600" y="275" textAnchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs" className="silicone-word-path silicone-word-path--shadow">SilvoTech</text>
          <text x="600" y="275" textAnchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs" className="silicone-word-path silicone-word-path--body">SilvoTech</text>
          <text x="600" y="275" textAnchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs" className="silicone-word-path silicone-word-path--core">SilvoTech</text>
          <text x="600" y="275" textAnchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs" className="silicone-word-path silicone-word-path--highlight">SilvoTech</text>
          <text x="600" y="275" textAnchor="middle" textLength="820" lengthAdjust="spacingAndGlyphs" className="silicone-word-flow">SilvoTech</text>
        </g>

        <g className="silicone-hose-tip" filter="url(#hose-tip-glow)">
          <circle className="silicone-hose-tip__shadow" r="17" />
          <circle className="silicone-hose-tip__rim" r="12" />
          <circle className="silicone-hose-tip__opening" r="6" />
          <animateMotion path={LEAD_PATH} dur="0.75s" begin="0s" fill="freeze" />
          <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.05;0.75;1" dur="1.15s" begin="0s" fill="freeze" />
        </g>
      </svg>
    </div>
  )
}
