import Image from 'next/image'

/**
 * Hero visual for SilvoTech.
 *
 * The previous version drew the word "SilvoTech" as an animated SVG stroke.
 * A stroke has no cross-section and no refraction, so translucent silicone can
 * never read correctly that way: it always ends up looking like neon or like an
 * outlined font. This version uses the real factory photograph that already
 * ships in /public, with a small product detail inset.
 *
 * The file name and the exported name are unchanged on purpose, so
 * components/sections/hero.tsx does not need to be edited.
 */
export function SiliconeScene() {
  return (
    <figure className="hero-visual" aria-hidden="true">
      <div className="hero-visual__frame">
        <Image
          src="/production-line-user.png"
          alt=""
          width={1600}
          height={1200}
          priority
          sizes="(max-width: 899px) 92vw, 46vw"
          className="hero-visual__image"
        />
        <span className="hero-visual__sheen" />
      </div>

      <div className="hero-visual__inset">
        <Image
          src="/clear-hose-detail-new.png"
          alt=""
          width={640}
          height={640}
          sizes="200px"
          className="hero-visual__inset-image"
        />
      </div>

      <figcaption className="hero-visual__caption">
        <span className="hero-visual__dot" />
        Warszawa, PL
      </figcaption>
    </figure>
  )
}

export default SiliconeScene
