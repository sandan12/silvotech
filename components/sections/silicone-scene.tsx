'use client'

import { useEffect, useRef } from 'react'

const SILVOTECH_PATH = `M 70 270
C 45 150 95 75 180 80
C 245 84 260 130 230 165
C 200 200 120 175 95 220
C 68 270 100 330 160 335
C 215 340 255 305 270 265
C 280 255 290 235 292 210
C 294 185 300 180 307 184
C 316 190 312 202 303 204
C 294 205 290 196 294 188
C 294 215 286 264 293 289
C 300 313 320 311 336 287
C 350 270 365 225 370 165
C 375 105 390 78 405 90
C 424 105 410 170 388 220
C 370 260 365 298 385 307
C 402 314 418 299 430 280
C 440 260 443 230 450 216
C 455 205 468 205 471 218
C 474 232 469 274 483 294
C 496 313 516 306 527 282
C 538 258 541 228 548 213
C 568 195 603 202 614 228
C 625 254 614 289 588 302
C 563 315 536 301 536 274
C 536 248 556 227 580 224
C 602 222 621 237 634 251
C 650 251 662 246 670 235
C 681 219 683 191 686 165
C 689 126 692 96 708 86
C 724 76 737 90 731 108
C 724 128 702 140 680 135
C 662 131 660 116 677 111
C 714 101 760 105 797 91
C 813 85 824 94 813 106
C 795 126 757 125 728 123
C 728 165 710 230 714 274
C 717 307 742 315 762 288
C 775 268 783 238 803 224
C 822 211 844 218 845 237
C 846 256 825 267 796 263
C 797 289 818 305 842 299
C 859 294 870 282 880 268
C 896 238 924 220 951 230
C 967 236 971 250 963 259
C 947 244 922 245 913 263
C 901 287 920 306 944 304
C 963 303 978 290 989 273
C 1002 251 1010 208 1015 158
C 1020 105 1033 78 1048 89
C 1066 102 1052 165 1032 216
C 1018 252 1014 294 1030 304
C 1044 313 1053 281 1064 254
C 1076 225 1097 215 1112 230
C 1128 246 1114 278 1124 296
C 1135 315 1158 306 1180 282`

export function SiliconeScene() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (reducedMotion.matches) return

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 }
    let frame = 0

    const move = (event: PointerEvent) => {
      pointer.targetX = (event.clientX / window.innerWidth - 0.5) * 16
      pointer.targetY = (event.clientY / window.innerHeight - 0.5) * 10
    }

    const animate = () => {
      pointer.x += (pointer.targetX - pointer.x) * 0.055
      pointer.y += (pointer.targetY - pointer.y) * 0.055
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
      <svg
        className="silicone-word-scene__svg"
        viewBox="0 0 1240 420"
        preserveAspectRatio="xMidYMid meet"
        role="presentation"
      >
        <defs>
          <linearGradient id="silicone-body" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#6f93b4" />
            <stop offset="0.18" stopColor="#d8e8f1" />
            <stop offset="0.48" stopColor="#91b3cf" />
            <stop offset="0.72" stopColor="#eef7fb" />
            <stop offset="1" stopColor="#7398b8" />
          </linearGradient>
          <linearGradient id="silicone-core" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f8fdff" stopOpacity="0.96" />
            <stop offset="0.42" stopColor="#bfd5e4" stopOpacity="0.88" />
            <stop offset="1" stopColor="#557b9d" stopOpacity="0.9" />
          </linearGradient>
          <filter id="silicone-depth" x="-25%" y="-35%" width="150%" height="170%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="7" result="blur" />
            <feOffset in="blur" dx="0" dy="9" result="offset" />
            <feColorMatrix
              in="offset"
              type="matrix"
              values="0 0 0 0 0.015 0 0 0 0 0.065 0 0 0 0 0.12 0 0 0 .52 0"
              result="shadow"
            />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="silicone-tip-glow" x="-180%" y="-180%" width="460%" height="460%">
            <feGaussianBlur stdDeviation="7" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        <g className="silicone-word-scene__word" filter="url(#silicone-depth)">
          <path className="silicone-word-path silicone-word-path--shadow" d={SILVOTECH_PATH} />
          <path className="silicone-word-path silicone-word-path--body" d={SILVOTECH_PATH} />
          <path className="silicone-word-path silicone-word-path--core" d={SILVOTECH_PATH} />
          <path className="silicone-word-path silicone-word-path--highlight" d={SILVOTECH_PATH} />
          <path className="silicone-word-flow" d={SILVOTECH_PATH} />
        </g>

        <circle className="silicone-word-tip" r="11" filter="url(#silicone-tip-glow)">
          <animateMotion path={SILVOTECH_PATH} dur="4.85s" begin="0.32s" fill="freeze" />
          <animate
            attributeName="opacity"
            values="0;1;1;0"
            keyTimes="0;0.07;0.88;1"
            dur="4.85s"
            begin="0.32s"
            fill="freeze"
          />
        </circle>
      </svg>
    </div>
  )
}
