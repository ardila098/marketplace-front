import { Button, Card, Col, Form, Input, InputNumber, Row, Select, Space, Switch, Table, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { couponService } from '../../services/couponService'

const couponTypeOptions = [
  { label: 'Porcentaje', value: '1' },
  { label: 'Valor fijo', value: '2' },
  { label: 'Envio gratis', value: '3' },
]

const scopeOptions = [
  { label: 'Plataforma', value: 'global' },
  { label: 'Tienda', value: 'store' },
]

const getReferrerTotal = coupon => {
  return (coupon.usedBy || []).reduce((total, item) => {
    return total + Number(item.referrerCommissionAmount || 0)
  }, 0)
}

const CouponsPage = () => {
  const [form] = Form.useForm()
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const loadCoupons = useCallback(async () => {
    setLoading(true)

    try {
      const response = await couponService.list()
      setCoupons(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los cupones')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCoupons()
  }, [loadCoupons])

  const handleSubmit = async values => {
    setSaving(true)

    try {
      await couponService.create({
        ...values,
        referrer: {
          name: values.referrerName,
          email: values.referrerEmail,
          commissionType: 'percentage',
          commissionValue: values.referrerCommissionValue,
        },
      })

      form.resetFields()
      message.success('Cupon creado correctamente')
      loadCoupons()
    } catch (error) {
      message.error(error?.message || 'No se pudo crear el cupon')
    } finally {
      setSaving(false)
    }
  }

  const handleDeactivate = useCallback(async coupon => {
    try {
      await couponService.remove(coupon._id)
      message.success('Cupon desactivado')
      loadCoupons()
    } catch (error) {
      message.error(error?.message || 'No se pudo desactivar el cupon')
    }
  }, [loadCoupons])

  const columns = useMemo(() => [
    {
      title: 'Codigo',
      dataIndex: 'code',
      render: value => <Typography.Text strong>{value}</Typography.Text>,
    },
    {
      title: 'Descuento',
      render: (_, coupon) => {
        const type = couponTypeOptions.find(item => item.value === coupon.type)?.label || 'Descuento'
        return `${type}: ${coupon.value || 0}${coupon.type === '1' ? '%' : ''}`
      },
    },
    {
      title: 'Alcance',
      render: (_, coupon) => coupon.store?.name || coupon.scope,
    },
    {
      title: 'Usos',
      render: (_, coupon) => `${coupon.usedCount || 0}${coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''}`,
    },
    {
      title: 'Influencer',
      render: (_, coupon) => {
        if (!coupon.referrer?.email) return '-'
        return `${coupon.referrer.email} (${getReferrerTotal(coupon).toLocaleString('es-CO')})`
      },
    },
    {
      title: 'Estado',
      render: (_, coupon) => <StatusTag status={coupon.isActive ? 'active' : 'inactive'} />,
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, coupon) => (
        <Button danger disabled={!coupon.isActive} onClick={() => handleDeactivate(coupon)}>
          Desactivar
        </Button>
      ),
    },
  ], [handleDeactivate])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Cupones
        </Typography.Title>
        <Typography.Text type="secondary">
          Crea descuentos y mide el uso de codigos de influencers.
        </Typography.Text>
      </div>

      <Card>
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            type: '1',
            scope: 'global',
            value: 10,
            usagePerUser: 1,
            isActive: true,
          }}
          onFinish={handleSubmit}
        >
          <Row gutter={16}>
            <Col xs={24} md={8}>
              <Form.Item label="Codigo" name="code" rules={[{ required: true }]}>
                <Input placeholder="EJ: MARIA10" />
              </Form.Item>
            </Col>
            <Col xs={24} md={8}>
              <Form.Item label="Nombre" name="name">
                <Input placeholder="Campana influencer Maria" />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="Tipo" name="type">
                <Select options={couponTypeOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={4}>
              <Form.Item label="Activo" name="isActive" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item label="Alcance" name="scope">
                <Select options={scopeOptions} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Descuento" name="value" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Compra minima" name="minPurchase">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Tope descuento" name="maxDiscount">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>

            <Col xs={24} md={6}>
              <Form.Item label="Limite total" name="usageLimit">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Usos por cliente" name="usagePerUser">
                <InputNumber min={0} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Influencer" name="referrerName">
                <Input placeholder="Nombre" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="Correo influencer" name="referrerEmail">
                <Input placeholder="persona@correo.com" />
              </Form.Item>
            </Col>
            <Col xs={24} md={6}>
              <Form.Item label="% comision influencer" name="referrerCommissionValue">
                <InputNumber min={0} max={100} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>

          <Button type="primary" htmlType="submit" loading={saving}>
            Crear cupon
          </Button>
        </Form>
      </Card>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={coupons}
        scroll={{ x: 900 }}
      />
    </Space>
  )
}

export default CouponsPage
