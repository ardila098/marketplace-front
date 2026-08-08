import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { shippingService } from '../../services/shippingService'
import { currency } from '../../utils/formatters'

const emptyCourier = {
  name: '',
  phone: '',
  email: '',
  defaultPayoutAmount: 0,
  notes: '',
  isActive: true,
}

const StoreCouriersPage = () => {
  const [form] = Form.useForm()
  const [couriers, setCouriers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [editingCourier, setEditingCourier] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const loadCouriers = useCallback(async () => {
    setLoading(true)

    try {
      const response = await shippingService.listStoreCouriers()
      setCouriers(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los mensajeros')
      setCouriers([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadCouriers()
  }, [loadCouriers])

  const openModal = courier => {
    setEditingCourier(courier || null)
    form.setFieldsValue(courier || emptyCourier)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingCourier(null)
    form.resetFields()
  }

  const handleSubmit = async values => {
    setSaving(true)

    try {
      if (editingCourier?._id) {
        await shippingService.updateStoreCourier(editingCourier._id, values)
        message.success('Mensajero actualizado')
      } else {
        await shippingService.createStoreCourier(values)
        message.success('Mensajero creado')
      }

      closeModal()
      loadCouriers()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar el mensajero')
    } finally {
      setSaving(false)
    }
  }

  const toggleCourier = async courier => {
    try {
      await shippingService.updateStoreCourier(courier._id, {
        ...courier,
        isActive: !courier.isActive,
      })
      message.success('Estado actualizado')
      loadCouriers()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el mensajero')
    }
  }

  const columns = [
    {
      title: 'Mensajero',
      render: (_, courier) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{courier.name}</Typography.Text>
          <Typography.Text type="secondary">{courier.phone || courier.email || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Pago base',
      dataIndex: 'defaultPayoutAmount',
      render: value => currency(value || 0),
    },
    {
      title: 'Estado',
      dataIndex: 'isActive',
      render: isActive => (
        <Tag color={isActive ? 'green' : 'default'}>
          {isActive ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
    {
      title: 'Notas',
      dataIndex: 'notes',
      ellipsis: true,
      render: value => value || '-',
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, courier) => (
        <Space>
          <Button size="small" onClick={() => openModal(courier)}>
            Editar
          </Button>
          <Button size="small" onClick={() => toggleCourier(courier)}>
            {courier.isActive ? 'Desactivar' : 'Activar'}
          </Button>
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Mensajeros
        </Typography.Title>
        <Typography.Text type="secondary">
          Crea los mensajeros propios de tu tienda y asignales entregas locales.
        </Typography.Text>
      </div>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Button type="primary" onClick={() => openModal()}>
            Nuevo mensajero
          </Button>

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={couriers}
            loading={loading}
            pagination={{ pageSize: 10 }}
          />
        </Space>
      </Card>

      <Modal
        title={editingCourier ? 'Editar mensajero' : 'Nuevo mensajero'}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={emptyCourier}
          onFinish={handleSubmit}
          style={{ marginTop: 20 }}
        >
          <Form.Item label="Nombre" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>

          <Form.Item label="Telefono" name="phone">
            <Input />
          </Form.Item>

          <Form.Item label="Correo" name="email">
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Pago base" name="defaultPayoutAmount">
            <Input type="number" min={0} />
          </Form.Item>

          <Form.Item label="Notas" name="notes">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item label="Activo" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeModal}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default StoreCouriersPage
