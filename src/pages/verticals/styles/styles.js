import styled from 'styled-components'
import { Carousel } from 'antd'

export const VerticalsSection = styled.section`
  width: 100%;
  padding: 32px 0;
`

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
`

export const SectionTitle = styled.h2`
  margin: 0;
  font-size: 24px;
  font-weight: 800;
  color: #111;
`

export const StyledCarousel = styled(Carousel)`
  .slick-list {
    margin: 0 -12px;
  }

  .slick-slide > div {
    padding: 0 12px;
  }

  .slick-dots {
    bottom: -28px;
  }

  .slick-dots li button {
    background: #111;
    opacity: 0.25;
  }

  .slick-dots li.slick-active button {
    opacity: 1;
  }
`

export const VerticalCard = styled.article`
  position: relative;
  height: 230px;
  border-radius: 18px;
  overflow: hidden;
  background: #f3f0ec;
  cursor: pointer;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 14px 34px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: 768px) {
    height: 210px;
  }
`

export const BackgroundImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const IconBox = styled.div`
  position: absolute;
  top: 22px;
  left: 24px;
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.55);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const VerticalIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
`

export const CardOverlay = styled.div`
  position: absolute;
  inset: auto 0 0 0;
  min-height: 92px;
  padding: 22px 24px 20px;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
  z-index: 2;

  background: linear-gradient(
    to top,
    rgba(245, 241, 235, 0.92) 0%,
    rgba(245, 241, 235, 0.76) 52%,
    rgba(245, 241, 235, 0) 100%
  );

  backdrop-filter: blur(2px);
`

export const CardContent = styled.div`
  min-width: 0;
`

export const VerticalName = styled.h3`
  margin: 0 0 6px;
  font-size: 21px;
  font-weight: 800;
  color: #111;
  line-height: 1.1;
`

export const VerticalDescription = styled.p`
  margin: 0;
  max-width: 190px;
  font-size: 14px;
  font-weight: 500;
  color: #4b4b4b;
  line-height: 1.4;
`

export const ArrowButton = styled.button`
  flex: 0 0 auto;
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.88);
  color: #111;
  font-size: 23px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.2s ease,
    transform 0.2s ease;

  &:hover {
    background: #fff;
    transform: translateX(2px);
  }
`

export const EmptyState = styled.div`
  padding: 32px;
  border-radius: 16px;
  background: #f7f7f7;
  color: #666;
  text-align: center;
`