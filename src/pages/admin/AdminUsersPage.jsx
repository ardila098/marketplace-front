import { Input, Select, Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { userService } from '../../services/userService'

const ROLE_OPTIONS = [
  { label: 'Todos', value: '' },
  { label: 'Admin', value: 1 },
  { label: 'Seller', value: 2 },
  { label: 'Cliente', value: 3 },
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
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [role, setRole] = useState('')

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
  ], [])

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Usuarios
        </Typography.Title>
        <Typography.Text type="secondary">
          Consulta las cuentas registradas en la plataforma.
        </Typography.Text>
      </div>

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

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={users}
        loading={loading}
        scroll={{ x: 760 }}
      />
    </Space>
  )
}

export default AdminUsersPage
