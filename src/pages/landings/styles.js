import styled from 'styled-components'
import { Select } from 'antd'

export const LeadStatusSelect = styled(Select)`
  min-width: 150px;
`

export const PublicPathText = styled.span`
  display: block;
  max-width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`
