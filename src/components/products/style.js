import { Card } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ProductLink = styled(Link)`
  display: block;
  height: 100%;
  color: inherit;
  text-decoration: none;

  &:hover {
    color: inherit;
  }
`

export const ProductCardWrapper = styled(Card)`
  height: 100%;
  border-radius: 22px;
  overflow: hidden;

  .ant-card-body {
    padding: 14px;
  }
`

export const ImageWrap = styled.div`
  aspect-ratio: 1 / 1;
  border-radius: 18px;
  overflow: hidden;
  background: #f4f4f5;

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

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  margin-top: 12px;
`

export const ProductName = styled.div`
  font-weight: 600;
  color: #111111;
`

export const ProductMeta = styled.div`
  font-size: 0.86rem;
  color: #777777;
`

export const ProductPrice = styled.div`
  font-weight: 700;
  color: #111111;
`

export const VariantPreview = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`

export const PreviewImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  object-fit: cover;
  border: 1px solid #e5e7eb;
  background: #ffffff;
`

export const Dot = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 999px;
  border: 1px solid #d1d5db;
  background: ${({ $color }) => $color || '#ffffff'};
`