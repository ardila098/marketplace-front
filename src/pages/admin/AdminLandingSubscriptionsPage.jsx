import {
  Button,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  Toolbar,
} from '../../styles/dashboardStyles'
import { ROLES } from '../../constants/roles'
import { landingSubscriptionService } from '../../services/landingSubscriptionService'
import { userService } from '../../services/userService'

const STATUS_OPTIONS = [
  { label: 'Activa', value: 'active' },
  { label: 'Pago vencido', value: 'past_due' },
  { label: 'Cancelada', value: 'cancelled' },
  { label: 'Expirada', value: 'expired' },
]

const STATUS_META = Object.freeze({
  active: { label: 'Activa', color: 'green' },
  past_due: { label: 'Pago vencido', color: 'gold' },
  cancelled: { label: 'Cancelada', color: 'red' },
  expired: { label: 'Expirada', color: 'default' },
})

const formatDate = value => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Bogota',
  }).format(new Date(value))
}

const getEffectiveStatus = row => {
  if (row?.status === 'active' && row?.endsAt && new Date(row.endsAt) <= new Date()) {
    return 'expired'
  }
  return row?.status
}

const AdminLandingSubscriptionsPage = () => {
  const [form] = Form.useForm()
  const [subscriptions, setSubscriptions] = useState([])
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const [subscriptionsResponse, usersResponse] = await Promise.all([
        landingSubscriptionService.listAll(),
        userService.list({ role: ROLES.LANDING.value }),
      ])

      setSubscriptions(subscriptionsResponse.data || [])
      setUsers(usersResponse.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los planes de correo')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const userOptions = useMemo(() => {
    return users.map(user => ({
      label: `${user.name} · ${user.email}`,
      value: user._id,
    }))
  }, [users])

  const openCreate = () => {
    setEditing(null)
    form.resetFields()
    setModalOpen(true)
  }

  const openEdit = subscription => {
    setEditing(subscription)
    form.setFieldsValue({
      user: subscription.user?._id || subscription.user,
      billingPeriod: subscription.billingPeriod,
      price: subscription.price,
      status: subscription.status,
      startsAt: subscription.startsAt ? dayjs(subscription.startsAt) : null,
      endsAt: subscription.endsAt ? dayjs(subscription.endsAt) : null,
      notes: subscription.notes,
    })
    setModalOpen(true)
  }

  const handleSave = async () => {
    const values = await form.validateFields()
    setSaving(true)

    try {
      const payload = {
        ...values,
        startsAt: values.startsAt ? values.startsAt.toISOString() : undefined,
        endsAt: values.endsAt ? values.endsAt.toISOString() : undefined,
      }

      if (editing) {
        await landingSubscriptionService.update(editing._id, payload)
      } else {
        await landingSubscriptionService.upsert(payload)
      }

      message.success('Plan guardado')
      setModalOpen(false)
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar el plan')
    } finally {
      setSaving(false)
    }
  }

  const setStatus = async (subscription, status) => {
    try {
      await landingSubscriptionService.update(subscription._id, { status })
      message.success('Estado actualizado')
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el estado')
    }
  }

  const renew = async subscription => {
    const base = subscription.endsAt && new Date(subscription.endsAt) > new Date()
      ? dayjs(subscription.endsAt)
      : dayjs()
    const endsAt = subscription.billingPeriod === 'yearly'
      ? base.add(12, 'month')
      : base.add(1, 'month')

    try {
      await landingSubscriptionService.update(subscription._id, {
        status: 'active',
        endsAt: endsAt.toISOString(),
      })
      message.success('Plan renovado')
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo renovar el plan')
    }
  }

  const columns = [
    {
      title: 'Usuario',
      render: (_, row) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{row.userName || row.user?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{row.userEmail || row.user?.email || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Periodo',
      render: (_, row) => (row.billingPeriod === 'yearly' ? 'Anual' : 'Mensual'),
    },
    {
      title: 'Precio',
      render: (_, row) =>
        new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          maximumFractionDigits: 0,
        }).format(row.price || 0),
    },
    {
      title: 'Estado',
      render: (_, row) => {
        const active =
          row.status === 'active' && (!row.endsAt || new Date(row.endsAt) > new Date())
        const effectiveStatus = getEffectiveStatus(row)
        const meta =
          STATUS_META[effectiveStatus] || { label: effectiveStatus, color: 'default' }
        return <Tag color={active ? 'green' : meta.color}>{active ? 'Activa' : meta.label}</Tag>
      },
    },
    {
      title: 'Inicio',
      render: (_, row) => formatDate(row.startsAt),
    },
    {
      title: 'Vence',
      render: (_, row) => formatDate(row.endsAt),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, row) => {
        const effectiveStatus = getEffectiveStatus(row)

        return (
          <Space>
            <Button size="small" onClick={() => openEdit(row)}>Editar</Button>
            <Button size="small" type="primary" ghost onClick={() => renew(row)}>
              Renovar {row.billingPeriod === 'yearly' ? '1 año' : '1 mes'}
            </Button>
            {effectiveStatus === 'active' ? (
              <Button size="small" danger onClick={() => setStatus(row, 'cancelled')}>
                Desactivar
              </Button>
            ) : (
              <Button size="small" type="primary" ghost onClick={() => setStatus(row, 'active')}>
                Activar
              </Button>
            )}
          </Space>
        )
      },
    },
  ]

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Plan de correo de landings</PageTitle>
          <PageDescription>
            Activa, desactiva o asigna fecha de vencimiento del servicio de correo por dueño de landing.
          </PageDescription>
        </PageIntro>
        <Button type="primary" onClick={openCreate}>Nuevo plan</Button>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={subscriptions}
        loading={loading}
        pagination={{ pageSize: 10 }}
        scroll={{ x: 900 }}
      />

      <Modal
        title={editing ? 'Editar plan de correo' : 'Nuevo plan de correo'}
        open={modalOpen}
        onCancel={() => setModalOpen(false)}
        onOk={handleSave}
        confirmLoading={saving}
        okText="Guardar"
        width={520}
      >
        <Form form={form} layout="vertical" style={{ marginTop: 14 }}>
          <Form.Item
            label="Dueño de landing"
            name="user"
            rules={[{ required: true, message: 'Selecciona el usuario' }]}
          >
            <Select
              showSearch
              optionFilterProp="label"
              options={userOptions}
              disabled={Boolean(editing)}
              placeholder="Busca por nombre o correo"
            />
          </Form.Item>

          <Form.Item label="Periodo" name="billingPeriod" rules={[{ required: true }]}>
            <Select
              options={[
                { label: 'Mensual', value: 'monthly' },
                { label: 'Anual', value: 'yearly' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Precio (COP)" name="price">
            <InputNumber min={0} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Estado" name="status" rules={[{ required: true }]}>
            <Select options={STATUS_OPTIONS} />
          </Form.Item>

          <Form.Item label="Inicio" name="startsAt">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Fecha de vencimiento" name="endsAt">
            <DatePicker showTime style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item label="Nota" name="notes">
            <Input.TextArea rows={2} />
          </Form.Item>
        </Form>
      </Modal>
    </PageStack>
  )
}

export default AdminLandingSubscriptionsPage
