import { useCallback, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, ImageIcon } from 'lucide-react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { getUploadUrl, UPLOAD_ROUTES } from '../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../hooks/useDictionaryTranslation'

const Section = styled.section`
  width: 100%;
  position: relative;
`

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
`

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: 28px;
  font-weight: 650;
  line-height: 1.2;
  margin: 0;
`

const Subtitle = styled.p`
  color: ${({ theme }) => theme.mutedTextColor || '#6b7280'};
  font-size: 14px;
  line-height: 1.5;
  margin: 6px 0 0;
`

const ArrowButton = styled.button`
  width: 34px;
  height: 34px;
  border: 1px solid rgba(17, 24, 39, 0.1);
  border-radius: 999px;
  background: #ffffff;
  color: ${({ theme }) => theme.textColor || '#111827'};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: ${({ theme }) => theme.primaryColor || '#111111'};
    transform: translateY(-1px);
  }
`

const SideArrow = styled(ArrowButton)`
  position: absolute;
  top: 58%;
  ${({ $side }) => ($side === 'left' ? 'left: -12px;' : 'right: -12px;')}
  z-index: 3;
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.1);

  @media (max-width: 576px) {
    display: none;
  }
`

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 160px;
  gap: 18px;
  overflow-x: auto;
  padding: 2px 4px 10px;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 576px) {
    grid-auto-columns: 136px;
    gap: 14px;
  }
`

const Card = styled(Link)`
  color: inherit;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  text-align: center;
  scroll-snap-align: start;

  &:hover {
    color: inherit;
  }
`

const Circle = styled.div`
  width: 148px;
  aspect-ratio: 1;
  border-radius: 999px;
  overflow: hidden;
  position: relative;
  isolation: isolate;
  background: #f4f5f7;
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.primaryColor || '#111111' : '#ffffff')};
  box-shadow: 0 10px 26px rgba(17, 24, 39, 0.08);

  @media (max-width: 576px) {
    width: 126px;
  }
`

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(17, 24, 39, 0.02), rgba(17, 24, 39, 0.2)),
    ${({ $image }) =>
      $image ? `url(${$image}) center/cover` : 'linear-gradient(135deg, #f6f7f9, #dfe4ea)'};
  transition: transform 0.32s ease;

  ${Card}:hover & {
    transform: scale(1.045);
  }
`

const EmptyImage = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #9ca3af;
  z-index: 1;
`

const Name = styled.h3`
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: 14px;
  font-weight: 560;
  line-height: 1.25;
  margin: 0;
  max-width: 148px;
`

const getCategoryImage = category => {
  if (category?.image) {
    return getUploadUrl(UPLOAD_ROUTES.categories.legacy, category.image)
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
      <Header>
        <div>
          <Title>{title || translate('catalog.categorySliderTitle')}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
      </Header>

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
      </SideArrow>
    </Section>
  )
}

export default CategorySlider
