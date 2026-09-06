import { Button, Spin } from 'antd'
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react'
import {
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import useVerticals from '../../../hooks/useVerticals'

const AUTO_PLAY_MS = 6000
const CROSSFADE_MS = 720

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

const Section = styled.section`
  position: relative;
  overflow: hidden;
  background: ${({ $backgroundColor }) => $backgroundColor || '#f7f4ef'};
  padding: 64px 0 42px;
`

const Header = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1360px;
  margin: 0 auto;
  padding: 0 max(24px, calc((100vw - 1320px) / 2));
`

const SectionTitle = styled.h2`
  margin: 4px 0 6px;
  font-size: clamp(24px, 3vw, 34px);
  letter-spacing: -0.025em;
  font-weight: 800;
  color: #17130f;
`

const SectionSubtitle = styled.p`
  margin: 0;
  color: #6b7280;
`

const BackgroundImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  background-image: ${({ $image }) => `url(${$image})`};
  background-position: ${({ $position }) => $position || 'center'};
  background-size: cover;
`

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: ${({ $opacity }) => `rgba(9, 12, 16, ${$opacity})`};
`

const Grid = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1360px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${({ $imageSide }) =>
    $imageSide === 'left'
      ? 'minmax(0, 1.05fr) minmax(0, 0.95fr)'
      : 'minmax(0, 0.9fr) minmax(0, 1.1fr)'};
  align-items: center;
  gap: clamp(26px, 5vw, 76px);

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`

const Info = styled.div`
  animation: ${stageIn} 0.5s ease both;

  @media (max-width: 860px) {
    order: 2;
    text-align: center;
  }

  @media (min-width: 861px) {
    order: ${({ $imageSide }) => ($imageSide === 'left' ? 2 : 1)};
  }
`

const Visual = styled.div`
  width: 100%;
  justify-self: center;
  min-width: 0;

  @media (min-width: 861px) {
    order: ${({ $imageSide }) => ($imageSide === 'left' ? 1 : 2)};
  }

  @media (max-width: 860px) {
    width: 100%;
    order: 1;
  }
`

const Eyebrow = styled.span`
  color: #8a5a36;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 11px;
  font-weight: 800;
`

const Name = styled.h3`
  margin: 10px 0 10px;
  font-size: clamp(30px, 3.6vw, 50px);
  line-height: 1.05;
  letter-spacing: -0.035em;
  font-weight: 800;
  color: #17130f;
`

const Description = styled.p`
  margin: 0 0 20px;
  color: #5b5248;
  font-size: 16px;
  line-height: 1.62;
  max-width: 520px;

  @media (max-width: 860px) {
    margin-left: auto;
    margin-right: auto;
  }
`

const Frame = styled.div`
  position: relative;
  width: 100%;
  height: ${({ $imageHeight }) => `${$imageHeight}px`};
  max-height: 72vh;
  border-radius: 30px;
  overflow: hidden;
  background: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? 'transparent' : '#ffffff'};
  border: ${({ $frameStyle }) =>
    $frameStyle === 'transparent' ? '0' : '1px solid rgba(255,255,255,.7)'};
  backdrop-filter: ${({ $frameStyle }) =>
    $frameStyle === 'glass' ? 'blur(18px)' : 'none'};
  box-shadow: ${({ $frameStyle }) =>
    $frameStyle === 'transparent'
      ? 'none'
      : '0 36px 90px rgba(31,25,19,.18)'};

  @media (max-width: 860px) {
    max-height: 62vh;
  }
`

const Layer = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;

  &.layer-enter {
    animation: ${stageIn} 0.66s ease both;
  }

  &.layer-leave {
    animation: ${stageOut} 0.66s ease both;
  }
`

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #f3eee7, #ded3c4);
  color: rgba(23, 19, 15, 0.2);
  font-size: 88px;
  font-weight: 850;
`

const Controls = styled.div`
  max-width: 1360px;
  margin: 22px auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const DotButton = styled.button`
  border: 0;
  background: transparent;
  padding: 4px 1px;
  cursor: pointer;
`

const Dot = styled.span`
  display: block;
  height: 4px;
  border-radius: 999px;
  background: #17130f;
  opacity: ${({ $active }) => ($active ? 1 : 0.18)};
  width: ${({ $active }) => ($active ? '34px' : '16px')};
  transition: width 240ms ease, opacity 240ms ease;
`

const ArrowButton = styled.button`
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border: 1px solid rgba(23, 19, 15, 0.2);
  border-radius: 999px;
  background: transparent;
  color: #17130f;
  cursor: pointer;
  transition: transform 160ms ease, background 160ms ease;

  &:hover:not(:disabled) {
    background: #17130f;
    color: #ffffff;
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const VerticalShowcase = ({
  config = {},
  title = 'Verticales destacadas',
  subtitle = '',
}) => {
  const { translate } = useDictionaryTranslation()
  const navigate = useNavigate()
  const { data, loading } = useVerticals()
  const [current, setCurrent] = useState(0)
  const [previous, setPrevious] = useState(null)
  const [paused, setPaused] = useState(false)
  const imageSide = config.imageSide || 'right'
  const backgroundType = config.backgroundType || 'color'
  const backgroundColor = config.backgroundColor || '#f7f4ef'
  const backgroundImage = config.backgroundImage || ''
  const backgroundPosition = config.backgroundPosition || 'center'
  const overlayOpacity = Number(config.overlayOpacity) || 0
  const frameStyle = config.frameStyle || 'solid'
  const overlayEnabled = config.overlayEnabled === true && Boolean(backgroundImage)
  const imageHeight = Math.min(
    Math.max(Number(config.imageHeight) || 420, 260),
    720
  )
  const total = data?.length || 0
  const activeIndex = total ? ((current % total) + total) % total : 0
  const vertical = data?.[activeIndex]

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

    const timer = window.setTimeout(() => setPrevious(null), CROSSFADE_MS)

    return () => window.clearTimeout(timer)
  }, [previous])

  if (loading) {
    return (
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 260 }}>
        <Spin />
      </div>
    )
  }

  if (!total) return null

  const imageUrl = getUploadUrl(
    UPLOAD_ROUTES.verticals.banners,
    vertical?.banner || vertical?.image
  )
  const iconUrl = getUploadUrl(UPLOAD_ROUTES.verticals.icons, vertical?.icon)
  const openVertical = () => {
    if (vertical?._id) navigate(`/vertical/${vertical._id}`)
  }

  return (
    <Section
      $backgroundColor={backgroundColor}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {backgroundType === 'image' && backgroundImage && (
        <>
          <BackgroundImage
            $image={backgroundImage}
            $position={backgroundPosition}
          />
          {overlayEnabled && (
            <BackgroundOverlay $opacity={overlayOpacity} />
          )}
        </>
      )}

      <Header>
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        <SectionTitle>{title}</SectionTitle>
      </Header>

      <Grid $imageSide={imageSide}>
        <Info key={`info-${vertical?._id}`} $imageSide={imageSide}>
          <Eyebrow>{translate('catalog.exploreByCategory')}</Eyebrow>
          <Name>{vertical?.name}</Name>
          <Description>
            {vertical?.description || 'Explora los productos de esta vertical en Cooqys.'}
          </Description>
          <Button type="primary" size="large" icon={<ArrowUpRight size={17} />} onClick={openVertical}>
            {translate('catalog.explore')} {vertical?.name || ''}
          </Button>
          {iconUrl && (
            <div style={{ marginTop: 14 }}>
              <img
                src={iconUrl}
                alt={vertical?.name}
                style={{ width: 54, height: 54, objectFit: 'contain' }}
              />
            </div>
          )}
        </Info>

        <Visual $imageSide={imageSide}>
          <Frame $frameStyle={frameStyle} $imageHeight={imageHeight}>
            {previous !== null &&
              previous !== activeIndex &&
              data[previous] && (
                <Layer
                  key={`out-${data[previous]._id}`}
                  className="layer-leave"
                  src={getUploadUrl(
                    UPLOAD_ROUTES.verticals.banners,
                    data[previous]?.banner || data[previous]?.image
                  )}
                  alt=""
                  aria-hidden="true"
                />
              )}

            {imageUrl ? (
              <Layer
                key={`in-${vertical?._id}`}
                className="layer-enter"
                src={imageUrl}
                alt={vertical?.name || 'Vertical'}
              />
            ) : (
              <Fallback>{vertical?.name?.charAt(0) || 'V'}</Fallback>
            )}
          </Frame>
        </Visual>
      </Grid>

      {total > 1 && (
        <Controls>
          <ArrowButton
            type="button"
            aria-label="Vertical anterior"
            onClick={() => goTo(activeIndex - 1)}
          >
            <ArrowLeft size={17} />
          </ArrowButton>

          {data.map((item, index) => (
            <DotButton key={item._id} onClick={() => goTo(index)} aria-label={item.name}>
              <Dot $active={index === activeIndex} />
            </DotButton>
          ))}

          <ArrowButton
            type="button"
            aria-label="Vertical siguiente"
            onClick={() => goTo(activeIndex + 1)}
          >
            <ArrowRight size={17} />
          </ArrowButton>
        </Controls>
      )}
    </Section>
  )
}

export default VerticalShowcase
