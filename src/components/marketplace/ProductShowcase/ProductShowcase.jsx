import { Button } from 'antd'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BadgePercent,
  Store,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { Link } from 'react-router-dom'
import styled, { css, keyframes } from 'styled-components'

import { buildRoute, ROUTES } from '../../../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { currency } from '../../../utils/formatters'

const AUTO_PLAY_MS = 6500
const CROSSFADE_MS = 720

const DEFAULT_BACKGROUND = {
  type: 'color',
  color: '#f6f1ea',
  image: '',
  position: 'center',
  overlayEnabled: false,
  overlayOpacity: 0.35,
}

const stageIn = keyframes`
  from {
    opacity: 0;
    transform: scale(1.05);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`

const stageOut = keyframes`
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.985);
  }
`

const copyIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`

const Shell = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ $backgroundColor }) => $backgroundColor || '#f6f1ea'};
  color: ${({ $darkText }) => ($darkText ? '#17130f' : '#ffffff')};

  @media (max-width: 860px) {
    min-height: auto;
  }
`

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: ${({ $image }) => `url(${$image})`};
  background-position: ${({ $position }) => $position || 'center'};
  background-size: cover;
  transform: scale(1.03);
`

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: ${({ $opacity }) =>
    `linear-gradient(100deg, rgba(9,12,16,${$opacity}), rgba(9,12,16,${
      Number($opacity) * 0.62
    }))`};
`

const Halo = styled.span`
  position: absolute;
  width: min(72vw, 820px);
  aspect-ratio: 1;
  border-radius: 50%;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.52) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  filter: blur(46px);
  pointer-events: none;
`

const Inner = styled.div`
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  padding: 112px max(24px, calc((100vw - 1320px) / 2)) 112px;
  display: grid;
  grid-template-columns: ${({ $empty }) =>
    $empty ? 'minmax(0, 1fr)' : 'minmax(0, 1fr) minmax(0, 1.05fr)'};
  grid-template-areas: ${({ $empty }) => ($empty ? "'copy'" : "'copy visual'")};
  align-items: center;
  gap: clamp(24px, 5vw, 84px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
    grid-template-areas: ${({ $empty }) =>
      $empty ? "'copy'" : "'visual' 'copy'"};
    gap: 20px;
    padding: 96px 20px 96px;
  }
`

const Copy = styled.div`
  grid-area: copy;
  max-width: 620px;
  animation: ${copyIn} 0.55s cubic-bezier(0.22, 0.61, 0.36, 1) both;

  @media (max-width: 860px) {
    justify-self: center;
    text-align: center;
  }
`

const Eyebrow = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 11px;
  font-weight: 800;
  color: ${({ $darkText }) => ($darkText ? '#8a5a36' : '#e8ddcf')};

  &::before {
    content: '';
    width: 34px;
    height: 2px;
    border-radius: 999px;
    background: currentColor;
  }
`

const Title = styled.h1`
  margin: 14px 0 12px;
  font-size: clamp(38px, 4.6vw, 68px);
  line-height: 1;
  letter-spacing: -0.045em;
  font-weight: 800;
  color: inherit;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 860px) {
    font-size: 36px;
  }
`

const Description = styled.p`
  margin: 0 0 20px;
  max-width: 540px;
  color: inherit;
  opacity: 0.82;
  font-size: 16px;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: 860px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 11px;
  margin-bottom: 24px;

  @media (max-width: 860px) {
    justify-content: center;
  }
`

const Price = styled.span`
  font-size: 31px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: inherit;
`

const ComparePrice = styled.span`
  color: inherit;
  opacity: 0.58;
  font-size: 18px;
  text-decoration: line-through;
`

const DiscountBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #17130f;
  color: #ffffff;
  font-size: 12px;
  font-weight: 800;
`

const Meta = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;

  @media (max-width: 860px) {
    justify-content: center;
  }
