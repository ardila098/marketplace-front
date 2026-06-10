import { Image, Typography } from 'antd'
import styled from 'styled-components'

export const CartList = styled.div`
  flex: 1;
`

export const CartItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 76px 1fr;
  gap: 14px;
  padding: 16px 0;
  border-bottom: 1px solid #eeeeee;
`

export const CartItemImage = styled(Image)`
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 12px;
  background: #f5f5f5;
`

export const CartItemContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const CartItemName = styled(Typography.Text)`
  font-size: 0.92rem;
  line-height: 1.35;
  color: #111111;
`

export const CartItemMeta = styled(Typography.Text)`
  font-size: 0.8rem;
  line-height: 1.35;
`

export const CartItemPrice = styled(Typography.Text)`
  font-size: 0.9rem;
`

export const CartItemActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 4px;

  .ant-input-number {
    width: 82px;
    border-radius: 10px;
  }
`

export const CartFooter = styled.div`
  border-top: 1px solid #eeeeee;
  padding-top: 16px;
  margin-top: auto;
`

export const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

export const SummaryRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const CartPageContainer = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  padding: 40px 20px 70px;
`

export const CartPageLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 32px;
  align-items: start;

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`

export const CartPageCard = styled.div`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  padding: 20px;
`

export const CartPageTitle = styled.h1`
  margin: 0 0 18px;
  font-size: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.035em;
  color: #111111;
`

export const CartSummaryCard = styled.div`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  padding: 20px;
  position: sticky;
  top: 24px;

  @media (max-width: 850px) {
    position: static;
  }
`