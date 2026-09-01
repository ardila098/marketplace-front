import { useState } from 'react'
import { SLIDER_VARIANTS } from '../../../../constants/landingSections'


const getShapeClass = variant => {
  if (variant === SLIDER_VARIANTS.ROUNDED.value) return 'slider-section--rounded'
  if (variant === SLIDER_VARIANTS.IMAGES.value) return 'slider-section--images'

  return 'slider-section--cards'
}

const SliderSection = ({ section }) => {
  const { data = {}, variant } = section
  const { title, items = [] } = data
  const [activeIndex, setActiveIndex] = useState(0)

  if (!items.length) return null

  const goTo = index => {
    const total = items.length
    setActiveIndex(((index % total) + total) % total)
  }

  const activeItem = items[activeIndex]

  return (
    <section className={`slider-section ${getShapeClass(variant)}`}>
      {title && <h2>{title}</h2>}

      <div className="slider-section__viewport">
        <button type="button" onClick={() => goTo(activeIndex - 1)} aria-label="Anterior">
          ‹
        </button>

        <div className="slider-section__item">
          {activeItem.image && <img src={activeItem.image} alt={activeItem.title || ''} />}
          {activeItem.title && <h3>{activeItem.title}</h3>}
          {activeItem.description && <p>{activeItem.description}</p>}
        </div>

        <button type="button" onClick={() => goTo(activeIndex + 1)} aria-label="Siguiente">
          ›
        </button>
      </div>

      <div className="slider-section__dots">
        {items.map((item, index) => (
          <button
            key={item.key || index}
            type="button"
            className={index === activeIndex ? 'is-active' : ''}
            onClick={() => goTo(index)}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

export default SliderSection
