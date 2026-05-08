import { Button, Card, Space, Typography } from 'antd'
import styled from 'styled-components'

const Preview = styled(Card)`
  background: ${({ $theme }) => $theme.backgroundColor};
  color: ${({ $theme }) => $theme.textColor};
  border-radius: ${({ $theme }) => $theme.borderRadius + 8}px;
`

const HeroMock = styled.div`
  border-radius: ${({ $theme }) => $theme.borderRadius}px;
  background: ${({ $theme }) => $theme.primaryColor};
  color: #fff;
  padding: 28px;
`

const StoreThemePreview = ({ theme }) => (
  <Preview $theme={theme}>
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <HeroMock $theme={theme}>
        <Typography.Title level={3} style={{ color: '#fff', margin: 0 }}>Tu tienda</Typography.Title>
        <Typography.Text style={{ color: '#fff' }}>Una experiencia limpia para vender mejor.</Typography.Text>
      </HeroMock>
      <Button type="primary">Botón principal</Button>
    </Space>
  </Preview>
)

export default StoreThemePreview
