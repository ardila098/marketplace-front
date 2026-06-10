import styled from 'styled-components'

const fontStack = `
  'nunito',
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif
`

export const ProductCard = styled.div`
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid #eeeeee;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  font-family: ${fontStack};
  transition:
    transform 180ms ease,
    box-shadow 180ms ease,
    border-color 180ms ease;

  &:hover {
    transform: translateY(-2px);
    border-color: #dedede;
    box-shadow: 0 10px 26px rgba(0, 0, 0, 0.06);
  }
`

export const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 100%;
  overflow: hidden;
  background: #f3f4f4;
`

export const CardImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const ThumbnailListWrapper = styled.div`
  display: flex;
  gap: 5px;
  padding: 7px 10px 0;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const ThumbnailButton = styled.button`
  width: 36px;
  height: 36px;
  padding: 0;
  border: 1px solid ${({ $active }) => ($active ? '#111111' : '#e8e8e8')};
  background: #f7f7f7;
  cursor: pointer;
  flex: 0 0 auto;
  overflow: hidden;
  border-radius: 2px;
  opacity: ${({ $active }) => ($active ? 1 : 0.76)};
  transition:
    opacity 160ms ease,
    border-color 160ms ease;

  &:hover {
    opacity: 1;
    border-color: #111111;
  }
`

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const CardContent = styled.div`
  padding: 12px 16px 16px;
  display: flex;
  flex-direction: column;
  gap: 3px;
`

export const PriceBlock = styled.div`
  display: flex;
  align-items: baseline;
  gap: 7px;
  flex-wrap: wrap;
  margin-bottom: 4px;
`

export const PriceText = styled.span`
  font-size: 0.98rem;
  font-weight: 800;
  letter-spacing: -0.025em;
  color: #050505;
`

export const ComparePrice = styled.span`
  font-size: 0.88rem;
  font-weight: 500;
  color: #8a8a8a;
  text-decoration: line-through;
`

export const ProductTitle = styled.h3`
  font-size: 0.94rem;
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: -0.012em;
  color: #111111;
  margin: 0;

  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

export const ProductMeta = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #777777;
  line-height: 1.35;
`

export const ProductSubMeta = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: #777777;
  line-height: 1.35;
`

export const ProductBadgeLine = styled.div`
  font-size: 0.8rem;
  font-weight: 600;
  color: #111111;
  line-height: 1.4;
  margin-top: 2px;
`

export const DiscountText = styled.span`
  color: #343434;
  font-weight: 700;
`

export const ViewButton = styled.span`
  font-size: 0.74rem;
  font-weight: 700;
  color: #111111;
  opacity: 0.55;
  margin-top: 7px;
  transition: opacity 160ms ease;

  ${ProductCard}:hover & {
    opacity: 1;
  }
`