'use client'

import { useEffect } from 'react'

const selectors = [
  '.section-heading',
  '.offer-tile',
  '.product-card',
  '#specification .spec-table-wrap',
  '#specification .container-page > p',
  '.production-gallery figure',
  '.production-steps li',
  '.quality-grid li',
  '.quality-visual',
  '#industries .container-page > ul > li',
  '#contact form',
  '#contact aside',
].join(',')

export function MotionOrchestrator() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return

    const elements = Array.from(document.querySelectorAll<HTMLElement>(selectors))
    document.documentElement.classList.add('motion-ready')

    elements.forEach((element, index) => {
      element.classList.add('motion-reveal')
      element.style.setProperty('--motion-order', String(index % 4))
    })

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    elements.forEach((element) => observer.observe(element))
    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return null
}
