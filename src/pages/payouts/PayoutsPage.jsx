import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Statistic,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { CheckOutlined, DollarOutlined, PlusOutlined } from '@ant-design/icons'
import { useCallback, useMemo, useState, useEffect } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { PAYOUT_STATUS } from '../../constants/orderConstants'
import { ROLES } from '../../constants/roles'
import { useAuth } from '../../hooks/useAuth'
import { orderService } from '../../services/orderService'
import { currency } from '../../utils/formatters'

const emptyTotals = {
  count: 0,
  grossAmount: 0,
  paymentGatewayFeeShare: 0,
  discountShare: 0,
  platformCommissionAmount: 0,
  totalAmount: 0,
}

const formatDate = value => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const getStoreId = record => String(record?.store?._id || record?.store || '')

const getStoreName = record => record?.store?.name || record?.storeNameSnapshot || 'Tienda'

const getOrderNumber = storeOrder => storeOrder?.order?.orderNumber || '-'

const getSummaryValue = (summary, key) => summary?.[key] || emptyTotals

const PayoutsPage = () => {
  const { role } = useAuth()
  const isAdmin = Number(role) === ROLES.ADMIN.value
  const [createForm] = Form.useForm()
  const [payForm] = Form.useForm()
  const [summary, setSummary] = useState(null)
  const [pendingOrders, setPendingOrders] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [payingPayout, setPayingPayout] = useState(null)

  const selectedRows = useMemo(() => {
    const selected = new Set(selectedRowKeys)
    return pendingOrders.filter(order => selected.has(order._id))
  }, [pendingOrders, selectedRowKeys])

  const selectedStoreIds = useMemo(() => {
    return [...new Set(selectedRows.map(getStoreId).filter(Boolean))]
  }, [selectedRows])

  const selectedAmount = selectedRows.reduce((total, row) => {
    return total + Number(row.payoutAmount || 0)
  }, 0)

  const loadPayouts = useCallback(async () => {
    setLoading(true)

    try {
      const params = {
        search: search || undefined,
      }

      const [summaryResponse, pendingResponse, payoutsResponse] = await Promise.all([
        orderService.getPayoutSummary(),
        orderService.getPendingPayouts(params),
        orderService.getPayouts(params),
      ])

      setSummary(summaryResponse.data || null)
      setPendingOrders(pendingResponse.data || [])
      setPayouts(payoutsResponse.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las liquidaciones')
    } finally {
      setLoading(false)
    }
  }, [search])

  useEffect(() => {
    loadPayouts()
  }, [loadPayouts])

  const openCreatePayout = () => {
    if (!selectedRows.length) {
      message.warning('Selecciona al menos una suborden pendiente')
      return
    }

    if (selectedStoreIds.length !== 1) {
      message.warning('Solo puedes liquidar subordenes de una tienda a la vez')
      return
    }

    createForm.setFieldsValue({
      method: 'bank_transfer',
      reference: '',
      notes: '',
      markAsPaid: false,
      paidAt: null,
    })
    setCreateModalOpen(true)
  }

  const closeCreateModal = () => {
    setCreateModalOpen(false)
    createForm.resetFields()
  }

  const handleCreatePayout = async values => {
    setSaving(true)

    try {
      await orderService.createPayout({
        storeId: selectedStoreIds[0],
        storeOrderIds: selectedRowKeys,
        method: values.method,
        reference: values.reference,
        notes: values.notes,
        markAsPaid: Boolean(values.markAsPaid),
        paidAt: values.paidAt?.toISOString?.(),
      })

      message.success('Liquidacion creada correctamente')
      setSelectedRowKeys([])
      closeCreateModal()
      loadPayouts()
    } catch (error) {
      message.error(error?.message || 'No se pudo crear la liquidacion')
    } finally {
      setSaving(false)
    }
  }

  const openPayModal = payout => {
    setPayingPayout(payout)
    payForm.setFieldsValue({
      method: payout.method || 'bank_transfer',
      reference: payout.reference || '',
      paidAt: null,
    })
  }

  const closePayModal = () => {
    setPayingPayout(null)
    payForm.resetFields()
  }

  const handleMarkPaid = async values => {
    if (!payingPayout) return

    setSaving(true)

    try {
      await orderService.markPayoutPaid(payingPayout._id, {
        method: values.method,
        reference: values.reference,
        paidAt: values.paidAt?.toISOString?.(),
      })

      message.success('Pago marcado como realizado')
      closePayModal()
      loadPayouts()
    } catch (error) {
      message.error(error?.message || 'No se pudo marcar el pago')
    } finally {
      setSaving(false)
    }
  }

  const pending = getSummaryValue(summary, 'pending')
  const processing = getSummaryValue(summary, 'processing')
  const paid = getSummaryValue(summary, 'paid')

  const pendingColumns = [
    {
      title: 'Suborden',
      render: (_, storeOrder) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{storeOrder.storeOrderNumber}</Typography.Text>
          <Typography.Text type="secondary">Orden {getOrderNumber(storeOrder)}</Typography.Text>
        </Space>
      ),
    },
    isAdmin && {
      title: 'Tienda',
      render: (_, storeOrder) => getStoreName(storeOrder),
    },
    {
      title: 'Fecha lista',
      render: (_, storeOrder) => formatDate(storeOrder.receivedByPlatformAt || storeOrder.createdAt),
    },
    {
      title: 'Venta',
      render: (_, storeOrder) => currency(storeOrder.subtotal),
    },
    {
      title: 'Descuentos',
      render: (_, storeOrder) => currency(storeOrder.discountShare),
    },
    {
      title: 'Wompi',
      render: (_, storeOrder) => currency(storeOrder.paymentGatewayFeeShare),
    },
    {
      title: 'Comision',
      render: (_, storeOrder) => currency(storeOrder.platformCommissionAmount),
    },
    {
      title: 'A pagar',
      render: (_, storeOrder) => (
        <Typography.Text strong>{currency(storeOrder.payoutAmount)}</Typography.Text>
      ),
    },
  ].filter(Boolean)

  const payoutColumns = [
    {
      title: 'Liquidacion',
      render: (_, payout) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{payout.payoutNumber}</Typography.Text>
          <Typography.Text type="secondary">{formatDate(payout.createdAt)}</Typography.Text>
        </Space>
      ),
    },
    isAdmin && {
      title: 'Tienda',
      render: (_, payout) => payout.store?.name || '-',
    },
    {
      title: 'Estado',
      render: (_, payout) => <StatusTag status={payout.status} />,
    },
    {
      title: 'Subordenes',
      render: (_, payout) => payout.items?.length || 0,
    },
    {
      title: 'Metodo',
      render: (_, payout) => payout.method || '-',
    },
    {
      title: 'Referencia',
      render: (_, payout) => payout.reference || '-',
    },
    {
      title: 'Total pagado',
      render: (_, payout) => (
        <Typography.Text strong>{currency(payout.totalAmount)}</Typography.Text>
      ),
    },
    {
      title: 'Fecha pago',
      render: (_, payout) => formatDate(payout.paidAt),
    },
    isAdmin && {
      title: 'Acciones',
      align: 'right',
      render: (_, payout) => (
        <Button
          icon={<CheckOutlined />}
          disabled={payout.status === PAYOUT_STATUS.PAID.value}
          onClick={() => openPayModal(payout)}
        >
          Marcar pagado
        </Button>
      ),
    },
  ].filter(Boolean)

  const storeSummaryColumns = [
    {
      title: 'Tienda',
      dataIndex: 'storeName',
    },
    {
      title: 'Pendiente',
      render: (_, row) => currency(row.pendingAmount),
    },
    {
      title: 'En proceso',
      render: (_, row) => currency(row.processingAmount),
    },
    {
      title: 'Por pagar',
      render: (_, row) => <Typography.Text strong>{currency(row.outstandingAmount)}</Typography.Text>,
    },
    {
      title: 'Pagado',
      render: (_, row) => currency(row.paidAmount),
    },
  ]

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Liquidaciones
        </Typography.Title>
        <Typography.Text type="secondary">
          {isAdmin
            ? 'Controla saldos pendientes, pagos en proceso e historial de pagos a tiendas.'
            : 'Consulta cuanto esta pendiente por pagarte y el historial de pagos recibidos.'}
        </Typography.Text>
      </div>

      <Row gutter={[16, 16]}>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Pendiente por liquidar"
              value={pending.totalAmount}
              formatter={value => currency(value)}
            />
            <Typography.Text type="secondary">{pending.count} subordenes listas</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="En proceso"
              value={processing.totalAmount}
              formatter={value => currency(value)}
            />
            <Typography.Text type="secondary">{processing.count} liquidaciones abiertas</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} md={8}>
          <Card>
            <Statistic
              title="Pagado historico"
              value={paid.totalAmount}
              formatter={value => currency(value)}
            />
            <Typography.Text type="secondary">{paid.count} pagos registrados</Typography.Text>
          </Card>
        </Col>
      </Row>

      <Card
        title="Subordenes pendientes"
        extra={isAdmin && (
          <Button
            type="primary"
            icon={<PlusOutlined />}
            disabled={!selectedRows.length}
            onClick={openCreatePayout}
          >
            Crear liquidacion
          </Button>
        )}
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap style={{ justifyContent: 'space-between', width: '100%' }}>
            <Input.Search
              allowClear
              placeholder="Buscar suborden, tienda o producto"
              value={search}
              onChange={event => setSearch(event.target.value)}
              onSearch={loadPayouts}
              style={{ maxWidth: 360 }}
            />
            {isAdmin && selectedRows.length > 0 && (
              <Tag color={selectedStoreIds.length === 1 ? 'green' : 'red'}>
                Seleccionado: {currency(selectedAmount)}
              </Tag>
            )}
          </Space>

          <Table
            rowKey="_id"
            columns={pendingColumns}
            dataSource={pendingOrders}
            loading={loading}
            rowSelection={isAdmin ? {
              selectedRowKeys,
              onChange: setSelectedRowKeys,
            } : undefined}
            scroll={{ x: 1040 }}
          />
        </Space>
      </Card>

      {isAdmin && (
        <Card title="Resumen por tienda">
          <Table
            rowKey={row => String(row.store)}
            columns={storeSummaryColumns}
            dataSource={summary?.byStore || []}
            loading={loading}
            pagination={false}
            scroll={{ x: 760 }}
          />
        </Card>
      )}

      <Card title="Historial de liquidaciones">
        <Table
          rowKey="_id"
          columns={payoutColumns}
          dataSource={payouts}
          loading={loading}
          scroll={{ x: 980 }}
          expandable={{
            expandedRowRender: payout => (
              <Space direction="vertical" size={4}>
                {(payout.items || []).map(item => (
                  <Typography.Text key={`${payout._id}-${item.storeOrder?._id || item.storeOrder}`}>
                    {item.storeOrder?.storeOrderNumber || 'Suborden'} - {item.order?.orderNumber || 'Orden'} - {currency(item.payoutAmount)}
                  </Typography.Text>
                ))}
              </Space>
            ),
            rowExpandable: payout => Boolean(payout.items?.length),
          }}
        />
      </Card>

      <Modal
        title="Crear liquidacion"
        open={createModalOpen}
        onCancel={closeCreateModal}
        footer={null}
        destroyOnHidden
      >
        <Form
          form={createForm}
          layout="vertical"
          onFinish={handleCreatePayout}
        >
          <Typography.Paragraph type="secondary">
            Se liquidaran {selectedRows.length} subordenes por {currency(selectedAmount)}.
          </Typography.Paragraph>

          <Form.Item label="Metodo" name="method" rules={[{ required: true }]}>
            <Input placeholder="bank_transfer" />
          </Form.Item>

          <Form.Item label="Referencia" name="reference">
            <Input placeholder="Numero de transferencia o comprobante" />
          </Form.Item>

          <Form.Item label="Notas" name="notes">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Marcar como pagada ahora" name="markAsPaid" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Form.Item label="Fecha de pago" name="paidAt">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving} icon={<DollarOutlined />}>
            Crear liquidacion
          </Button>
        </Form>
      </Modal>

      <Modal
        title="Registrar pago"
        open={Boolean(payingPayout)}
        onCancel={closePayModal}
        footer={null}
        destroyOnHidden
      >
        <Form form={payForm} layout="vertical" onFinish={handleMarkPaid}>
          <Form.Item label="Metodo" name="method" rules={[{ required: true }]}>
            <Input placeholder="bank_transfer" />
          </Form.Item>

          <Form.Item label="Referencia" name="reference" rules={[{ required: true }]}>
            <Input placeholder="Numero de transferencia o comprobante" />
          </Form.Item>

          <Form.Item label="Fecha de pago" name="paidAt">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Button type="primary" htmlType="submit" block loading={saving} icon={<CheckOutlined />}>
            Marcar como pagado
          </Button>
        </Form>
      </Modal>
    </Space>
  )
}

export default PayoutsPage
