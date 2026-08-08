import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { ROLES } from '../../constants/roles'
import { shippingService } from '../../services/shippingService'
import { userService } from '../../services/userService'
import { currency } from '../../utils/formatters'

const STATUS_OPTIONS = [
  { label: 'Pendiente', value: 'pending' },
  { label: 'Asignado', value: 'assigned' },
  { label: 'En camino', value: 'in_transit' },
  { label: 'Entregado', value: 'delivered' },
  { label: 'No entregado', value: 'failed' },
  { label: 'Cancelado', value: 'cancelled' },
]

const COURIER_EDITABLE_STATUSES = ['in_transit', 'delivered', 'failed']

const statusColors = {
  pending: 'default',
  assigned: 'blue',
  in_transit: 'gold',
  delivered: 'green',
  failed: 'red',
  cancelled: 'default',
}

const formatDate = value => {
  if (!value) return '-'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

const getStatusLabel = status => {
  return STATUS_OPTIONS.find(option => option.value === status)?.label || status
}

const ShipmentsPage = () => {
  const [assignForm] = Form.useForm()
  const [trackingForm] = Form.useForm()
  const user = useSelector(state => state.auth.user)
  const isCourier = Number(user?.role) === ROLES.COURIER.value
  const isSeller = Number(user?.role) === ROLES.SELLER.value
  const [shipments, setShipments] = useState([])
  const [couriers, setCouriers] = useState([])
  const [summary, setSummary] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState('')
  const [assigningShipment, setAssigningShipment] = useState(null)
  const [trackingShipment, setTrackingShipment] = useState(null)

  const loadShipments = useCallback(async value => {
    setLoading(true)

    try {
      const response = await shippingService.listShipments({
        search: value || undefined,
      })
      setShipments(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los envios')
      setShipments([])
    } finally {
      setLoading(false)
    }
  }, [])

  const loadSummary = useCallback(async () => {
    try {
      const response = await shippingService.getCourierSummary()
      setSummary(response.data)
    } catch (error) {
      setSummary(null)
    }
  }, [])

  const loadCouriers = useCallback(async () => {
    if (isCourier) return

    try {
      const response = isSeller
        ? await shippingService.listStoreCouriers({ isActive: true })
        : await userService.list({ role: ROLES.COURIER.value, isActive: true })
      setCouriers(response.data || [])
    } catch (error) {
      setCouriers([])
    }
  }, [isCourier, isSeller])

  useEffect(() => {
    loadShipments()
    loadSummary()
    loadCouriers()
  }, [loadCouriers, loadShipments, loadSummary])

  const updateStatus = async (shipment, status) => {
    setSavingId(shipment._id)

    try {
      await shippingService.updateStatus(shipment._id, { status })
      message.success('Estado actualizado')
      loadShipments(search)
      loadSummary()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el envio')
    } finally {
      setSavingId('')
    }
  }

  const markCourierPaid = async shipment => {
    setSavingId(shipment._id)

    try {
      await shippingService.markCourierPaid(shipment._id)
      message.success('Pago registrado')
      loadShipments(search)
      loadSummary()
    } catch (error) {
      message.error(error?.message || 'No se pudo registrar el pago')
    } finally {
      setSavingId('')
    }
  }

  const openAssignModal = shipment => {
    setAssigningShipment(shipment)
    assignForm.setFieldsValue({
      courier: isSeller
        ? shipment.storeCourier?._id || shipment.storeCourier || undefined
        : shipment.courier?._id || shipment.courier || undefined,
      courierPayoutAmount: shipment.courierPayoutAmount,
    })
  }

  const assignCourier = async values => {
    setSavingId(assigningShipment._id)

    try {
      const payload = isSeller
        ? { ...values, storeCourier: values.courier }
        : values

      await shippingService.assignCourier(assigningShipment._id, payload)
      message.success('Mensajero asignado')
      setAssigningShipment(null)
      assignForm.resetFields()
      loadShipments(search)
      loadSummary()
    } catch (error) {
      message.error(error?.message || 'No se pudo asignar el mensajero')
    } finally {
      setSavingId('')
    }
  }

  const openTrackingModal = shipment => {
    setTrackingShipment(shipment)
    trackingForm.setFieldsValue({
      provider: shipment.provider,
      trackingNumber: shipment.trackingNumber,
      trackingUrl: shipment.trackingUrl,
      labelUrl: shipment.labelUrl,
    })
  }

  const saveTracking = async values => {
    setSavingId(trackingShipment._id)

    try {
      await shippingService.updateTracking(trackingShipment._id, values)
      message.success('Guia actualizada')
      setTrackingShipment(null)
      trackingForm.resetFields()
      loadShipments(search)
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la guia')
    } finally {
      setSavingId('')
    }
  }

  const summaryCards = useMemo(() => {
    if (!summary) return null

    return (
      <Space wrap>
        <Tag>Total: {summary.total}</Tag>
        <Tag color="green">Entregados: {summary.delivered}</Tag>
        <Tag color="gold">Por pagar: {currency(summary.pendingPayoutAmount)}</Tag>
        <Tag color="blue">Pagado: {currency(summary.paidPayoutAmount)}</Tag>
      </Space>
    )
  }, [summary])

  const columns = [
    {
      title: 'Envio',
      render: (_, shipment) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{shipment.shipmentNumber}</Typography.Text>
          <Typography.Text type="secondary">{shipment.orderNumber}</Typography.Text>
          {shipment.storeOrderNumber && (
            <Typography.Text type="secondary">{shipment.storeOrderNumber}</Typography.Text>
          )}
          {shipment.trackingNumber && (
            shipment.trackingUrl ? (
              <Typography.Link href={shipment.trackingUrl} target="_blank" rel="noreferrer">
                Guia {shipment.trackingNumber}
              </Typography.Link>
            ) : (
              <Typography.Text type="secondary">Guia {shipment.trackingNumber}</Typography.Text>
            )
          )}
        </Space>
      ),
    },
    {
      title: 'Cliente',
      render: (_, shipment) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{shipment.order?.customer?.name || shipment.customerName}</Typography.Text>
          <Typography.Text type="secondary">{shipment.order?.customer?.phone || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Destino',
      render: (_, shipment) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{shipment.addressSnapshot?.address}</Typography.Text>
          <Typography.Text type="secondary">
            {shipment.addressSnapshot?.city}, {shipment.addressSnapshot?.department}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Tipo',
      render: (_, shipment) => (
        <Space direction="vertical" size={4}>
          <Tag>{shipment.method === 'local_courier' ? 'Local' : 'Nacional'}</Tag>
          <Tag color={shipment.salesChannel === 'storefront' ? 'blue' : 'default'}>
            {shipment.salesChannel === 'storefront' ? 'Tienda' : 'Marketplace'}
          </Tag>
        </Space>
      ),
    },
    {
      title: 'Valor',
      render: (_, shipment) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{currency(shipment.chargedAmount)}</Typography.Text>
          {shipment.courierPayoutAmount > 0 && (
            <Typography.Text type="secondary">
              Mensajero: {currency(shipment.courierPayoutAmount)}
            </Typography.Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Mensajero',
      render: (_, shipment) => (
        shipment.storeCourier?.name ||
        shipment.storeCourierName ||
        shipment.courier?.name ||
        shipment.courierName ||
        '-'
      ),
    },
    {
      title: 'Estado',
      render: (_, shipment) => (
        <Space direction="vertical" size={4}>
          <Tag color={statusColors[shipment.status] || 'default'}>
            {getStatusLabel(shipment.status)}
          </Tag>
          <Typography.Text type="secondary">{formatDate(shipment.updatedAt)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, shipment) => (
        <Space wrap style={{ justifyContent: 'flex-end' }}>
          <Select
            size="small"
            value={shipment.status}
            options={isCourier
              ? STATUS_OPTIONS.map(option => ({
                  ...option,
                  disabled: !COURIER_EDITABLE_STATUSES.includes(option.value) && option.value !== shipment.status,
                }))
              : STATUS_OPTIONS}
            loading={savingId === shipment._id}
            onChange={status => updateStatus(shipment, status)}
            style={{ width: 150 }}
          />

          {!isCourier && (
            <Button size="small" onClick={() => openAssignModal(shipment)}>
              Asignar
            </Button>
          )}

          {!isCourier && (
            <Button size="small" onClick={() => openTrackingModal(shipment)}>
              Guia
            </Button>
          )}

          {!isCourier && shipment.courierPayoutStatus === 'pending' && shipment.courierPayoutAmount > 0 && (
            <Button size="small" onClick={() => markCourierPaid(shipment)}>
              Pagar
            </Button>
          )}
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          {isCourier ? 'Mis envios' : isSeller ? 'Envios de mi tienda' : 'Envios'}
        </Typography.Title>
        <Typography.Text type="secondary">
          {isCourier
            ? 'Gestiona las entregas que tienes asignadas.'
            : isSeller
              ? 'Asigna mensajeros propios o registra guias nacionales para las compras de tu tienda.'
              : 'Asigna mensajeros locales y controla el estado de cada despacho.'}
        </Typography.Text>
      </div>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {summaryCards}

          <Input.Search
            allowClear
            value={search}
            placeholder="Buscar por envio, orden, ciudad o direccion"
            onChange={event => {
              setSearch(event.target.value)
              if (!event.target.value) loadShipments('')
            }}
            onSearch={loadShipments}
            style={{ maxWidth: 440 }}
          />

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={shipments}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 1120 }}
          />
        </Space>
      </Card>

      <Modal
        title="Asignar mensajero"
        open={!!assigningShipment}
        onCancel={() => {
          setAssigningShipment(null)
          assignForm.resetFields()
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={assignForm}
          layout="vertical"
          onFinish={assignCourier}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Mensajero"
            name="courier"
            rules={[{ required: true, message: 'Selecciona un mensajero' }]}
          >
            <Select
              options={couriers.map(courier => ({
                label: `${courier.name}${courier.email ? ` - ${courier.email}` : ''}`,
                value: courier._id,
              }))}
            />
          </Form.Item>

          <Form.Item label="Valor a pagar" name="courierPayoutAmount">
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item label="Nota" name="note">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={() => setAssigningShipment(null)}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={!!savingId}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Datos de guia"
        open={!!trackingShipment}
        onCancel={() => {
          setTrackingShipment(null)
          trackingForm.resetFields()
        }}
        footer={null}
        destroyOnClose
      >
        <Form
          form={trackingForm}
          layout="vertical"
          onFinish={saveTracking}
          style={{ marginTop: 20 }}
        >
          <Form.Item label="Proveedor" name="provider">
            <Input placeholder="envia, servientrega, interrapidisimo..." />
          </Form.Item>

          <Form.Item label="Numero de guia" name="trackingNumber">
            <Input />
          </Form.Item>

          <Form.Item label="URL de seguimiento" name="trackingUrl">
            <Input />
          </Form.Item>

          <Form.Item label="URL de etiqueta" name="labelUrl">
            <Input />
          </Form.Item>

          <Form.Item label="Nota" name="note">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={() => setTrackingShipment(null)}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={!!savingId}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default ShipmentsPage
