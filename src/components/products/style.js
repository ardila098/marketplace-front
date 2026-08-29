import { Card } from 'antd'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

const cardVariants = {
  compact: css`
    .ant-card-body {
      padding: 10px;
    }
  `,
  editorial: css`
    border-color: rgba(17, 24, 39, 0.08);
    box-shadow: 0 18px 38px rgba(17, 24, 39, 0.08);

    .ant-card-body {
      padding: 12px;
    }
  `,
  glass: css`
    border-color: rgba(255, 255, 255, 0.58);
    background: rgba(255, 255, 255, 0.62);
    backdrop-filter: blur(16px);
    box-shadow: 0 18px 42px rgba(17, 24, 39, 0.1);
  `,
}

export const ProductLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`

export const ProductImageLink = styled(Link)`
  display: block;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`

export const ProductCardWrapper = styled(Card)`
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #eef0f3;

  .ant-card-body {
    padding: 12px;
  }

  ${({ $variant }) => cardVariants[$variant]}
`

export const ImageWrap = styled.div`
  aspect-ratio: ${({ $variant }) => {
    if ($variant === 'compact') return '4 / 3'
    if ($variant === 'editorial') return '4 / 5'

    return '1 / 1'
  }};
  border-radius: 8px;
  overflow: hidden;
  background: #f4f4f5;
  position: relative;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.25s ease;
  }

  &:hover img {
    transform: scale(1.03);
  }
`

export const ProductImage = styled.img`
  display: block;
`

export const NewBadge = styled.span`
  position: absolute;
  left: 10px;
  top: 10px;
  z-index: 2;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.92);
  color: #111111;
  font-size: 11px;
  font-weight: 650;
  padding: 4px 8px;
`

export const ImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  color: #9ca3af;
  font-size: 28px;
  font-weight: 700;
  background: linear-gradient(135deg, #f5f6f8, #eceff3);
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ $variant }) => ($variant === 'compact' ? '1px' : '2px')};
  margin-top: ${({ $variant }) => ($variant === 'compact' ? '9px' : '12px')};
`

export const ProductName = styled.div`
  font-weight: 560;
  font-size: ${({ $variant }) => ($variant === 'editorial' ? '15px' : '14px')};
  line-height: 1.35;
  color: #111111;
`

export const ProductMeta = styled.div`
  font-size: 0.86rem;
  color: #777777;
`

export const ProductPrice = styled.div`
  font-weight: 650;
  font-size: 14px;
  color: #111111;
`

export const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ $variant }) => ($variant === 'compact' ? '6px' : '8px')};
  flex-wrap: wrap;
`

export const ComparePrice = styled.span`
  color: #9ca3af;
  font-size: 0.84rem;
  text-decoration: line-through;
`

export const DiscountBadge = styled.span`
  background: #dcfce7;
  color: #166534;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 2px 8px;
`

export const VariantPreview = styled.div`
  display: flex;
  gap: ${({ $variant }) => ($variant === 'compact' ? '6px' : '8px')};
  margin-top: ${({ $variant }) => ($variant === 'compact' ? '8px' : '10px')};
`

export const PreviewButton = styled.button`
  width: ${({ $variant }) => ($variant === 'compact' ? '26px' : '30px')};
  height: ${({ $variant }) => ($variant === 'compact' ? '26px' : '30px')};
  padding: 1px;
  border-radius: 999px;
  border: 1px solid ${({ $active }) => ($active ? '#111111' : '#e5e7eb')};
  background: #ffffff;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? 1 : 0.76)};
  transition:
    border-color 160ms ease,
    opacity 160ms ease,
    transform 160ms ease;

  &:hover {
    border-color: #111111;
    opacity: 1;
    transform: translateY(-1px);
  }
`

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  object-fit: cover;
  background: #ffffff;
  display: block;
`

export const Dot = styled.span`
  width: 100%;
  height: 100%;
  border-radius: 999px;
  background: ${({ $color }) => $color || '#ffffff'};
  display: block;
`
