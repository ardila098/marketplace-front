import { Row } from 'antd'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const Section = styled.section`
  width: 100%;
  position: relative;
`

const Container = styled(Row)`
  align-items: center;

  ${({ $variant }) => $variant === 'glass' && css`
    padding: 18px;
    border: 1px solid rgba(255, 255, 255, 0.62);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.48);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 42px rgba(17, 24, 39, 0.08);
  `}
`

const Header = styled(Row)`
  align-items: flex-end;
  gap: 16px;
  /* justify-self: center; */
  div {
    align-content: center !important;
  }
`

const Title = styled.h2`
  color: ${({ theme }) => theme.textColor || '#111827'};
  font-size: clamp(24px, 3.4vw, 38px);
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
  top: 42%;
  ${({ $side }) => ($side === 'left' ? 'left: -12px;' : 'right: -12px;')}
  z-index: 3;
  box-shadow: 0 10px 24px rgba(17, 24, 39, 0.1);

  ${({ $variant }) => $variant === 'glass' && css`
    background: rgba(255, 255, 255, 0.72);
    backdrop-filter: blur(12px);
  `}

  @media (max-width: 576px) {
    display: none;
  }
`

const Rail = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: ${({ $variant }) => ($variant === 'tiles' ? '204px' : '160px')};
  gap: ${({ $variant }) => ($variant === 'tiles' ? '14px' : '18px')};
  overflow-x: auto;
  padding: 10px 20px 10px;
  scroll-behavior: smooth;
  scroll-snap-type: x proximity;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 576px) {
    grid-auto-columns: ${({ $variant }) => ($variant === 'tiles' ? '164px' : '136px')};
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

  ${({ $variant }) => $variant === 'tiles' && css`
    align-items: stretch;
    text-align: left;
  `}

  &:hover {
    color: inherit;
  }
`

const Circle = styled.div`
  width: ${({ $variant }) => ($variant === 'tiles' ? '100%' : '148px')};
  aspect-ratio: ${({ $variant }) => ($variant === 'tiles' ? '16 / 11' : '1')};
  border-radius: ${({ $variant }) => ($variant === 'tiles' ? '8px' : '999px')};
  overflow: hidden;
  position: relative;
  isolation: isolate;
  background: #f4f5f7;
  border: 2px solid
    ${({ $active, theme }) => ($active ? theme.primaryColor || '#111111' : '#ffffff')};
  box-shadow: 0 10px 26px rgba(17, 24, 39, 0.08);

  ${({ $variant }) => $variant === 'glass' && css`
    border-color: rgba(255, 255, 255, 0.78);
    box-shadow:
      12px 12px 26px rgba(89, 99, 117, 0.12),
      -10px -10px 22px rgba(255, 255, 255, 0.7);
  `}

  @media (max-width: 576px) {
    width: ${({ $variant }) => ($variant === 'tiles' ? '100%' : '126px')};
  }
`

const ImageLayer = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(17, 24, 39, 0.02), rgba(17, 24, 39, 0.2)),
    ${({ $image }) =>
      $image ? `url(${$image}) center/cover` : 'linear-gradient(135deg, #dfe4ea, #dfe4ea)'};
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
  max-width: ${({ $variant }) => ($variant === 'tiles' ? '100%' : '148px')};

  ${({ $variant }) => $variant === 'tiles' && css`
    padding: 0 4px;
  `}
`

export {
  Section,
  Header,
  Title,
  Subtitle,
  SideArrow,
  Rail,
  Circle,
  ImageLayer,
  EmptyImage,
  Name,
  Card,
  Container,
}
