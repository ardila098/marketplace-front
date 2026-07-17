import styled from 'styled-components'
import { Carousel } from 'antd'

export const Section = styled.section`
  width: 100%;
  padding: 32px 0;
  font-family: var(--app-font-family);

  @media (max-width: 576px) {
    padding: 24px 0;
  }
`

export const Title = styled.h2`
  margin: 0 0 18px;
  font-size: 20px;
  font-weight: 500;
  color: #111;

  @media (max-width: 576px) {
    margin-bottom: 14px;
    font-size: 18px;
  }
`

export const CarouselWrapper = styled(Carousel)`
  padding-bottom: 34px;

  .slick-list {
    margin: 0 -10px;
  }

  .slick-slide > div {
    padding: 0 10px;
  }

  .slick-dots {
    bottom: 0;
  }

  .slick-dots li button {
    background: #111;
    opacity: 0.25;
  }

  .slick-dots li.slick-active button {
    opacity: 1;
  }

  @media (max-width: 576px) {
    .slick-list {
      margin: 0 -6px;
    }

    .slick-slide > div {
      padding: 0 6px;
    }
  }
`

export const Card = styled.article`
  position: relative;
  height: 230px;
  border-radius: 8px;
  overflow: hidden;
  background: #f3f3f3;
  cursor: pointer;
  isolation: isolate;

  @media (max-width: 768px) {
    height: 210px;
  }

  @media (max-width: 576px) {
    height: 220px;
    border-radius: 8px;
  }
`

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  transition: transform 0.35s ease;

  ${Card}:hover & {
    transform: scale(1.04);
  }
`

export const IconBox = styled.div`
  position: absolute;
  top: 18px;
  left: 18px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
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
  z-index: 2;
  min-height: 104px;
  padding: 22px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 14px;
  background: linear-gradient(
    to top,
    rgba(245, 241, 235, 0.96),
    rgba(245, 241, 235, 0.72),
    rgba(245, 241, 235, 0)
  );

  @media (max-width: 576px) {
    padding: 18px;
    min-height: 96px;
  }
`

export const CardContent = styled.div`
  min-width: 0;
`

export const CardTitle = styled.h3`
  margin: 0 0 6px;
  font-size: 20px;
  font-weight: 500;
  color: #111;
  line-height: 1.15;

  @media (max-width: 576px) {
    font-size: 18px;
  }
`

export const CardDescription = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
  line-height: 1.4;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const NextButton = styled.button`
  width: 40px;
  height: 40px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #111;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, background 0.2s ease;

  &:hover {
    transform: translateX(2px);
    background: #fff;
  }

  @media (max-width: 576px) {
    width: 36px;
    height: 36px;
    font-size: 20px;
  }
`
