import Image from 'next/image'

/**
 * Hero visual for SilvoTech.
 *
 * Adapted from the reference dark-glassmorphism hero, inverted to a light
 * industrial palette and rebuilt around the company's own photographs.
 * No background video, no HLS stream and no extra dependencies: the moving
 * backdrop is replaced by the real extrusion-line photograph, which is both
 * lighter to load and actually shows the factory.
 *
 * The file name and the exported name are unchanged so that
 * components/sections/hero.tsx does not need to be edited.
 */
export function SiliconeScene() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <figure className="hero-stage__main liquid-glass-light">
        <Image
          src="/silvotech-hose-clear-coil.jpg"
          alt=""
          width={1200}
          height={1200}
          priority
          sizes="(max-width: 899px) 88vw, 40vw"
          className="hero-stage__image"
        />
        <figcaption className="hero-stage__badge glass-pill-light">
          <span className="hero-stage__dot" />
          Food grade silicone
        </figcaption>
      </figure>

      <div className="hero-stage__thumbs">
        <figure className="hero-stage__thumb liquid-glass-light">
          <Image
            src="/silvotech-hose-clear-roll.jpg"
            alt=""
            width={600}
            height={600}
            sizes="180px"
            className="hero-stage__image"
          />
        </figure>
        <figure className="hero-stage__thumb liquid-glass-light">
          <Image
            src="/silvotech-hose-black.jpg"
            alt=""
            width={600}
            height={600}
            sizes="180px"
            className="hero-stage__image"
          />
        </figure>
      </div>

      <p className="hero-stage__spec glass-pill-light">
        <span>2/4 &ndash; 20/24 mm</span>
        <span className="hero-stage__sep" />
        <span>&minus;50 &hellip; +230 &deg;C</span>
      </p>
    </div>
  )
}

export default SiliconeScene
