import { HERO_VARIANTS } from "../../../../constants/landingSections"

const HeroSection = ({ section, onCtaClick }) => {
  const { data = {}, variant } = section
  const { title, subtitle, image, ctaText } = data

  if (variant === HERO_VARIANTS.SPLIT.value) {
    return (
      <section className="hero-section hero-section--split">
        <div className="hero-section__text">
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
          {ctaText && (
            <button type="button" onClick={onCtaClick}>
              {ctaText}
            </button>
          )}
        </div>
        {image && <img className="hero-section__image" src={image} alt={title || ''} />}
      </section>
    )
  }

  if (variant === HERO_VARIANTS.CENTERED.value) {
    return (
      <section className="hero-section hero-section--centered">
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
        {ctaText && (
          <button type="button" onClick={onCtaClick}>
            {ctaText}
          </button>
        )}
      </section>
    )
  }

  // FULL (por defecto)
  return (
    <section
      className="hero-section hero-section--full"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <div className="hero-section__overlay">
        {title && <h1>{title}</h1>}
        {subtitle && <p>{subtitle}</p>}
        {ctaText && (
          <button type="button" onClick={onCtaClick}>
            {ctaText}
          </button>
        )}
      </div>
    </section>
  )
}

export default HeroSection
