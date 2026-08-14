'use client'

import { useEffect, useState } from 'react'

export function HeroVideo() {
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(query.matches)
    const listener = (event: MediaQueryListEvent) => setReduceMotion(event.matches)
    query.addEventListener('change', listener)
    return () => query.removeEventListener('change', listener)
  }, [])

  if (reduceMotion) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src="/silvotech-transform-poster.jpg"
        alt="A soft silicone tube transforms into the SilvoTech wordmark"
        className="hero-soft__video"
      />
    )
  }

  return (
    <video
      className="hero-soft__video"
      autoPlay
      muted
      playsInline
      preload="auto"
      poster="/silvotech-transform-poster.jpg"
      aria-label="A soft silicone tube transforms into the SilvoTech wordmark"
    >
      <source src="/silvotech-transform.mp4" type="video/mp4" />
    </video>
  )
}
