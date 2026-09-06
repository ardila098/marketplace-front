import { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.section`
  min-height: ${({ $size }) => ($size === 'compact' ? '430px' : '520px')};
  display: flex;
  align-items: flex-end;
  padding: 76px max(20px, calc((100vw - 1180px) / 2)) 42px;
  background: linear-gradient(135deg, #1f2937, #111827);
  isolation: isolate;

  @media (max-width: 768px) {
    min-height: ${({ $size }) => ($size === 'compact' ? '360px' : '430px')};
    padding-top: 64px;
    padding-bottom: 34px;
  }
`

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
  z-index: -2;
  background-image: ${({ $image }) => `url(${$image})`};
  background-position: center;
  background-size: cover;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: opacity 0.8s ease;
`

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.16), rgba(0, 0, 0, 0.64));
`

const Content = styled.div`
  width: min(${({ $maxWidth }) => $maxWidth || '680px'}, 100%);
  color: #ffffff;

  .ant-typography {
    color: inherit;
  }
`

const CoverHero = ({
  children,
  className,
  contentWidth = '680px',
  image,
  images = [],
  size = 'default',
}) => {
  const allImages = [image, ...images].filter(Boolean)
  const [active, setActive] = useState(0)
  const count = allImages.length

  useEffect(() => {
    if (count < 2) {
      setActive(0)
      return undefined
    }

    const timer = window.setInterval(() => {
      setActive(current => (current + 1) % count)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [count])

  return (
    <Wrapper className={className} $size={size}>
      {allImages.length ? (
        allImages.map((src, index) => (
          <ImageLayer
            key={`${src}-${index}`}
            $image={src}
            $active={index === active}
          />
        ))
      ) : null}
      <Overlay />
      <Content $maxWidth={contentWidth}>{children}</Content>
    </Wrapper>
  )
}

export default CoverHero
