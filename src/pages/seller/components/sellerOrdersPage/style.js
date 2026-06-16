import { Row } from 'antd'
import styled from 'styled-components'

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