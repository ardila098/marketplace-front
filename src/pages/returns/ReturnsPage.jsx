import { Button, Card, Form, Input, Modal, Select, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { returnService } from '../../services/returnService'
import {
  FilterGroup,
  FormActions,
  FullWidthSpace,
  ModalForm,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  SearchInput,
} from '../../styles/dashboardStyles'

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
  const debouncedSearch = useDebouncedValue(search)

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
    loadRequests(debouncedSearch)
  }, [debouncedSearch, loadRequests])

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
      loadRequests(debouncedSearch)
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
    <PageStack>
      <PageIntro>
        <PageTitle>Reclamos</PageTitle>
        <PageDescription>
          Gestiona devoluciones, garantias y solicitudes despues de la compra.
        </PageDescription>
      </PageIntro>

      <Card>
        <FullWidthSpace>
          <FilterGroup>
            <Tag>Total: {summary.total}</Tag>
            <Tag color="gold">Pendientes: {summary.open}</Tag>
            <Tag color="green">Resueltos: {summary.resolved}</Tag>
          </FilterGroup>

          <SearchInput
            allowClear
            value={search}
            placeholder="Buscar por orden, cliente, correo o telefono"
            onChange={event => setSearch(event.target.value)}
            onSearch={setSearch}
            $width={440}
          />

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={requests}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 980 }}
          />
        </FullWidthSpace>
      </Card>

      <Modal
        title="Gestionar reclamo"
        open={!!editingRequest}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <ModalForm form={form} layout="vertical" onFinish={handleSave}>
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

          <FormActions>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={savingId === editingRequest?._id}>
              Guardar
            </Button>
          </FormActions>
        </ModalForm>
      </Modal>
    </PageStack>
  )
}

export default ReturnsPage
