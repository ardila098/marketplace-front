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

const CardCarousel = ({ title, items = [], onItemClick }) => {
  if (!items.length) return null

  return (
    <Section>
      {title && <Title>{title}</Title>}

      <CarouselWrapper
        dots
        infinite={items.length > 4}
        slidesToShow={4}
        slidesToScroll={1}
        responsive={[
          {
            breakpoint: 1200,
            settings: { slidesToShow: 3 },
          },
          {
            breakpoint: 768,
            settings: { slidesToShow: 2 },
          },
          {
            breakpoint: 576,
            settings: { slidesToShow: 1 },
          },
        ]}
      >
        {items.map((item) => (
          <Card key={item.id} onClick={() => onItemClick?.(item)}>
            <CardImage src={item.image} alt={item.title} />

            {item.icon && (
              <IconBox>
                <Icon src={item.icon} alt={item.title} />
              </IconBox>
            )}

            <CardOverlay>
              <CardContent>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription>{item.description}</CardDescription>
              </CardContent>

              <NextButton type="button">→</NextButton>
            </CardOverlay>
          </Card>
        ))}
      </CarouselWrapper>
    </Section>
  )
}

export default CardCarousel