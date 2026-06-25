import { useMemo } from 'react'
import { CarouselWrapper, Section, Title } from '../styles'
import ProductCard from '../../../products/ProductCard'

const getCarouselSettings = items => ({
  dots: true,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  pauseOnHover: true,
  infinite: items > 4,
  slidesToShow: Math.min(items, 4),
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: Math.min(items, 3),
        infinite: items > 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(items, 2),
        infinite: items > 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        infinite: items > 2,
      },
    },
  ],
})

const CardCarouselITem = ({ title, items = [] }) => {
  const carouselSettings = useMemo(() => getCarouselSettings(items.length), [items.length])

  if (!items.length) return null

  return (
    <Section>
      {title && <Title>{title}</Title>}

      <CarouselWrapper {...carouselSettings}>
        {items.map(item => (
          <ProductCard product={item} />
        ))}
      </CarouselWrapper>
    </Section>
  )
}

export default CardCarouselITem
