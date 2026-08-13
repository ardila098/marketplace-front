import { Card, Space, Table, Tag, Typography } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { customerContactService } from '../../services/customerContactService'
import {
  FilterGroup,
  FullWidthSpace,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  SearchInput,
} from '../../styles/dashboardStyles'

const formatDate = value => {
  if (!value) return '-'

  return new Intl.DateTimeFormat('es-CO', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

const CustomerContactsPage = () => {
  const [contacts, setContacts] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const debouncedSearch = useDebouncedValue(search)

  const loadContacts = useCallback(async value => {
    setLoading(true)

    try {
      const response = await customerContactService.list({ search: value || undefined })
      setContacts(response.data || [])
    } catch (error) {
      console.error(error)
      setContacts([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadContacts(debouncedSearch)
  }, [debouncedSearch, loadContacts])

  const summary = useMemo(() => ({
    total: contacts.length,
    withEmail: contacts.filter(contact => contact.email).length,
    withPhone: contacts.filter(contact => contact.phone).length,
  }), [contacts])

  const columns = [
    {
      title: 'Contacto',
      render: (_, contact) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{contact.name || contact.email || contact.phone}</Typography.Text>
          {contact.email && <Typography.Text type="secondary">{contact.email}</Typography.Text>}
          {contact.phone && <Typography.Text type="secondary">{contact.phone}</Typography.Text>}
        </Space>
      ),
    },
    {
      title: 'Origen',
      render: (_, contact) => (
        <Space wrap size={6}>
          {(contact.sourceTypes || []).map(source => (
            <Tag key={source}>{source.replaceAll('_', ' ')}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Negocio',
      render: (_, contact) => (
        <Space wrap size={6}>
          {(contact.storeNames || []).map(store => (
            <Tag key={store}>{store}</Tag>
          ))}
        </Space>
      ),
    },
    {
      title: 'Ciudad',
      dataIndex: 'city',
      render: value => value || '-',
    },
    {
      title: 'Ultima interaccion',
      dataIndex: 'lastInteractionAt',
      render: formatDate,
    },
    {
      title: 'Marketing',
      render: (_, contact) => (
        <Tag color={contact.marketingConsent?.accepted ? 'green' : 'default'}>
          {contact.marketingConsent?.accepted ? 'Aceptado' : 'Sin aceptar'}
        </Tag>
      ),
    },
  ]

  return (
    <PageStack>
      <PageIntro>
        <PageTitle>Contactos</PageTitle>
        <PageDescription>
          Clientes potenciales capturados desde leads, reservas y formularios.
        </PageDescription>
      </PageIntro>

      <Card>
        <FullWidthSpace>
          <FilterGroup>
            <Tag>Total: {summary.total}</Tag>
            <Tag>Con email: {summary.withEmail}</Tag>
            <Tag>Con telefono: {summary.withPhone}</Tag>
          </FilterGroup>

          <SearchInput
            allowClear
            value={search}
            placeholder="Buscar por nombre, email, telefono o ciudad"
            onChange={event => setSearch(event.target.value)}
            onSearch={setSearch}
            $width={420}
          />

          <Table
            rowKey="_id"
            columns={columns}
            dataSource={contacts}
            loading={loading}
            pagination={{ pageSize: 10 }}
            scroll={{ x: 860 }}
          />
        </FullWidthSpace>
      </Card>
    </PageStack>
  )
}

export default CustomerContactsPage
