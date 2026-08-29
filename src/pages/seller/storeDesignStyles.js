import { Card, Space, Typography } from 'antd'
import styled from 'styled-components'

export const DesignCard = styled(Card)`
  height: 100%;

  .ant-card-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`

export const SeoPanel = styled.section`
  border-top: 1px solid #f0f0f0;
  margin-top: 18px;
  padding-top: 18px;
`

export const SectionSwitchGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(210px, 1fr));
  gap: 12px;
`

export const SectionSwitchCard = styled.div`
  min-height: 92px;
  padding: 14px;
  border: 1px solid #eceef2;
  border-radius: 8px;
  background: #ffffff;
`

export const SwitchHeader = styled(Space)`
  width: 100%;
  justify-content: space-between;
`

export const SwitchTitle = styled(Typography.Text)`
  font-weight: 700;
`

export const SwitchDescription = styled(Typography.Text)`
  && {
    display: block;
    margin-top: 8px;
    font-size: 12px;
    line-height: 1.45;
  }
`
