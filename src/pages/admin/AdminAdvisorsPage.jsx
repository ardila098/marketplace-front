import {
  Button,
  Card,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Space,
  Statistic,
  Switch,
  Table,
  Typography,
  message,
} from 'antd'
import { CheckOutlined, DollarOutlined, EditOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'

import StatusTag from '../../components/common/StatusTag'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { advisorService } from '../../services/advisorService'
import { currency } from '../../utils/formatters'

const formatDate = value => {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const AdminAdvisorsPage = () => {
  const [profileForm] = Form.useForm()
  const [payoutForm] = Form.useForm()
  const [payForm] = Form.useForm()
  const [advisors, setAdvisors] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [editingAdvisor, setEditingAdvisor] = useState(null)
  const [selectedAdvisor, setSelectedAdvisor] = useState(null)
  const [payingPayout, setPayingPayout] = useState(null)
  const debouncedSearch = useDebouncedValue(search)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const params = { search: debouncedSearch || undefined }
      const [advisorsResponse, payoutsResponse] = await Promise.all([
        advisorService.adminList(params),
        advisorService.getPayouts(),
      ])

      setAdvisors(advisorsResponse.data || [])
      setPayouts(payoutsResponse.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los asesores')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch])

  useEffect(() => {
    loadData()
  }, [loadData])

  const totals = useMemo(() => {
    return advisors.reduce(
      (acc, item) => {
        acc.assignedStores += Number(item.summary?.assignedStores || 0)
        acc.pending += Number(item.summary?.pending?.totalAmount || 0)
        acc.processing += Number(item.summary?.processing?.totalAmount || 0)
        acc.paid += Number(item.summary?.paid?.totalAmount || 0)
        return acc
      },
      {
        assignedStores: 0,
        pending: 0,
        processing: 0,
        paid: 0,
      }
    )
  }, [advisors])

  const openCreatePayout = advisor => {
    const pendingAmount = Number(advisor.summary?.pending?.totalAmount || 0)

    if (!pendingAmount) {
      message.warning('Este asesor no tiene comisiones pendientes')
      return
    }

    setSelectedAdvisor(advisor)
    payoutForm.setFieldsValue({
      method: 'bank_transfer',
      reference: '',
      notes: '',
      markAsPaid: false,
      paidAt: null,
    })
  }

  const openEditAdvisor = advisor => {
    setEditingAdvisor(advisor)
    profileForm.setFieldsValue({
      commissionRate: advisor.profile?.commissionRate || 0,
      notes: advisor.profile?.notes || '',
    })
  }

  const closeEditAdvisor = () => {
    setEditingAdvisor(null)
    profileForm.resetFields()
  }

  const handleUpdateAdvisor = async values => {
    if (!editingAdvisor?.user?._id) return

    setSaving(true)

    try {
      await advisorService.adminUpdate(editingAdvisor.user._id, values)
      message.success('Asesor actualizado')
      closeEditAdvisor()
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el asesor')
    } finally {
      setSaving(false)
    }
  }

  const closeCreatePayout = () => {
    setSelectedAdvisor(null)
    payoutForm.resetFields()
  }

  const handleCreatePayout = async values => {
    if (!selectedAdvisor?.user?._id) return

    setSaving(true)

    try {
      await advisorService.createPayout({
        advisorId: selectedAdvisor.user._id,
        method: values.method,
        reference: values.reference,
        notes: values.notes,
        markAsPaid: Boolean(values.markAsPaid),
        paidAt: values.paidAt?.toISOString?.(),
      })

      message.success('Liquidacion de asesor creada')
      closeCreatePayout()
      loadData()
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
    if (!payingPayout?._id) return

    setSaving(true)

    try {
      await advisorService.markPayoutPaid(payingPayout._id, {
        method: values.method,
        reference: values.reference,
        paidAt: values.paidAt?.toISOString?.(),
      })

      message.success('Pago marcado como realizado')
      closePayModal()
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo marcar el pago')
    } finally {
      setSaving(false)
    }
  }

  const advisorColumns = [
    {
      title: 'Asesor',
      render: (_, item) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{item.user?.name}</Typography.Text>
          <Typography.Text type="secondary">{item.user?.email}</Typography.Text>
        </Space>
      ),
    },
    {
      title: '% comision',
      render: (_, item) => `${item.profile?.commissionRate || 0}%`,
    },
    {
      title: 'Negocios',
      render: (_, item) => item.summary?.assignedStores || 0,
    },
    {
      title: 'Pendiente',
      render: (_, item) => currency(item.summary?.pending?.totalAmount),
    },
    {
      title: 'En proceso',
      render: (_, item) => currency(item.summary?.processing?.totalAmount),
    },
    {
      title: 'Pagado',
      render: (_, item) => currency(item.summary?.paid?.totalAmount),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, item) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEditAdvisor(item)}>
            Editar
          </Button>
          <Button icon={<DollarOutlined />} onClick={() => openCreatePayout(item)}>
            Liquidar
          </Button>
        </Space>
      ),
    },
  ]

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
    {
      title: 'Asesor',
      render: (_, payout) => payout.advisor?.name || '-',
    },
    {
      title: 'Estado',
      render: (_, payout) => <StatusTag status={payout.status} />,
    },
    {
      title: 'Valor',
      render: (_, payout) => currency(payout.totalAmount),
    },
    {
      title: 'Pagado',
      render: (_, payout) => formatDate(payout.paidAt),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, payout) => payout.status !== 'paid' ? (
        <Button icon={<CheckOutlined />} onClick={() => openPayModal(payout)}>
          Marcar pagado
        </Button>
      ) : null,
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Asesores comerciales
        </Typography.Title>
        <Typography.Text type="secondary">
          Controla tiendas asociadas, comisiones pendientes y pagos realizados.
        </Typography.Text>
      </div>

      <Space wrap>
        <Card loading={loading}><Statistic title="Negocios asociados" value={totals.assignedStores} /></Card>
        <Card loading={loading}><Statistic title="Pendiente" value={currency(totals.pending)} /></Card>
        <Card loading={loading}><Statistic title="En proceso" value={currency(totals.processing)} /></Card>
        <Card loading={loading}><Statistic title="Pagado" value={currency(totals.paid)} /></Card>
      </Space>

      <Input.Search
        allowClear
        placeholder="Buscar asesor"
        value={search}
        onChange={event => setSearch(event.target.value)}
        onSearch={setSearch}
        style={{ maxWidth: 360 }}
      />

      <Table
        rowKey={item => item.user?._id}
        columns={advisorColumns}
        dataSource={advisors}
        loading={loading}
        scroll={{ x: 960 }}
      />

      <Table
        title={() => 'Historial de liquidaciones'}
        rowKey="_id"
        columns={payoutColumns}
        dataSource={payouts}
        loading={loading}
        scroll={{ x: 900 }}
      />

      <Modal
        title="Configurar asesor"
        open={Boolean(editingAdvisor)}
        onCancel={closeEditAdvisor}
        footer={null}
        destroyOnClose
      >
        <Form form={profileForm} layout="vertical" onFinish={handleUpdateAdvisor}>
          <Form.Item
            label="Comision del asesor (%)"
            name="commissionRate"
            rules={[{ required: true, message: 'Ingresa el porcentaje' }]}
          >
            <InputNumber min={0} max={100} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Notas internas" name="notes">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeEditAdvisor}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Crear liquidacion de asesor"
        open={Boolean(selectedAdvisor)}
        onCancel={closeCreatePayout}
        footer={null}
        destroyOnClose
      >
        <Typography.Paragraph type="secondary">
          Se liquidaran todas las comisiones pendientes de {selectedAdvisor?.user?.name}.
        </Typography.Paragraph>

        <Form form={payoutForm} layout="vertical" onFinish={handleCreatePayout}>
          <Form.Item label="Metodo" name="method">
            <Input />
          </Form.Item>
          <Form.Item label="Referencia" name="reference">
            <Input />
          </Form.Item>
          <Form.Item label="Notas" name="notes">
            <Input.TextArea rows={3} />
          </Form.Item>
          <Form.Item label="Marcar como pagada" name="markAsPaid" valuePropName="checked">
            <Switch />
          </Form.Item>
          <Form.Item label="Fecha de pago" name="paidAt">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeCreatePayout}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Crear
            </Button>
          </Space>
        </Form>
      </Modal>

      <Modal
        title="Marcar liquidacion pagada"
        open={Boolean(payingPayout)}
        onCancel={closePayModal}
        footer={null}
        destroyOnClose
      >
        <Form form={payForm} layout="vertical" onFinish={handleMarkPaid}>
          <Form.Item label="Metodo" name="method">
            <Input />
          </Form.Item>
          <Form.Item label="Referencia" name="reference">
            <Input />
          </Form.Item>
          <Form.Item label="Fecha de pago" name="paidAt">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closePayModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default AdminAdvisorsPage
