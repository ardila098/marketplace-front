import styled from 'styled-components'

const fontStack = `
  'Manrope',
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  'Segoe UI',
  sans-serif
`

export const PageContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 20px 70px;
  font-family: ${fontStack};

  @media (max-width: 768px) {
    padding: 24px 16px 56px;
  }
`

export const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.9fr);
  gap: 48px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 28px;
  }
`

export const GalleryColumn = styled.div`
  min-width: 0;
`

export const InfoColumn = styled.div`
  min-width: 0;
  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`

export const GalleryWrapper = styled.div`
  width: 100%;
`

export const MainImageBox = styled.div`
  width: 100%;
  aspect-ratio: 1 / 1;
  background: #f4f4f4;
  overflow: hidden;
  border-radius: 18px;
`

export const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const GalleryThumbs = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 12px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const GalleryThumbButton = styled.button`
  width: 72px;
  height: 72px;
  padding: 0;
  flex: 0 0 auto;
  border: 1px solid ${({ $active }) => ($active ? '#111111' : '#e8e8e8')};
  background: #f7f7f7;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
`

export const GalleryThumbImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`

export const ProductHeader = styled.div`
  border-bottom: 1px solid #eeeeee;
  padding-bottom: 24px;
  margin-bottom: 24px;
`

export const StoreText = styled.div`
  font-size: 0.82rem;
  color: #777777;
  font-weight: 600;
  margin-bottom: 8px;
`

export const ProductTitle = styled.h1`
  font-size: clamp(1.6rem, 3vw, 2.35rem);
  line-height: 1.12;
  letter-spacing: -0.045em;
  margin: 0 0 8px;
  color: #111111;
  font-weight: 800;
`

export const CategoryText = styled.div`
  color: #777777;
  font-size: 0.92rem;
  margin-bottom: 18px;
`

export const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
`

export const PriceText = styled.span`
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.035em;
  color: #111111;
`

export const ComparePrice = styled.span`
  font-size: 1rem;
  color: #8a8a8a;
  text-decoration: line-through;
  font-weight: 500;
`

export const DiscountText = styled.div`
  margin-top: 6px;
  font-size: 0.9rem;
  color: #444444;
  font-weight: 700;
`

export const Description = styled.p`
  margin: 22px 0 0;
  color: #4b4b4b;
  line-height: 1.65;
  font-size: 0.95rem;
`

export const PurchasePanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const SelectorBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const SelectorTitle = styled.h3`
  margin: 0;
  color: #111111;
  font-size: 0.92rem;
  font-weight: 800;
  letter-spacing: -0.01em;
`

export const OptionsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const OptionButton = styled.button`
  min-width: 92px;
  border: 1px solid ${({ $active }) => ($active ? '#111111' : '#dddddd')};
  background: ${({ $active }) => ($active ? '#111111' : '#ffffff')};
  color: ${({ $active }) => ($active ? '#ffffff' : '#111111')};
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  text-align: left;
  transition:
    background 160ms ease,
    color 160ms ease,
    border-color 160ms ease;

  &:hover {
    border-color: #111111;
  }
`

export const OptionLabel = styled.span`
  display: block;
  font-size: 0.86rem;
  font-weight: 800;
`

export const OptionStock = styled.span`
  display: block;
  margin-top: 3px;
  font-size: 0.72rem;
  font-weight: 500;
  opacity: 0.75;
`

export const PartBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const AddCartButtonWrapper = styled.div`
  margin-top: 8px;

  .ant-btn-primary {
    height: 48px;
    border-radius: 12px;
    background: #111111;
    border-color: #111111;
    font-weight: 800;
  }

  .ant-btn-primary:disabled {
    background: #d9d9d9;
    border-color: #d9d9d9;
    color: #888888;
  }
`