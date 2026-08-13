import { Button, Input, List, Modal, Space, Table, Tag, Typography, message } from 'antd'
import { MessageSquare } from 'lucide-react'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  CREDIT_APPLICATION_STATUS,
  CREDIT_APPLICATION_STATUS_COLORS,
  CREDIT_APPLICATION_STATUS_LABELS,
  CREDIT_TYPE_LABELS,
} from '../../constants/creditApplications'
import { ROLES } from '../../constants/roles'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { useAuth } from '../../hooks/useAuth'
import { brokerService } from '../../services/brokerService'
import { creditApplicationService } from '../../services/creditApplicationService'
import {
  FilterGroup,
  FullWidthSpace,
  MinWidthSelect,
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  SearchInput,
  SelectFilter,
} from '../../styles/dashboardStyles'

const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

const formatMoney = value => currencyFormatter.format(Number(value || 0))

const SOURCE_LABELS = {
  broker_landing: 'Landing broker',
  store_credit: 'Tienda / agencia',
  platform: 'Plataforma',
  manual: 'Manual',
}

const CreditApplicationsPage = () => {
  const { role } = useAuth()
  const [applications, setApplications] = useState([])
  const [brokers, setBrokers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [noteModal, setNoteModal] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)
  const debouncedSearch = useDebouncedValue(search)

  const isAdmin = Number(role) === ROLES.ADMIN.value
  const isSeller = Number(role) === ROLES.SELLER.value
  const canUpdateStatus = !isSeller

  const loadApplications = useCallback(async (params = {}) => {
    setLoading(true)

    try {
      const response = await creditApplicationService.list({
        search: (params.search ?? debouncedSearch) || undefined,
        status: (params.status ?? status) || undefined,
      })

      setApplications(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las solicitudes')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, status])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  useEffect(() => {
    if (!isAdmin) return

    brokerService.adminList({ isActive: true })
      .then(response => setBrokers(response.data || []))
      .catch(() => setBrokers([]))
  }, [isAdmin])

  const updateApplicationInList = updatedApplication => {
    setApplications(current => current.map(application => (
      application._id === updatedApplication._id ? updatedApplication : application
    )))
  }

  const handleStatusChange = async (application, nextStatus) => {
    try {
      const response = await creditApplicationService.updateStatus(application._id, nextStatus)
      updateApplicationInList(response.data)
      message.success('Estado actualizado')
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el estado')
    }
  }

  const handleBrokerChange = async (application, brokerId) => {
    try {
      const response = await creditApplicationService.assignBroker(application._id, brokerId || null)
      updateApplicationInList(response.data)
      message.success('Broker asignado')
    } catch (error) {
      message.error(error?.message || 'No se pudo asignar el broker')
    }
  }

  const handleSaveNote = async () => {
    if (!noteModal) return

    setSavingNote(true)

    try {
      const response = await creditApplicationService.addNote(noteModal._id, noteText)
      updateApplicationInList(response.data)
      setNoteModal(response.data)
      setNoteText('')
      message.success('Nota agregada')
    } catch (error) {
      message.error(error?.message || 'No se pudo agregar la nota')
    } finally {
      setSavingNote(false)
    }
  }

  const brokerOptions = useMemo(() => brokers.map(profile => ({
    label: profile.displayName || profile.user?.name,
    value: profile.user?._id || profile.user?.id || profile.user,
  })), [brokers])

  const columns = [
    {
      title: 'Cliente',
      render: (_, application) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{application.customer?.name}</Typography.Text>
          <Typography.Text type="secondary">{application.customer?.email}</Typography.Text>
          <Typography.Text type="secondary">{application.customer?.phone}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Credito',
      render: (_, application) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{CREDIT_TYPE_LABELS[application.creditType] || application.creditType}</Typography.Text>
          <Typography.Text type="secondary">
            {formatMoney(application.values?.requestedAmount || application.values?.assetValue)}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Origen',
      render: (_, application) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{SOURCE_LABELS[application.sourceType] || application.sourceType}</Typography.Text>
          <Typography.Text type="secondary">{application.store?.name || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Broker',
      render: (_, application) => isAdmin ? (
        <MinWidthSelect
          allowClear
          placeholder="Sin asignar"
          value={application.broker?._id || undefined}
          options={brokerOptions}
          onChange={value => handleBrokerChange(application, value)}
          $width={190}
        />
      ) : (
        application.broker?.name || '-'
      ),
    },
    {
      title: 'Estado',
      render: (_, application) => canUpdateStatus ? (
        <MinWidthSelect
          value={application.status}
          options={CREDIT_APPLICATION_STATUS}
          onChange={value => handleStatusChange(application, value)}
          $width={210}
        />
      ) : (
        <Tag color={CREDIT_APPLICATION_STATUS_COLORS[application.status] || 'default'}>
          {CREDIT_APPLICATION_STATUS_LABELS[application.status] || application.status}
        </Tag>
      ),
    },
    {
      title: 'Fecha',
      render: (_, application) => application.createdAt
        ? new Date(application.createdAt).toLocaleDateString('es-CO')
        : '-',
    },
    {
      title: '',
      align: 'right',
      render: (_, application) => (
        <Button icon={<MessageSquare size={16} />} onClick={() => setNoteModal(application)}>
          Notas ({application.notes?.length || 0})
        </Button>
      ),
    },
  ]

  return (
    <PageStack>
      <PageIntro>
        <PageTitle>Solicitudes de asesoria</PageTitle>
        <PageDescription>
          Gestiona contactos interesados en revisar alternativas de credito con un asesor.
        </PageDescription>
      </PageIntro>

      <FilterGroup>
        <SearchInput
          allowClear
          placeholder="Buscar cliente, correo o telefono"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onSearch={setSearch}
        />
        <SelectFilter
          allowClear
          placeholder="Estado"
          value={status || undefined}
          options={CREDIT_APPLICATION_STATUS}
          onChange={value => setStatus(value || '')}
          $width={240}
        />
      </FilterGroup>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={applications}
        loading={loading}
        scroll={{ x: 1100 }}
      />

      <Modal
        title="Notas de seguimiento"
        open={Boolean(noteModal)}
        onCancel={() => {
          setNoteModal(null)
          setNoteText('')
        }}
        footer={null}
        destroyOnClose
      >
        <FullWidthSpace>
          <List
            size="small"
            dataSource={noteModal?.notes || []}
            locale={{ emptyText: 'Sin notas' }}
            renderItem={note => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <Typography.Text>{note.text}</Typography.Text>
                  <Typography.Text type="secondary">
                    {note.createdBy?.name || 'Usuario'} · {note.createdAt ? new Date(note.createdAt).toLocaleString('es-CO') : ''}
                  </Typography.Text>
                </Space>
              </List.Item>
            )}
          />

          <Input.TextArea
            rows={4}
            value={noteText}
            onChange={event => setNoteText(event.target.value)}
            placeholder="Escribe una nota de seguimiento"
          />

          <Button type="primary" onClick={handleSaveNote} loading={savingNote} disabled={!noteText.trim()}>
            Guardar nota
          </Button>
        </FullWidthSpace>
      </Modal>
    </PageStack>
  )
}

export default CreditApplicationsPage
