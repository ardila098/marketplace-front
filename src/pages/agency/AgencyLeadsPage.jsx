import { Button, Input, InputNumber, List, Modal, Select, Space, Table, Tag, Typography, message } from 'antd'
import { MessageSquare } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import {
  AGENCY_LEAD_SOURCE_LABELS,
  AGENCY_LEAD_STATUS,
  AGENCY_LEAD_STATUS_COLORS,
  AGENCY_LEAD_STATUS_LABELS,
} from '../../constants/agencyLeads'
import { getAgencyKindLabel } from '../../constants/agencyItems'
import { agencyLeadService } from '../../services/agencyLeadService'
import { currency } from '../../utils/formatters'

const formatDate = value => value ? new Date(value).toLocaleDateString('es-CO') : '-'
const formatDateTime = value => value ? new Date(value).toLocaleString('es-CO') : '-'

const AgencyLeadsPage = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('')
  const [selectedLead, setSelectedLead] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [saving, setSaving] = useState(false)
  const [editValues, setEditValues] = useState({})

  const loadLeads = useCallback(async (params = {}) => {
    setLoading(true)

    try {
      const response = await agencyLeadService.list({
        search: (params.search ?? search) || undefined,
        status: (params.status ?? status) || undefined,
      })

      setLeads(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los leads')
    } finally {
      setLoading(false)
    }
  }, [search, status])

  useEffect(() => {
    loadLeads()
  }, [loadLeads])

  const updateLeadInList = updatedLead => {
    setLeads(current => current.map(lead => (
      lead._id === updatedLead._id ? updatedLead : lead
    )))
    setSelectedLead(updatedLead)
  }

  const handleStatusChange = async (lead, nextStatus) => {
    try {
      const response = await agencyLeadService.update(lead._id, { status: nextStatus })
      updateLeadInList(response.data)
      message.success('Estado actualizado')
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el estado')
    }
  }

  const openModal = lead => {
    setSelectedLead(lead)
    setEditValues({
      potentialValue: lead.potentialValue,
      platformCommissionRate: lead.platformCommissionRate,
      platformCommissionAmount: lead.platformCommissionAmount,
      nextActionAt: lead.nextActionAt ? String(lead.nextActionAt).slice(0, 10) : '',
      lostReason: lead.lostReason,
    })
  }

  const closeModal = () => {
    setSelectedLead(null)
    setNoteText('')
    setEditValues({})
  }

  const handleSaveLead = async () => {
    if (!selectedLead) return

    setSaving(true)

    try {
      const response = await agencyLeadService.update(selectedLead._id, editValues)
      updateLeadInList(response.data)
      message.success('Lead actualizado')
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar el lead')
    } finally {
      setSaving(false)
    }
  }

  const handleSaveNote = async () => {
    if (!selectedLead || !noteText.trim()) return

    setSaving(true)

    try {
      const response = await agencyLeadService.addNote(selectedLead._id, noteText)
      updateLeadInList(response.data)
      setNoteText('')
      message.success('Nota agregada')
    } catch (error) {
      message.error(error?.message || 'No se pudo agregar la nota')
    } finally {
      setSaving(false)
    }
  }

  const columns = [
    {
      title: 'Cliente',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text strong>{lead.customer?.name}</Typography.Text>
          <Typography.Text type="secondary">{lead.customer?.phone}</Typography.Text>
          {lead.customer?.email && <Typography.Text type="secondary">{lead.customer.email}</Typography.Text>}
        </Space>
      ),
    },
    {
      title: 'Anuncio',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{lead.item?.title || '-'}</Typography.Text>
          <Typography.Text type="secondary">
            {getAgencyKindLabel(lead.item?.kind)} - {lead.store?.name || '-'}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Interes',
      render: (_, lead) => (
        <Space direction="vertical" size={0}>
          <Typography.Text>{currency(lead.potentialValue || lead.interest?.budget)}</Typography.Text>
          <Typography.Text type="secondary">
            {AGENCY_LEAD_SOURCE_LABELS[lead.sourceType] || lead.sourceType}
          </Typography.Text>
        </Space>
      ),
    },
    {
      title: 'Estado',
      render: (_, lead) => (
        <Select
          value={lead.status}
          options={AGENCY_LEAD_STATUS}
          onChange={value => handleStatusChange(lead, value)}
          style={{ minWidth: 180 }}
        />
      ),
    },
    {
      title: 'Proxima accion',
      render: (_, lead) => formatDate(lead.nextActionAt),
    },
    {
      title: 'Fecha',
      render: (_, lead) => formatDate(lead.createdAt),
    },
    {
      title: '',
      align: 'right',
      render: (_, lead) => (
        <Button icon={<MessageSquare size={16} />} onClick={() => openModal(lead)}>
          Gestionar
        </Button>
      ),
    },
  ]

  return (
    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
      <div>
        <Typography.Title level={2} style={{ margin: 0, letterSpacing: 0 }}>
          Leads de agencia
        </Typography.Title>
        <Typography.Text type="secondary">
          Gestiona interesados en vehiculos, motos o inmuebles desde un solo lugar.
        </Typography.Text>
      </div>

      <Space wrap>
        <Input.Search
          allowClear
          placeholder="Buscar cliente, correo o telefono"
          value={search}
          onChange={event => setSearch(event.target.value)}
          onSearch={value => loadLeads({ search: value })}
          style={{ width: 320 }}
        />
        <Select
          allowClear
          placeholder="Estado"
          value={status || undefined}
          options={AGENCY_LEAD_STATUS}
          onChange={value => {
            setStatus(value || '')
            loadLeads({ status: value || '' })
          }}
          style={{ width: 220 }}
        />
      </Space>

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={leads}
        loading={loading}
        scroll={{ x: 1050 }}
      />

      <Modal
        title="Gestionar lead"
        open={Boolean(selectedLead)}
        onCancel={closeModal}
        footer={null}
        destroyOnClose
      >
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {selectedLead && (
            <Space wrap>
              <Tag color={AGENCY_LEAD_STATUS_COLORS[selectedLead.status] || 'default'}>
                {AGENCY_LEAD_STATUS_LABELS[selectedLead.status] || selectedLead.status}
              </Tag>
              <Tag>{selectedLead.item?.title}</Tag>
              <Tag>{selectedLead.customer?.phone}</Tag>
            </Space>
          )}

          {selectedLead?.interest?.message && (
            <Typography.Paragraph style={{ margin: 0 }}>
              {selectedLead.interest.message}
            </Typography.Paragraph>
          )}

          <Space size="middle" style={{ width: '100%' }} align="start">
            <div style={{ flex: 1 }}>
              <Typography.Text>Valor potencial</Typography.Text>
              <InputNumber
                min={0}
                value={editValues.potentialValue}
                onChange={value => setEditValues(current => ({ ...current, potentialValue: value }))}
                style={{ width: '100%', marginTop: 6 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Typography.Text>Comision %</Typography.Text>
              <InputNumber
                min={0}
                max={100}
                value={editValues.platformCommissionRate}
                onChange={value => setEditValues(current => ({ ...current, platformCommissionRate: value }))}
                style={{ width: '100%', marginTop: 6 }}
              />
            </div>
          </Space>

          <Space size="middle" style={{ width: '100%' }} align="start">
            <div style={{ flex: 1 }}>
              <Typography.Text>Comision estimada</Typography.Text>
              <InputNumber
                min={0}
                value={editValues.platformCommissionAmount}
                onChange={value => setEditValues(current => ({ ...current, platformCommissionAmount: value }))}
                style={{ width: '100%', marginTop: 6 }}
              />
            </div>
            <div style={{ flex: 1 }}>
              <Typography.Text>Proxima accion</Typography.Text>
              <Input
                value={editValues.nextActionAt}
                placeholder="2026-08-02"
                onChange={event => setEditValues(current => ({ ...current, nextActionAt: event.target.value }))}
                style={{ marginTop: 6 }}
              />
            </div>
          </Space>

          <div>
            <Typography.Text>Motivo de perdida</Typography.Text>
            <Input
              value={editValues.lostReason}
              onChange={event => setEditValues(current => ({ ...current, lostReason: event.target.value }))}
              style={{ marginTop: 6 }}
            />
          </div>

          <Button type="primary" onClick={handleSaveLead} loading={saving}>
            Guardar seguimiento
          </Button>

          <List
            size="small"
            dataSource={selectedLead?.notes || []}
            locale={{ emptyText: 'Sin notas' }}
            renderItem={note => (
              <List.Item>
                <Space direction="vertical" size={0}>
                  <Typography.Text>{note.text}</Typography.Text>
                  <Typography.Text type="secondary">
                    {note.createdBy?.name || 'Usuario'} - {formatDateTime(note.createdAt)}
                  </Typography.Text>
                </Space>
              </List.Item>
            )}
          />

          <Input.TextArea
            rows={3}
            value={noteText}
            onChange={event => setNoteText(event.target.value)}
            placeholder="Escribe una nota de seguimiento"
          />

          <Button onClick={handleSaveNote} loading={saving} disabled={!noteText.trim()}>
            Agregar nota
          </Button>
        </Space>
      </Modal>
    </Space>
  )
}

export default AgencyLeadsPage
