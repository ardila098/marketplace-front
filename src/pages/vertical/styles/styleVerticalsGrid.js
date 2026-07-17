import styled from 'styled-components'

export const GridCardContainer = styled.div`
  position: relative;
  border: 1px solid #eceef2;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  height: 240px;
  background: #f5f6f8;
  transition: transform 0.2s ease, border-color 0.2s ease;

  &:hover {
    border-color: #d8dde6;
    transform: translateY(-2px);
  }
`

export const GridCardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const GridCardFallback = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #9ca3af;
  background: linear-gradient(135deg, #f5f6f8, #e7ebf0);
`

export const GridCardOverlay = styled.div`
  position: absolute;
  inset: auto 0 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: linear-gradient(180deg, rgba(17, 24, 39, 0), rgba(17, 24, 39, 0.72));
  color: #ffffff;
`

export const GridCardIcon = styled.img`
  width: 34px;
  height: 34px;
  flex: 0 0 34px;
  border-radius: 8px;
  object-fit: cover;
  background: rgba(255, 255, 255, 0.9);
  padding: 5px;
`

export const GridCardTitle = styled.div`
  font-weight: 700;
  font-size: 15px;
  line-height: 1.25;
`

export const GridCardExploreText = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.82);
`
