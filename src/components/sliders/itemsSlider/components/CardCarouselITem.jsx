import { useEffect, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { CarouselItem, CarouselWrapper, Section, Title } from '../styles'
import ProductCard from '../../../products/ProductCard'

const getVisibleSlides = width => {
  if (width <= 768) return 2
  if (width <= 1200) return 3

  return 4
}

const getCarouselSettings = (items, autoplaySeconds, visibleSlides) => ({
  dots: items > visibleSlides,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  pauseOnHover: true,
  autoplay: items > 1,
  autoplaySpeed: Math.max(Number(autoplaySeconds) || 5, 2) * 1000,
  infinite: items > visibleSlides,
  slidesToShow: Math.min(items, visibleSlides),
  slidesToScroll: 1,
})

const CardCarouselITem = ({
  autoplaySeconds = 5,
  cardStyle = 'classic',
  getProductPath,
  items = [],
  storeSlug,
  title,
}) => {
  const [visibleSlides, setVisibleSlides] = useState(() =>
    getVisibleSlides(typeof window === 'undefined' ? 1440 : window.innerWidth)
  )

  useEffect(() => {
    const handleResize = () => setVisibleSlides(getVisibleSlides(window.innerWidth))

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const carouselSettings = useMemo(
    () => getCarouselSettings(items.length, autoplaySeconds, visibleSlides),
    [autoplaySeconds, items.length, visibleSlides]
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
