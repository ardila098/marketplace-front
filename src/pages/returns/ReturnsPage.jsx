import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { returnService } from '../../services/returnService'

const STATUS_OPTIONS = [
  { label: 'Abierta', value: 'open' },
  { label: 'En revision', value: 'reviewing' },
  { label: 'Aprobada', value: 'approved' },
  { label: 'Rechazada', value: 'rejected' },
  { label: 'Producto recibido', value: 'received' },
  { label: 'Resuelta', value: 'resolved' },
]

const REASON_LABELS = {
  warranty: 'Garantia',
  change: 'Cambio',
  wrong_item: 'Producto incorrecto',
  damaged: 'Producto en mal estado',
  other: 'Otro',
}

const statusColors = {
  open: 'gold',
  reviewing: 'blue',
  approved: 'cyan',
  rejected: 'red',
  received: 'purple',
  resolved: 'green',
}

const formatDate = value => {
  if (!value) return '-'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

const getStatusLabel = status => STATUS_OPTIONS.find(option => option.value === status)?.label || status

const ReturnsPage = () => {
  const [form] = Form.useForm()
  const [requests, setRequests] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [savingId, setSavingId] = useState('')
  const [editingRequest, setEditingRequest] = useState(null)

  const loadRequests = useCallback(async value => {
    setLoading(true)

    try {
      const response = await returnService.list({ search: value || undefined })
      setRequests(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los reclamos')
      setRequests([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadRequests()
  }, [loadRequests])

  const summary = useMemo(() => ({
    total: requests.length,
    open: requests.filter(request => ['open', 'reviewing'].includes(request.status)).length,
    resolved: requests.filter(request => request.status === 'resolved').length,
  }), [requests])

  const openEditModal = request => {
    setEditingRequest(request)
    form.setFieldsValue({
      status: request.status,
      resolution: request.resolution,
      note: '',
    })
  }

  const closeModal = () => {
    setEditingRequest(null)
    form.resetFields()
  }

  const handleSave = async values => {
    setSavingId(editingRequest._id)

    try {
      await returnService.update(editingRequest._id, values)
      message.success('Reclamo actualizado')
      closeModal()
      loadRequests(search)
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el reclamo')
    } finally {
      setSavingId('')
    }
  }

  const columns = [
    {
      title: 'Orden',
      render: (_, request) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{request.orderNumber}</Typography.Text>
          <Typography.Text type="secondary">{formatDate(request.createdAt)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Cliente',
      render: (_, request) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{request.customer?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{request.customer?.email}</Typography.Text>
          <Typography.Text type="secondary">{request.customer?.phone || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Motivo',
      render: (_, request) => REASON_LABELS[request.reason] || request.reason,
    },
    {
      title: 'Detalle',
      dataIndex: 'details',
      ellipsis: true,
      render: value => value || '-',
    },
    {
      title: 'Estado',
      render: (_, request) => (
        <Tag color={statusColors[request.status] || 'default'}>
          {getStatusLabel(request.status)}
        </Tag>
      ),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, request) => (
        <Button onClick={() => openEditModal(request)}>
          Gestionar
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Reclamos
        </Typography.Title>
        <Typography.Text type="secondary">
          Gestiona devoluciones, garantias y solicitudes despues de la compra.
        </Typography.Text>
      </div>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <Tag>Total: {summary.total}</Tag>
            <Tag color="gold">Pendientes: {summary.open}</Tag>
            <Tag color="green">Resueltos: {summary.resolved}</Tag>
          </Space>

          <Input.Search
            allowClear
            value={search}
            placeholder="Buscar por orden, cliente, correo o telefono"
            onChange={event => {
              setSearch(event.target.value)
              if (!event.target.value) loadRequests('')
            }}
            onSearch={loadRequests}
            style={{ maxWidth: 440 }}
          />

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={requests}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 980 }}
          />
        </Space>
      </Card>

      <Modal
        title="Gestionar reclamo"
        open={!!editingRequest}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSave} style={{ marginTop: 20 }}>
          <Form.Item
            label="Estado"
            name="status"
            rules={[{ required: true, message: 'Selecciona un estado' }]}
          >
            <Select options={STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item label="Resolucion" name="resolution">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Nota interna" name="note">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={savingId === editingRequest?._id}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default ReturnsPage
