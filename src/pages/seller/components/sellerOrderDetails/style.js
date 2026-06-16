import styled from 'styled-components'
import { Image } from 'antd'

export const DetailContainer = styled.div`
  width: 100%;
`

export const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

export const OrderNumber = styled.h1`
  margin: 0;
  font-size: 1.7rem;
  color: #111111;
`

export const HeaderMeta = styled.div`
  color: #777777;
  font-size: 0.9rem;
`

export const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 24px;

  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`

export const Panel = styled.div`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  padding: 20px;
`

export const PanelTitle = styled.h2`
  margin: 0 0 16px;
  font-size: 1rem;
  color: #111111;
`

export const ProductList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const ProductItem = styled.div`
  display: grid;
  grid-template-columns: 86px minmax(0, 1fr);
  gap: 14px;
  padding: 14px;
  border: 1px solid #eeeeee;
  border-radius: 14px;
`

export const ProductImage = styled(Image)`
  width: 86px !important;
  height: 86px !important;
  object-fit: cover;
  border-radius: 12px;
  background: #f5f5f5;
`

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

export const ProductName = styled.div`
  font-weight: 700;
  color: #111111;
`

export const ProductMeta = styled.div`
  font-size: 0.86rem;
  color: #666666;
`

export const ProductPrice = styled.div`
  margin-top: 4px;
  font-weight: 700;
  color: #111111;
`

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const InfoRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const InfoLabel = styled.span`
  font-size: 0.76rem;
  color: #888888;
`

export const InfoValue = styled.span`
  font-size: 0.92rem;
  color: #111111;
`

export const ActionBox = styled.div`
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #eeeeee;
`

export const WarningText = styled.div`
  margin-top: 10px;
  font-size: 0.85rem;
  color: #777777;
`