`

const MetaChip = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 11px;
  border-radius: 999px;
  border: 1px solid currentColor;
  opacity: 0.74;
  font-size: 12px;
  font-weight: 650;
`

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;

  @media (max-width: 860px) {
    justify-content: center;
  }
`

const Visual = styled.div`
  grid-area: visual;
  position: relative;
  width: min(100%, 560px);
  justify-self: center;
`

const frameStyles = {
  solid: css`
    background: #ffffff;
    border: 1px solid rgba(255, 255, 255, 0.72);
    box-shadow:
      0 46px 110px rgba(15, 12, 9, 0.26),
      0 10px 28px rgba(15, 12, 9, 0.09);
  `,
  glass: css`
    background: rgba(255, 255, 255, 0.14);
    border: 1px solid rgba(255, 255, 255, 0.32);
    box-shadow: 0 30px 80px rgba(9, 12, 16, 0.18);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
  `,
  transparent: css`
    background: transparent;
    border: 0;
    box-shadow: none;
  `,
}

const StageFrame = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? 'auto' : '4 / 4.8'};
  height: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? 'min(62vh, 560px)' : 'auto'};
  border-radius: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? 0 : '34px'};
  overflow: hidden;
  ${({ $frameStyle }) => frameStyles[$frameStyle] || frameStyles.solid}

  @media (max-width: 860px) {
    width: min(100%, 430px);
    aspect-ratio: ${({ $frameStyle }) =>
      $frameStyle === 'transparent' ? 'auto' : '4 / 3.6'};
    height: ${({ $frameStyle }) =>
      $frameStyle === 'transparent' ? 'min(42vh, 320px)' : 'auto'};
    border-radius: ${({ $frameStyle }) =>
      $frameStyle === 'transparent' ? 0 : '24px'};
  }
`

const StageImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ $frameStyle }) =>
    $frameStyle === 'solid' ? 'cover' : 'contain'};
  padding: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? '0' : '18px'};
  display: block;

  &.layer-enter {
    animation: ${stageIn} 0.66s cubic-bezier(0.22, 0.61, 0.36, 1) both;
  }

  &.layer-leave {
    animation: ${stageOut} 0.66s ease both;
  }

  ${({ $frameStyle }) =>
    $frameStyle === 'transparent' &&
    css`
      filter: drop-shadow(0 26px 60px rgba(9, 12, 16, 0.2));
    `}
`

const StageFallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f3eee7, #e5dcd0);
  color: rgba(23, 19, 15, 0.2);
  font-size: 92px;
  font-weight: 850;
`

const Controls = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 4;
  padding: 20px max(20px, calc((100vw - 1180px) / 2)) 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;

  @media (max-width: 860px) {
    gap: 12px;
  }
`

const DotButton = styled.button`
  border: 0;
  background: transparent;
  padding: 4px 1px;
  cursor: pointer;
`

const DotTrack = styled.span`
  display: block;
  width: ${({ $active }) => ($active ? '34px' : '16px')};
  height: 4px;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.24;
  overflow: hidden;
  transition: width 240ms ease;
`

const DotFill = styled.span`
  display: block;
  height: 100%;
  width: ${({ $active }) => ($active ? '100%' : '0%')};
  border-radius: 999px;
  background: currentColor;
  opacity: 1;
  transition: width 240ms ease;
`

const ArrowButton = styled.button`
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border-radius: 999px;
  border: 1px solid currentColor;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition:
    transform 160ms ease,
    opacity 160ms ease,
    background 160ms ease;

  &:hover:not(:disabled) {
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 0.18);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const Counter = styled.span`
  min-width: 52px;
  text-align: center;
  font-size: 12px;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
  color: inherit;
  opacity: 0.74;
`

const normalizeConfig = config => ({
  enabled: config?.enabled !== false,
  ctaLabel: config?.ctaLabel || 'Ver producto',
  background: {
    ...DEFAULT_BACKGROUND,
    ...(config?.background || {}),
  },
})

