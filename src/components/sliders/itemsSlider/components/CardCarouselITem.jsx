import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { CarouselItem, CarouselWrapper, Section, Title } from '../styles'
import ProductCard from '../../../products/ProductCard'

const getCarouselSettings = (items, autoplaySeconds) => ({
  dots: items > 2,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  pauseOnHover: true,
  autoplay: items > 1,
  autoplaySpeed: Math.max(Number(autoplaySeconds) || 5, 2) * 1000,
  infinite: items > 4,
  slidesToShow: Math.min(items, 4),
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: Math.min(items, 3),
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
        slidesToShow: Math.min(items, 2),
        infinite: items > 2,
        dots: items > 2,
      },
    },
  ],
})

const CardCarouselITem = ({
  autoplaySeconds = 5,
  cardStyle = 'classic',
  getProductPath,
  items = [],
  storeSlug,
  title,
}) => {
  const carouselSettings = useMemo(
    () => getCarouselSettings(items.length, autoplaySeconds),
    [autoplaySeconds, items.length]
  )

  if (!items.length) return null

  const renderCard = item => (
    <CarouselItem key={item._id || item.id || item.slug}>
      <ProductCard
        product={item}
        storeSlug={storeSlug}
        detailPath={getProductPath?.(item)}
        cardStyle={cardStyle}
      />
    </CarouselItem>
  )

  return (
    <Section>
      {title && <Title>{title}</Title>}

      <CarouselWrapper {...carouselSettings}>
        {items.map(renderCard)}
      </CarouselWrapper>
    </Section>
  )
}

export default CardCarouselITem

CardCarouselITem.propTypes = {
  title: PropTypes.string,
  items: PropTypes.array,
  autoplaySeconds: PropTypes.number,
  storeSlug: PropTypes.string,
  getProductPath: PropTypes.func,
  cardStyle: PropTypes.string,
}
