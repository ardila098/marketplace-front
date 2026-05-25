import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardImage,
  CardOverlay,
  CardTitle,
  CarouselWrapper,
  Icon,
  IconBox,
  NextButton,
  Section,
  Title,
} from './styles'

const getCarouselSettings = (itemsLength) => ({
  dots: true,
  arrows: false,
  draggable: true,
  swipeToSlide: true,
  pauseOnHover: true,
  infinite: itemsLength > 4,
  slidesToShow: Math.min(itemsLength, 4),
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: Math.min(itemsLength, 3),
        infinite: itemsLength > 3,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: Math.min(itemsLength, 2),
        infinite: itemsLength > 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 2,
        infinite: itemsLength > 2,
      },
    },
  ],
})

const CardCarousel = ({ title, items = [], onItemClick }) => {
  const carouselSettings = useMemo(
    () => getCarouselSettings(items.length),
    [items.length]
  )

  if (!items.length) return null

  const handleItemClick = (item) => {
    onItemClick?.(item)
  }

  return (
    <Section>
      {title && <Title>{title}</Title>}

      <CarouselWrapper {...carouselSettings}>
        {items.map((item) => (
          <div key={item.id || item.title}>
            <Card onClick={() => handleItemClick(item)}>
              <CardImage src={item.image} alt={item.title || 'Imagen'} />

              {item.icon && (
                <IconBox>
                  <Icon src={item.icon} alt={item.title || 'Icono'} />
                </IconBox>
              )}

              <CardOverlay>
                <CardContent>
                  {item.title && <CardTitle>{item.title}</CardTitle>}

                  {item.description && (
                    <CardDescription>{item.description}</CardDescription>
                  )}
                </CardContent>

                <NextButton
                  type="button"
                  aria-label={`Ver ${item.title || 'detalle'}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    handleItemClick(item)
                  }}
                >
                  →
                </NextButton>
              </CardOverlay>
            </Card>
          </div>
        ))}
      </CarouselWrapper>
    </Section>
  )
}

export default CardCarousel