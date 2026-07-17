import { Button, Form, Input, Space, Typography } from 'antd'
import { formatPrice } from '../../helpers/formatPrice'
import {
  SummaryBox,
  SummaryRow,
} from './styles'

const CartSummary = ({
  subtotal = 0,
  discount = 0,
  total = 0,
  couponCode = '',
  buttonText = 'Continuar',
  loading = false,
  disabled = false,
  onApplyCoupon,
  onContinue,
}) => {
  const [form] = Form.useForm()

  const handleApplyCoupon = values => {
    onApplyCoupon?.(values.code || '')
  }

  return (
    <SummaryBox>
      <SummaryRow>
        <Typography.Text type="secondary">
          Subtotal
        </Typography.Text>

        <Typography.Text strong>
          {formatPrice(subtotal || total)}
        </Typography.Text>
      </SummaryRow>

      {discount > 0 && (
        <SummaryRow>
          <Typography.Text type="secondary">
            Descuento
          </Typography.Text>

          <Typography.Text strong type="success">
            -{formatPrice(discount)}
          </Typography.Text>
        </SummaryRow>
      )}

      <SummaryRow>
        <Typography.Text type="secondary">
          Total
        </Typography.Text>

        <Typography.Title level={4} style={{ margin: 0 }}>
          {formatPrice(total)}
        </Typography.Title>
      </SummaryRow>

      {onApplyCoupon && (
        <Form
          form={form}
          layout="vertical"
          initialValues={{ code: couponCode }}
          onFinish={handleApplyCoupon}
        >
          <Form.Item name="code" style={{ marginBottom: 8 }}>
            <Input placeholder="Codigo de descuento" allowClear />
          </Form.Item>

          <Space.Compact style={{ width: '100%' }}>
            <Button htmlType="submit" loading={loading} style={{ width: '50%' }}>
              Aplicar
            </Button>
            <Button
              loading={loading}
              onClick={() => {
                form.setFieldsValue({ code: '' })
                onApplyCoupon('')
              }}
              style={{ width: '50%' }}
            >
              Quitar
            </Button>
          </Space.Compact>
        </Form>
      )}

      <Button
        type="primary"
        block
        size="large"
        loading={loading}
        disabled={disabled}
        onClick={onContinue}
      >
        {buttonText}
      </Button>
    </SummaryBox>
  )
}

export default CartSummary
