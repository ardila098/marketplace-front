import styled from 'styled-components'
import { Carousel } from 'antd'

export const Section = styled.section`
  width: 100%;
  padding: 32px 0;
font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
`

export const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 400;
  color: #111;
`

export const CarouselWrapper = styled(Carousel)`
  .slick-list {
    margin: 0 -12px;
  }

  .slick-slide > div {
    padding: 0 12px;
  }

  .slick-dots {
    bottom: -28px;
  }
`

export const Card = styled.article`
  position: relative;
  height: 230px;
  border-radius: 18px;
  overflow: hidden;
  background: #f3f3f3;
  cursor: pointer;
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

export const IconBox = styled.div`
  position: absolute;
  top: 22px;
  left: 24px;
  z-index: 2;
  width: 34px;
  height: 34px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.65);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`

export const CardOverlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 96px;
  padding: 22px 24px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;

  background: linear-gradient(
    to top,
    rgba(245, 241, 235, 0.95),
    rgba(245, 241, 235, 0.72),
    rgba(245, 241, 235, 0)
  );
`

export const CardContent = styled.div`
  min-width: 0;
`

export const CardTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 21px;
  font-weight: 400;
  color: #111;
`

export const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.4;
`

export const NextButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  color: #111;
  font-size: 22px;
  cursor: pointer;
  flex-shrink: 0;
`