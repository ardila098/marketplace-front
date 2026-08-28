import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { Col, Row } from 'antd'
import {
  Card,
  Circle,
  Container,
  EmptyImage,
  Header,
  ImageLayer,
  Name,
  Rail,
  Section,
  SideArrow,
  Subtitle,
  Title,
} from './style'

const getCategoryImage = category => {
  if (category?.image) {
    return getUploadUrl(UPLOAD_ROUTES.categories.icons, category.image)
  }

  if (category?.banner) {
    return getUploadUrl(UPLOAD_ROUTES.categories.banners, category.banner)
  }

  return getUploadUrl(UPLOAD_ROUTES.categories.icons, category?.icon)
}

const CategorySlider = ({ categories = [], title, subtitle, getPath, activeCategoryId }) => {
  const { translate } = useDictionaryTranslation()
  const railRef = useRef(null)

  const scrollBy = useCallback(direction => {
    const rail = railRef.current
    if (!rail) return

    rail.scrollBy({
      left: direction * Math.max(220, rail.clientWidth * 0.72),
      behavior: 'smooth',
    })
  }, [])

  useEffect(() => {
    if (categories.length < 4) return undefined

    const interval = window.setInterval(() => {
      const rail = railRef.current
      if (!rail) return

      const nearEnd = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 12

      if (nearEnd) {
        rail.scrollTo({ left: 0, behavior: 'smooth' })
        return
      }

      rail.scrollBy({ left: 178, behavior: 'smooth' })
    }, 4200)

    return () => window.clearInterval(interval)
  }, [categories.length])

  if (!categories.length) return null

  return (
    <Section>
      <Container>
        <Col md={6} xs={24}>
          <Header>
            <Row>
              <Title>{title || translate('catalog.categorySliderTitle')}</Title>
              {subtitle && <Subtitle>{subtitle}</Subtitle>}
            </Row>
          </Header>
        </Col>

        <Col md={18} xs={24}>
          <Rail ref={railRef}>
            {categories.map(category => {
              const image = getCategoryImage(category)
              const path = getPath?.(category) || '#'

              return (
                <Card key={category._id || category.slug || category.name} to={path}>
                  <Circle $active={String(activeCategoryId || '') === String(category._id)}>
                    <ImageLayer $image={image} />
                    {!image && (
                      <EmptyImage>
                        <ImageIcon size={30} />
                      </EmptyImage>
                    )}
                  </Circle>
                  <Name>{category.name}</Name>
                </Card>
              )
            })}
          </Rail>
          <SideArrow $side="left" type="button" aria-label="Anterior" onClick={() => scrollBy(-1)}>
            <ChevronLeft size={18} />
          </SideArrow>
          <SideArrow $side="right" type="button" aria-label="Siguiente" onClick={() => scrollBy(1)}>
            <ChevronRight size={18} />
          </SideArrow>{' '}
        </Col>
      </Container>
    </Section>
  )
}

export default CategorySlider
