import { Button, Card, Empty, Typography } from 'antd'

const CartPage = () => (
  <Card title="Carrito">
    <Empty description="Tu carrito está vacío" />
    <Typography.Paragraph type="secondary">Cuando agregues variantes exactas, aparecerán aquí para validar stock y continuar checkout.</Typography.Paragraph>
    <Button type="primary">Continuar comprando</Button>
  </Card>
)

export default CartPage
