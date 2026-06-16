import styled from 'styled-components'

export const CheckoutContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 40px 20px 80px;
`

export const CheckoutTitle = styled.h1`
  margin: 0 0 24px;
  font-size: 1.7rem;
  line-height: 1.2;
  letter-spacing: -0.04em;
  color: #111111;
`

export const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 32px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`

export const CheckoutCard = styled.div`
  background: #ffffff;
  border: 1px solid #eeeeee;
  border-radius: 18px;
  padding: 24px;
`

export const CheckoutSummaryCard = styled(CheckoutCard)`
  position: sticky;
  top: 24px;

  @media (max-width: 900px) {
    position: static;
  }
`

export const SectionTitle = styled.h2`
  margin: 0 0 18px;
  font-size: 1.05rem;
  color: #111111;
`

export const SummaryItem = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 14px 0;
  border-bottom: 1px solid #eeeeee;
`

export const SummaryItemName = styled.div`
  font-size: 0.92rem;
  font-weight: 600;
  color: #111111;
`

export const SummaryItemMeta = styled.div`
  margin-top: 4px;
  font-size: 0.8rem;
  color: #777777;
`

export const SummaryItemPrice = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  color: #111111;
  white-space: nowrap;
`

export const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18px;
  margin-top: 4px;
  font-size: 1rem;
  font-weight: 700;
  color: #111111;
`