const ProductShowcase = ({
  products = [],
  images = [],
  mode = 'products',
  config = {},
  brandCopy = {},
  getProductPath,
  frameStyle = 'solid',
  allowEmpty = false,
  className,
}) => {
  const normalized = useMemo(() => normalizeConfig(config), [config])
  const background = normalized.background
  const darkText = background.type !== 'image'
  const isBrand = mode === 'brand'
  const brandSlides = useMemo(
    () => (images || []).map((image, index) => ({ _id: `brand-${index}`, image })),
    [images]
  )
  const slides = isBrand ? brandSlides : products
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState(null)
  const [paused, setPaused] = useState(false)
  const touchStartX = useRef(null)
  const total = slides.length
  const activeIndex = total ? ((current % total) + total) % total : 0
  const slide = slides[activeIndex]

  const goTo = useCallback(
    nextIndex => {
      if (!total) return

      const next = ((nextIndex % total) + total) % total

      if (next === activeIndex) return

      setPrevious(activeIndex)
      setCurrent(next)
    },
    [activeIndex, total]
  )

  useEffect(() => {
    if (total < 2 || paused) return undefined

    const timer = window.setInterval(() => {
      goTo(activeIndex + 1)
    }, AUTO_PLAY_MS)

    return () => window.clearInterval(timer)
  }, [activeIndex, goTo, paused, total])

  useEffect(() => {
    if (previous === null) return undefined

    const timer = window.setTimeout(() => {
      setPrevious(null)
    }, CROSSFADE_MS)

    return () => window.clearTimeout(timer)
  }, [previous])

  if (!normalized.enabled || (!total && !allowEmpty)) return null

  const imageUrl = slide?.image
    ? getUploadUrl(UPLOAD_ROUTES.products.images, slide.image)
    : ''
  const detailPath = getProductPath
    ? getProductPath(slide)
    : buildRoute(ROUTES.VERTICAL_PRODUCT_DETAIL, { id: slide?._id })
  const price = Number(
    slide?.selectedItem?.price ||
    slide?.minPrice ||
    slide?.price ||
    0
  )
  const compareAtPrice = Number(
    slide?.selectedItem?.compareAtPrice ||
    slide?.compareAtPrice ||
    0
  )
  const discount = compareAtPrice > price
    ? slide?.selectedItem?.discountPercentage ||
      slide?.maxDiscountPercentage ||
      Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0

  const handleTouchStart = event => {
    touchStartX.current = event.touches?.[0]?.clientX ?? null
  }

  const handleTouchEnd = event => {
    if (touchStartX.current === null) return

    const endX = event.changedTouches?.[0]?.clientX

    if (endX === undefined) return

    const delta = endX - touchStartX.current

    if (Math.abs(delta) > 54) {
      goTo(activeIndex + (delta < 0 ? 1 : -1))
    }

    touchStartX.current = null
  }

  return (
    <Shell
      $backgroundColor={darkText ? background.color : '#101418'}
      $darkText={darkText}
      className={className}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {background.type === 'image' && background.image && (
        <>
          <BackgroundImage
            $image={background.image}
            $position={background.position}
          />
          {background.overlayEnabled && (
            <BackgroundOverlay $opacity={background.overlayOpacity} />
          )}
        </>
      )}

      {darkText && <Halo aria-hidden="true" />}

      <Inner
        $empty={allowEmpty && total === 0}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Copy key={`copy-${slide?._id || slide?.image}`}>
          {isBrand ? (
            <>
              <Eyebrow $darkText={darkText}>
                {brandCopy.eyebrow || 'Bienvenido a'}
              </Eyebrow>
              <Title>{brandCopy.title || 'Cooqys'}</Title>
              {brandCopy.subtitle && (
                <Description>{brandCopy.subtitle}</Description>
              )}
              <ActionRow>
                {brandCopy.primaryLabel && (
                  <Link to={brandCopy.primaryPath || ROUTES.MARKETPLACE}>
                    <Button
                      type={darkText ? 'primary' : 'default'}
                      size="large"
                      icon={<ArrowUpRight size={17} />}
                    >
                      {brandCopy.primaryLabel}
                    </Button>
                  </Link>
                )}
                {brandCopy.secondaryLabel && (
                  <Link to={brandCopy.secondaryPath || ROUTES.VERTICALS}>
                    <Button
                      type={darkText ? 'default' : 'primary'}
                      size="large"
                    >
                      {brandCopy.secondaryLabel}
                    </Button>
                  </Link>
                )}
              </ActionRow>
            </>
          ) : (
            <>
              {(slide?.vertical?.name || slide?.category?.name) && (
                <Eyebrow $darkText={darkText}>
                  {slide.vertical?.name || slide.category?.name}
                </Eyebrow>
              )}
              <Title>{slide?.name}</Title>
              {slide?.description && (
                <Description>{slide.description}</Description>
              )}
              <PriceRow>
                <Price>{currency(price)}</Price>
                {compareAtPrice > price && (
                  <ComparePrice>{currency(compareAtPrice)}</ComparePrice>
                )}
                {discount > 0 && (
                  <DiscountBadge>
                    <BadgePercent size={14} />
                    -{discount}%
                  </DiscountBadge>
                )}
              </PriceRow>
              <Link to={detailPath}>
                <Button
                  type={darkText ? 'primary' : 'default'}
                  size="large"
                  icon={<ArrowUpRight size={17} />}
                >
                  {normalized.ctaLabel}
                </Button>
              </Link>
              {slide?.store?.name && (
                <Meta>
                  <MetaChip>
                    <Store size={13} />
                    {slide.store.name}
                  </MetaChip>
                </Meta>
              )}
            </>
          )}
        </Copy>

        {total > 0 && (
        <Visual>
          <StageFrame $frameStyle={frameStyle}>
            {previous !== null &&
              previous !== activeIndex &&
              slides[previous] && (
                <StageImage
                  key={`out-${slides[previous]._id || slides[previous].image}`}
                  className="layer-leave"
                  $frameStyle={frameStyle}
                  src={getUploadUrl(
                    UPLOAD_ROUTES.products.images,
                    slides[previous].image
                  )}
                  alt=""
                  aria-hidden="true"
                />
              )}

            {imageUrl ? (
              <StageImage
                key={`in-${slide?._id || slide?.image}`}
                className="layer-enter"
                $frameStyle={frameStyle}
                src={imageUrl}
                alt={isBrand ? brandCopy.title || 'Imagen destacada' : slide?.name}
              />
            ) : (
              <StageFallback>
                {(isBrand ? brandCopy.title : slide?.name)?.charAt(0) || 'C'}
              </StageFallback>
            )}
          </StageFrame>
        </Visual>
        )}
      </Inner>

      {total > 0 && (
        <Controls>
          {total > 1 ? (
            <>
              <ArrowButton
                type="button"
                aria-label="Anterior"
                onClick={() => goTo(activeIndex - 1)}
              >
                <ArrowLeft size={18} />
              </ArrowButton>

              {slides.map((product, index) => (
                <DotButton
                  key={product._id || product.image}
                  aria-label={`Slide ${index + 1}`}
                  onClick={() => goTo(index)}
                >
                  <DotTrack $active={index === activeIndex}>
                    <DotFill $active={index === activeIndex} />
                  </DotTrack>
                </DotButton>
              ))}

              <ArrowButton
                type="button"
                aria-label="Siguiente"
                onClick={() => goTo(activeIndex + 1)}
              >
                <ArrowRight size={18} />
              </ArrowButton>
            </>
          ) : (
            <Counter>1 / 1</Counter>
          )}
        </Controls>
      )}
    </Shell>
  )
}

export default ProductShowcase
