import { Button, Input, InputNumber, List, Modal, Space, Table, Tag, Typography, message } from 'antd'
import { MessageSquare } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

import {
  AGENCY_LEAD_SOURCE_LABELS,
  AGENCY_LEAD_STATUS,
  AGENCY_LEAD_STATUS_COLORS,
  AGENCY_LEAD_STATUS_LABELS,
} from '../../constants/agencyLeads'
import { getAgencyKindLabel } from '../../constants/agencyItems'
import { useDebouncedValue } from '../../hooks/useDebouncedValue'
import { agencyLeadService } from '../../services/agencyLeadService'
import {
  CompactParagraph,
  FieldBlock,
  FieldGrid,
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
  const debouncedSearch = useDebouncedValue(search)

  const loadLeads = useCallback(async (params = {}) => {
    setLoading(true)

    try {
      const response = await agencyLeadService.list({
        search: (params.search ?? debouncedSearch) || undefined,
        status: (params.status ?? status) || undefined,
      })

      setLeads(response.data || [])
    } catch (error) {
      message.error(error?.message || 'No se pudieron cargar los leads')
    } finally {
      setLoading(false)
    }
  }, [debouncedSearch, status])

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
        <MinWidthSelect
          value={lead.status}
          options={AGENCY_LEAD_STATUS}
          onChange={value => handleStatusChange(lead, value)}
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
    <PageStack>
      <PageIntro>
        <PageTitle>Leads de agencia</PageTitle>
        <PageDescription>
          Gestiona interesados en vehiculos, motos o inmuebles desde un solo lugar.
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
          options={AGENCY_LEAD_STATUS}
          onChange={value => setStatus(value || '')}
        />
      </FilterGroup>

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
        <FullWidthSpace>
          {selectedLead && (
            <FilterGroup>
              <Tag color={AGENCY_LEAD_STATUS_COLORS[selectedLead.status] || 'default'}>
                {AGENCY_LEAD_STATUS_LABELS[selectedLead.status] || selectedLead.status}
              </Tag>
              <Tag>{selectedLead.item?.title}</Tag>
              <Tag>{selectedLead.customer?.phone}</Tag>
            </FilterGroup>
          )}

          {selectedLead?.interest?.message && (
            <CompactParagraph>
              {selectedLead.interest.message}
            </CompactParagraph>
          )}

          <FieldGrid>
            <FieldBlock>
              <Typography.Text>Valor potencial</Typography.Text>
              <InputNumber
                min={0}
                value={editValues.potentialValue}
                onChange={value => setEditValues(current => ({ ...current, potentialValue: value }))}
              />
            </FieldBlock>
            <FieldBlock>
              <Typography.Text>Comision %</Typography.Text>
              <InputNumber
                min={0}
                max={100}
                value={editValues.platformCommissionRate}
                onChange={value => setEditValues(current => ({ ...current, platformCommissionRate: value }))}
              />
            </FieldBlock>
          </FieldGrid>

          <FieldGrid>
            <FieldBlock>
              <Typography.Text>Comision estimada</Typography.Text>
              <InputNumber
                min={0}
                value={editValues.platformCommissionAmount}
                onChange={value => setEditValues(current => ({ ...current, platformCommissionAmount: value }))}
              />
            </FieldBlock>
            <FieldBlock>
              <Typography.Text>Proxima accion</Typography.Text>
              <Input
                value={editValues.nextActionAt}
                placeholder="2026-08-02"
                onChange={event => setEditValues(current => ({ ...current, nextActionAt: event.target.value }))}
              />
            </FieldBlock>
          </FieldGrid>

          <FieldBlock>
            <Typography.Text>Motivo de perdida</Typography.Text>
            <Input
              value={editValues.lostReason}
              onChange={event => setEditValues(current => ({ ...current, lostReason: event.target.value }))}
            />
          </FieldBlock>

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
        </FullWidthSpace>
      </Modal>
    </PageStack>
  )
}

export default AgencyLeadsPage
