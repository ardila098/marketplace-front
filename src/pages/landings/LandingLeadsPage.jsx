import {
  Button,
  Descriptions,
  Divider,
  Drawer,
  Empty,
  Input,
  List,
  Space,
  Table,
  Tag,
  Typography,
  message,
} from 'antd'
import { EyeOutlined } from '@ant-design/icons'
import { useCallback, useEffect, useMemo, useState } from 'react'

import {
  LANDING_LEAD_STATUS_OPTIONS,
  getLandingLeadStatusColor,
  getLandingLeadStatusLabel,
  getLandingPaymentMethodLabel,
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

const renderOptionList = options => {
  return (options || [])
    .map(option => {
      const label = option.label || option.key
      return [label, option.value].filter(Boolean).join(': ')
    })
    .filter(Boolean)
}

const renderSelections = selections => {
  return (selections || [])
    .map(item => {
      const optionValues = renderOptionList(item.options)
        .concat(item.color ? `Color: ${item.color}` : [])
        .concat(item.size ? `Talla: ${item.size}` : [])
      const details = optionValues.join(' / ')

      return [item.label || item.item, details].filter(Boolean).join(': ')
    })
    .filter(Boolean)
    .join(', ')
}

const renderAnswers = answers => {
  return (answers || [])
    .map(answer => [answer.label || answer.key, answer.value].filter(Boolean).join(': '))
    .filter(Boolean)
    .join(' · ')
}

const LandingLeadsPage = () => {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingId, setUpdatingId] = useState(null)
  const [selectedLead, setSelectedLead] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [noteText, setNoteText] = useState('')
  const [savingNote, setSavingNote] = useState(false)

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
      const response = await landingPageService.updateLead(lead._id, { status })
      message.success('Solicitud actualizada')
      setSelectedLead(current =>
        current && current._id === lead._id ? response.data : current
      )
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo actualizar la solicitud')
    } finally {
      setUpdatingId(null)
    }
  }, [loadData])

  const openDetail = useCallback(async lead => {
    setDetailLoading(true)
    setSelectedLead(lead)

    try {
      const response = await landingPageService.getLead(lead._id)
      setSelectedLead(response.data)
    } catch (error) {
      message.error(error?.message || 'No se pudo cargar el detalle de la solicitud')
    } finally {
      setDetailLoading(false)
    }
  }, [])

  const addNote = useCallback(async () => {
    if (!selectedLead || !noteText.trim()) return

    setSavingNote(true)

    try {
      const response = await landingPageService.addLeadNote(selectedLead._id, noteText.trim())
      message.success('Nota agregada')
      setNoteText('')
      setSelectedLead(response.data)
      loadData()
    } catch (error) {
      message.error(error?.message || 'No se pudo agregar la nota')
    } finally {
      setSavingNote(false)
    }
  }, [loadData, noteText, selectedLead])

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
          {lead.conversionMode === 'order' ? (
            <Typography.Text type="secondary">
              {currency(lead.total || lead.estimatedValue)}
              {lead.paymentMethod ? ` · ${getLandingPaymentMethodLabel(lead.paymentMethod)}` : ''}
            </Typography.Text>
          ) : (
            <Typography.Text type="secondary">{currency(lead.estimatedValue)}</Typography.Text>
          )}
        </Space>
      ),
    },
    {
      title: 'Selección',
      render: (_, lead) => renderSelections(lead.selections),
    },
    {
      title: 'Respuestas',
      render: (_, lead) => renderAnswers(lead.answers),
    },
    {
      title: 'Dirección',
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
        <Space>
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => openDetail(lead)}
          >
            Ver detalle
          </Button>
          <LeadStatusSelect
            value={lead.status}
            options={LANDING_LEAD_STATUS_OPTIONS}
            loading={updatingId === lead._id}
            onChange={status => updateStatus(lead, status)}
          />
        </Space>
      ),
    },
  ], [openDetail, updateStatus, updatingId])

  const customer = selectedLead?.customer || {}
  const notes = selectedLead?.notes || []

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
        scroll={{ x: 1400 }}
      />

      <Drawer
        title="Detalle de la solicitud"
        open={Boolean(selectedLead)}
        onClose={() => setSelectedLead(null)}
        width={680}
      >
        {selectedLead ? (
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="center" wrap>
              <Tag color={getLandingLeadStatusColor(selectedLead.status)}>
                {getLandingLeadStatusLabel(selectedLead.status)}
              </Tag>
              {selectedLead.paymentMethod ? (
                <Tag color={selectedLead.paymentMethod === 'wompi' ? 'purple' : 'blue'}>
                  {getLandingPaymentMethodLabel(selectedLead.paymentMethod)}
                </Tag>
              ) : null}
              <LeadStatusSelect
                value={selectedLead.status}
                options={LANDING_LEAD_STATUS_OPTIONS}
                loading={updatingId === selectedLead._id}
                onChange={status => updateStatus(selectedLead, status)}
                size="small"
              />
            </Space>

            <Descriptions title="Cliente" bordered column={1} size="small">
              <Descriptions.Item label="Nombre">{customer.fullName || '-'}</Descriptions.Item>
              <Descriptions.Item label="Email">{customer.email || '-'}</Descriptions.Item>
              <Descriptions.Item label="WhatsApp / teléfono">
                {customer.whatsapp || customer.phone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label="Departamento">{customer.department || '-'}</Descriptions.Item>
              <Descriptions.Item label="Ciudad">{customer.city || '-'}</Descriptions.Item>
              <Descriptions.Item label="Barrio">{customer.neighborhood || '-'}</Descriptions.Item>
              <Descriptions.Item label="Dirección">{customer.address || '-'}</Descriptions.Item>
              <Descriptions.Item label="Complemento">{customer.addressExtra || '-'}</Descriptions.Item>
            </Descriptions>

            {selectedLead.conversionMode === 'order' ? (
              <Descriptions title="Pedido y pago" bordered column={1} size="small">
                <Descriptions.Item label="Número de pedido">
                  {selectedLead.orderNumber || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Método de pago">
                  {getLandingPaymentMethodLabel(selectedLead.paymentMethod) || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Referencia">
                  {selectedLead.paymentReference || '-'}
                </Descriptions.Item>
                <Descriptions.Item label="Subtotal">
                  {currency(selectedLead.subtotal || selectedLead.estimatedValue)}
                </Descriptions.Item>
                {selectedLead.discountTotal > 0 ? (
                  <Descriptions.Item label="Descuento">
                    -{currency(selectedLead.discountTotal)}
                  </Descriptions.Item>
                ) : null}
                <Descriptions.Item label="Total">{currency(selectedLead.total)}</Descriptions.Item>
                {selectedLead.paidAt ? (
                  <Descriptions.Item label="Pagado el">{formatDate(selectedLead.paidAt)}</Descriptions.Item>
                ) : null}
              </Descriptions>
            ) : null}

            {(selectedLead.selections || []).length ? (
              <>
                <Divider orientation="left">Productos y propiedades</Divider>
                <List
                  size="small"
                  dataSource={selectedLead.selections}
                  renderItem={item => (
                    <List.Item>
                      <Space direction="vertical" size={0} style={{ width: '100%' }}>
                        <Typography.Text strong>
                          {item.label || item.item || 'Producto'} × {item.quantity || 1}
                        </Typography.Text>
                        {renderOptionList(item.options).map(option => (
                          <Typography.Text key={option} type="secondary">
                            {option}
                          </Typography.Text>
                        ))}
                      </Space>
                    </List.Item>
                  )}
                />
              </>
            ) : null}

            {(selectedLead.answers || []).filter(answer => answer.value).length ? (
              <>
                <Divider orientation="left">Respuestas del formulario</Divider>
                <List
                  size="small"
                  dataSource={selectedLead.answers.filter(answer => answer.value)}
                  renderItem={answer => (
                    <List.Item>
                      <Space direction="vertical" size={0} style={{ width: '100%' }}>
                        <Typography.Text strong>{answer.label || answer.key}</Typography.Text>
                        <Typography.Text>{String(answer.value)}</Typography.Text>
                      </Space>
                    </List.Item>
                  )}
                />
              </>
            ) : null}

            <Divider orientation="left">Notas de seguimiento</Divider>
            {notes.length ? (
              <List
                size="small"
                dataSource={notes}
                renderItem={note => (
                  <List.Item>
                    <Space direction="vertical" size={0} style={{ width: '100%' }}>
                      <Typography.Text>{note.text}</Typography.Text>
                      <Typography.Text type="secondary">
                        {note.createdBy?.name || 'Usuario'} · {formatDate(note.createdAt)}
                      </Typography.Text>
                    </Space>
                  </List.Item>
                )}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="Sin notas aún" />
            )}

            <Space.Compact style={{ width: '100%' }}>
              <Input.TextArea
                rows={2}
                value={noteText}
                onChange={event => setNoteText(event.target.value)}
                placeholder="Agrega una nota de seguimiento"
              />
            </Space.Compact>
            <Button
              type="primary"
              loading={savingNote}
              disabled={!noteText.trim()}
              onClick={addNote}
              style={{ width: '100%' }}
            >
              Agregar nota
            </Button>
          </Space>
        ) : null}
      </Drawer>
    </PageStack>
  )
}

export default LandingLeadsPage
