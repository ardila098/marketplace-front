import { Space, Table, Tag, Typography, message } from 'antd'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  LANDING_LEAD_STATUS_OPTIONS,
  getLandingLeadStatusColor,
  getLandingLeadStatusLabel,
} from '../../constants/landingPages'
import { landingPageService } from '../../services/landingPageService'
import {
  PageDescription,
  PageIntro,
  PageStack,
  PageTitle,
  Toolbar,
} from '../../styles/dashboardStyles'
import { currency } from '../../utils/formatters'
import { LeadStatusSelect } from './styles'

const formatDate = value => {
  if (!value) return '-'
  return new Intl.DateTimeFormat('es-CO', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

const renderSelections = selections => {
  const values = (selections || [])
    .map(item => {
      const options = [item.color, item.size].filter(Boolean).join(' / ')
      return [item.label, options].filter(Boolean).join(': ')
    })
    .filter(Boolean)

  return values.length ? values.join(', ') : '-'
}

const LandingLeadsPage = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)

  const loadData = useCallback(async () => {
    setLoading(true)

    try {
      const response = await landingPageService.listLeads()
      setLeads(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar las solicitudes')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const updateStatus = useCallback(async (lead, status) => {
    setUpdatingId(lead._id)

    try {
      await landingPageService.updateLead(lead._id, { status })
      message.success('Solicitud actualizada')
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la solicitud')
    } finally {
      setUpdatingId(null)
    }
  }, [loadData])

  const columns = useMemo(() => [
    {
      title: 'Cliente',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{lead.customer?.fullName || '-'}</Typography.Text>
          <Typography.Text type="secondary">{lead.customer?.email || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Contacto',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{lead.customer?.whatsapp || lead.customer?.phone || '-'}</Typography.Text>
          <Typography.Text type="secondary">{lead.customer?.city || '-'}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Landing',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{lead.landingName || lead.landing?.name || '-'}</Typography.Text>
          <Typography.Text type="secondary">{currency(lead.estimatedValue)}</Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Seleccion',
      render: (_, lead) => renderSelections(lead.selections),
    },
    {
      title: 'Direccion',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{lead.customer?.address || '-'}</Typography.Text>
          <Typography.Text type="secondary">
            {[lead.customer?.neighborhood, lead.customer?.department].filter(Boolean).join(', ') || '-'}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Estado',
      render: (_, lead) => (
        <Tag color={getLandingLeadStatusColor(lead.status)}>
          {getLandingLeadStatusLabel(lead.status)}
        </Tag>
      ),
    },
    {
      title: 'Fecha',
      render: (_, lead) => formatDate(lead.createdAt),
    },
    {
      title: 'Acciones',
      align: 'right',
      render: (_, lead) => (
        <LeadStatusSelect
          value={lead.status}
          options={LANDING_LEAD_STATUS_OPTIONS}
          loading={updatingId === lead._id}
          onChange={status => updateStatus(lead, status)}
        />
      ),
    },
  ], [updateStatus, updatingId])

  return (
    <PageStack>
      <Toolbar align="start">
        <PageIntro>
          <PageTitle>Solicitudes</PageTitle>
          <PageDescription>
            Gestiona los clientes capturados desde tus landings y haz seguimiento comercial.
          </PageDescription>
        </PageIntro>
      </Toolbar>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={leads}
        loading={loading}
        scroll={{ x: 1100 }}
      />
    </PageStack>
  )
}

export default LandingLeadsPage
