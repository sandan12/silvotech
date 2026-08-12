'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Play } from 'lucide-react'

import type { Dictionary } from '@/lib/i18n/get-dictionary'

// Scroll-driven frame sequence: as the visitor scrolls the homepage, the hero
// visual advances through pre-rendered frames extracted from the source video
// (public/hero-frames/frame-001.jpg ... frame-060.jpg), instead of just playing
// the clip on a timer. On mobile or when the visitor prefers reduced motion,
// we simply keep the original autoplaying video.
const FRAME_COUNT = 60
const FRAME_SCROLL_RANGE = 1000 // px of scrolling needed to play through all frames
const frameSrc = (i: number) => `/hero-frames/frame-${String(i).padStart(3, '0')}.jpg`

export function Hero({ dict }: { dict: Dictionary }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const startScrollRef = useRef<number | null>(null)
  const currentIndexRef = useRef(0)
  const [scrubReady, setScrubReady] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const wideEnough = window.matchMedia('(min-width: 901px)').matches
    if (reduceMotion || !wideEnough) return

    let cancelled = false
    const images: (HTMLImageElement | null)[] = new Array(FRAME_COUNT).fill(null)

    function drawFrame(index: number) {
      const canvas = canvasRef.current
      const img = images[index]
      if (!canvas || !img) return
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const w = Math.max(1, Math.round(rect.width * dpr))
      const h = Math.max(1, Math.round(rect.height * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
      }
      const canvasRatio = rect.width / rect.height
      const imgRatio = img.naturalWidth / img.naturalHeight
      let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight
      if (imgRatio > canvasRatio) {
        sw = img.naturalHeight * canvasRatio
        sx = (img.naturalWidth - sw) / 2
      } else {
        sh = img.naturalWidth / canvasRatio
        sy = (img.naturalHeight - sh) / 2
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height)
    }

    function closestLoaded(target: number) {
      for (let i = target; i >= 0; i--) if (images[i]) return i
      for (let i = target; i < FRAME_COUNT; i++) if (images[i]) return i
      return null
    }

    let ticking = false
    function onScroll() {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        ticking = false
        if (startScrollRef.current === null) return
        const delta = window.scrollY - startScrollRef.current
        const progress = Math.min(1, Math.max(0, delta / FRAME_SCROLL_RANGE))
        const target = Math.round(progress * (FRAME_COUNT - 1))
        if (target !== currentIndexRef.current) {
          const loaded = closestLoaded(target)
          if (loaded !== null) {
            currentIndexRef.current = target
            drawFrame(loaded)
          }
        }
      })
    }

    function loadFrame(i: number) {
      return new Promise<void>((resolve) => {
        const img = new Image()
        img.decoding = 'async'
        img.onload = () => { images[i] = img; resolve() }
        img.onerror = () => resolve()
        img.src = frameSrc(i + 1)
      })
    }

    async function run() {
      startScrollRef.current = window.scrollY

      await loadFrame(0)
      if (cancelled) return

      drawFrame(0)
      setScrubReady(true)
      videoRef.current?.pause()

      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onScroll)
      onScroll()

      for (let i = 1; i < FRAME_COUNT; i++) {
        if (cancelled) return
        await loadFrame(i)
      }
    }

    run()

    return () => {
      cancelled = true
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <section className="hero-device hero-soft relative isolate overflow-hidden bg-background">
      <div aria-hidden="true" className="hero-soft__glow" />
      <div aria-hidden="true" className="hero-soft__grain" />

      <div className="container-page relative z-10 flex min-h-[calc(100svh-5.5rem)] flex-col justify-center py-10 md:py-14 lg:min-h-[calc(100svh-6rem)]">
        <div className="hero-soft__grid">
          <div className="hero-soft__copy">
            <h1 className="font-display text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-balance text-primary sm:text-5xl lg:text-[4.8rem]">
              {dict.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
              {dict.hero.lead}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="hero-soft__button hero-soft__button--primary">
                {dict.hero.primaryCta}<ArrowRight className="size-4" aria-hidden="true" />
              </a>
              <a href="#products" className="hero-soft__button hero-soft__button--secondary">
                {dict.hero.secondaryCta}
              </a>
            </div>
          </div>

          <div className="hero-soft__visual" aria-label="Silicone hose transformation animation">
            <div className="hero-soft__videoShell">
              <video
                ref={videoRef}
                className="hero-soft__video"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster="/silvotech-transform-poster.jpg"
                aria-label="A soft silicone tube transforms into the SilvoTech wordmark"
                style={scrubReady ? { opacity: 0 } : undefined}
              >
                <source src="/silvotech-transform.mp4" type="video/mp4" />
              </video>
              <canvas
                ref={canvasRef}
                className="hero-soft__video hero-soft__canvas"
                aria-hidden="true"
                style={{ opacity: scrubReady ? 1 : 0 }}
              />
              <div className="hero-soft__videoMeta" aria-hidden="true">
                <span><Play className="size-3 fill-current" /> silicone in motion</span>
                <span>01 / 01</span>
              </div>
            </div>
          </div>
        </div>

        <dl className="hero-soft__facts">
          {dict.hero.facts.map((fact) => (
            <div key={fact.label} className="hero-soft__fact">
              <dt>{fact.label}</dt>
              <dd>{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
