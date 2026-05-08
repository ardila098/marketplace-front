import { Card, Form, InputNumber, Select, Typography } from 'antd'

const AdminSettingsPage = () => (
  <Card title="Configuración global">
    <Typography.Paragraph type="secondary">
      Configuración base de comisiones y reglas globales. Los dominios personalizados se dejan para una fase posterior, pero la arquitectura ya separa marketplace y storefronts.
    </Typography.Paragraph>
    <Form layout="vertical" initialValues={{ defaultCommissionRate: 10, defaultVertical: 'tech' }}>
      <Form.Item label="Comisión por defecto (%)" name="defaultCommissionRate"><InputNumber min={0} max={100} /></Form.Item>
      <Form.Item label="Vertical por defecto" name="defaultVertical"><Select options={[{ label: 'Tech', value: 'tech' }, { label: 'Mujer', value: 'woman' }]} /></Form.Item>
    </Form>
  </Card>
)

export default AdminSettingsPage
