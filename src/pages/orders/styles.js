import { Row } from 'antd'
import styled from 'styled-components'

export const OrderLookupContainer = styled(Row)`
  max-width: 1040px;
  margin: 0 auto;
  padding: 48px 20px 80px;
`

export const OrderLookupHero = styled(Row)`
  max-width: 680px;
  margin-bottom: 28px;
`

export const OrderLookupTitle = styled.h1`
  margin: 0 0 10px;
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.05;
  letter-spacing: -0.055em;
  color: #111111;
`

export const OrderLookupText = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #666666;
`

export const OrderLookupLayout = styled(Row)`
  display: grid;
  grid-template-columns: 380px minmax(0, 1fr);
  gap: 28px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const OrderCard = styled(Row)`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 20px;
  padding: 24px;
`

export const OrderCardTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 1.05rem;
  color: #111111;
`

export const OrderResultHeader = styled(Row)`
  display: flex;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid #eeeeee;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`

export const OrderNumber = styled(Row)`
  font-size: 1.1rem;
  font-weight: 700;
  color: #111111;
`

export const OrderDate = styled(Row)`
  margin-top: 4px;
  font-size: 0.85rem;
  color: #777777;
`

export const StatusGroup = styled(Row)`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

export const StatusBadge = styled.span`
  display: inline-flex;
  align-items: center;
  height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  background: #f5f5f5;
  color: #333333;
  font-size: 0.78rem;
  font-weight: 600;
`

export const OrderSection = styled(Row)`
  padding-top: 20px;
`

export const OrderSectionTitle = styled.h3`
  margin: 0 0 14px;
  font-size: 0.95rem;
  color: #111111;
`

export const OrderItem = styled(Row)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid #eeeeee;

  &:last-child {
    border-bottom: none;
  }
`

export const OrderItemName = styled(Row)`
  font-size: 0.92rem;
  font-weight: 600;
  color: #111111;
`

export const OrderItemMeta = styled(Row)`
  margin-top: 4px;
  font-size: 0.8rem;
  color: #777777;
`

export const OrderItemPrice = styled(Row)`
  font-size: 0.9rem;
  font-weight: 700;
  color: #111111;
  white-space: nowrap;
`

export const TotalRow = styled(Row)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid #eeeeee;
  font-size: 1rem;
  font-weight: 700;
  color: #111111;
`

export const AddressText = styled(Row)`
  font-size: 0.9rem;
  line-height: 1.6;
  color: #555555;
`


export const OrderCell = styled(Row)`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

export const OrderCellTitle = styled.span`
  font-weight: 600;
`

export const OrderCellText = styled.span`
  font-size: 12px;
  color: #8c8c8c;
`
