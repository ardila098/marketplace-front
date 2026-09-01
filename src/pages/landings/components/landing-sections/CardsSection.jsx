import { CARDS_VARIANTS } from "../../../../constants/landingSections"

const getLayoutClass = variant => {
  if (variant === CARDS_VARIANTS.HORIZONTAL.value) return 'cards-section--horizontal'
  if (variant === CARDS_VARIANTS.MINIMAL.value) return 'cards-section--minimal'

  return 'cards-section--grid'
}

const CardsSection = ({ section }) => {
  const { data = {}, variant } = section
  const { title, subtitle, items = [] } = data

  return (
    <section className={`cards-section ${getLayoutClass(variant)}`}>
      {title && <h2>{title}</h2>}
      {subtitle && <p className="cards-section__subtitle">{subtitle}</p>}

      <div className="cards-section__list">
        {items.map((item, index) => (
          <div className="cards-section__item" key={item.key || index}>
            {item.image && <img src={item.image} alt={item.title || ''} />}
            {item.title && <h3>{item.title}</h3>}
            {item.description && <p>{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

export default CardsSection
