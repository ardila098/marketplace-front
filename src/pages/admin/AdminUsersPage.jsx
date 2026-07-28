import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { Pencil, Plus } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { userService } from '../../services/userService'

const ROLE_INPUT_OPTIONS = [
  { label: 'Admin', value: 1 },
  { label: 'Seller', value: 2 },
  { label: 'Cliente', value: 3 },
]

const ROLE_OPTIONS = [
  { label: 'Todos', value: '' },
  ...ROLE_INPUT_OPTIONS,
]

const roleLabels = {
  1: 'Admin',
  2: 'Seller',
  3: 'Cliente',
}

const roleColors = {
  1: 'purple',
  2: 'blue',
  3: 'green',
}

const AdminUsersPage = () => {
  const [form] = Form.useForm()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)

  const loadUsers = useCallback(async () => {
    setLoading(true)

    try {
      const response = await userService.list({
        search: search || undefined,
        role: role || undefined,
      })

      setUsers(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los usuarios')
    } finally {
      setLoading(false)
    }
  }, [role, search])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const openCreateModal = () => {
    setEditingUser(null)
    form.resetFields()
    form.setFieldsValue({
      role: 3,
      isActive: true,
    })
    setModalOpen(true)
  }

  const openEditModal = user => {
    setEditingUser(user)
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      isActive: user.isActive,
      password: '',
    })
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setEditingUser(null)
    form.resetFields()
  }

  const handleSave = async values => {
    setSaving(true)

    try {
      const payload = {
        ...values,
        isActive: Boolean(values.isActive),
      }

      if (editingUser && !payload.password) {
        delete payload.password
      }

      if (editingUser) {
        await userService.update(editingUser._id, payload)
        message.success('Usuario actualizado correctamente')
      } else {
        await userService.create(payload)
        message.success('Usuario creado correctamente')
      }

      closeModal()
      loadUsers()
    } catch (error) {
      message.error(error?.message || 'No se pudo guardar el usuario')
    } finally {
      setSaving(false)
    }
  }

  const columns = useMemo(() => [
    {
      title: 'Usuario',
      render: (_, user) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{user.name}</Typography.Text>
          <Typography.Text type="secondary">{user.email}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Rol',
      render: (_, user) => (
        <Tag color={roleColors[user.role] || 'default'}>
          {roleLabels[user.role] || user.role}
        </Tag>
      ),
    },
    {
      title: 'Telefono',
      dataIndex: 'phone',
      render: value => value || '-',
    },
    {
      title: 'Estado',
      render: (_, user) => (
        <Tag color={user.isActive ? 'green' : 'default'}>
          {user.isActive ? 'Activo' : 'Inactivo'}
        </Tag>
      ),
    },
    {
      title: 'Creado',
      render: (_, user) => user.createdAt
        ? new Date(user.createdAt).toLocaleDateString('es-CO')
        : '-',
    },
    {
      title: '',
      width: 96,
      align: 'right',
      render: (_, user) => (
        <Button
          aria-label="Editar usuario"
          icon={<Pencil size={16} />}
          onClick={() => openEditModal(user)}
        />
      ),
    },
  ], [])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Usuarios
        </Typography.Title>
        <Typography.Text type="secondary">
          Consulta y administra las cuentas registradas en la plataforma.
        </Typography.Text>
      </div>

      <Space wrap style={{ justifyContent: 'space-between', width: '100%' }}>
        <Space wrap>
          <Input.Search
            allowClear
            placeholder="Buscar por nombre, correo o telefono"
            value={search}
            onChange={event => setSearch(event.target.value)}
            onSearch={loadUsers}
            style={{ width: 340 }}
          />
          <Select
            options={ROLE_OPTIONS}
            value={role}
            onChange={setRole}
            style={{ width: 180 }}
          />
        </Space>

        <Button type="primary" icon={<Plus size={16} />} onClick={openCreateModal}>
          Nuevo usuario
        </Button>
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        scroll={{ x: 840 }}
      />

      <Modal
        title={editingUser ? 'Editar usuario' : 'Nuevo usuario'}
        open={modalOpen}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSave}
          style={{ marginTop: 20 }}
        >
          <Form.Item
            label="Nombre"
            name="name"
            rules={[{ required: true, message: 'El nombre es obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'El email es obligatorio' },
              { type: 'email', message: 'Ingresa un email valido' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Telefono" name="phone">
            <Input />
          </Form.Item>

          <Form.Item
            label="Rol"
            name="role"
            rules={[{ required: true, message: 'Selecciona un rol' }]}
          >
            <Select options={ROLE_INPUT_OPTIONS} />
          </Form.Item>

          <Form.Item
            label={editingUser ? 'Nueva contrasena' : 'Contrasena'}
            name="password"
            rules={editingUser ? [] : [{ required: true, message: 'La contrasena es obligatoria' }]}
          >
            <Input.Password placeholder={editingUser ? 'Dejar vacio para conservarla' : ''} />
          </Form.Item>

          <Form.Item label="Usuario activo" name="isActive" valuePropName="checked">
            <Switch />
          </Form.Item>

          <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
            <Button onClick={closeModal}>
              Cancelar
            </Button>
            <Button type="primary" htmlType="submit" loading={saving}>
              Guardar
            </Button>
          </Space>
        </Form>
      </Modal>
    </Space>
  )
}

export default AdminUsersPage
