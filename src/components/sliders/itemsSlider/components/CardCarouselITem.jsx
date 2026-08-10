import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { CarouselItem, CarouselWrapper, ItemsGrid, Section, Title } from '../styles'
import ProductCard from '../../../products/ProductCard'

const getCarouselSettings = items => ({
  dots: items > 4,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  pauseOnHover: true,
  infinite: items > 4,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 3,
        infinite: items > 3,
        dots: items > 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        infinite: items > 2,
        dots: items > 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        infinite: items > 2,
        dots: items > 2,
      },
    },
  ],
})

const CardCarouselITem = ({ title, items = [], storeSlug, getProductPath }) => {
  const carouselSettings = useMemo(() => getCarouselSettings(items.length), [items.length])

  if (!items.length) return null

  const renderCard = item => (
    <CarouselItem key={item._id || item.id || item.slug}>
      <ProductCard
        product={item}
        storeSlug={storeSlug}
        detailPath={getProductPath?.(item)}
      />
    </CarouselItem>
  )

  return (
    <Section>
      {title && <Title>{title}</Title>}

      {items.length <= 4 ? (
        <ItemsGrid>{items.map(renderCard)}</ItemsGrid>
      ) : (
        <CarouselWrapper {...carouselSettings}>
          {items.map(renderCard)}
        </CarouselWrapper>
      )}
    </Section>
  )
}

export default CardCarouselITem

CardCarouselITem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  storeSlug: PropTypes.string,
  getProductPath: PropTypes.func,
}
