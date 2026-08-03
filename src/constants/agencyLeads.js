export const AGENCY_LEAD_STATUS = [
  { label: 'Nuevo', value: 'new', color: 'blue' },
  { label: 'Contactado', value: 'contacted', color: 'cyan' },
  { label: 'Visita agendada', value: 'visit_scheduled', color: 'gold' },
  { label: 'Negociando', value: 'negotiating', color: 'purple' },
  { label: 'Ganado', value: 'won', color: 'green' },
  { label: 'Perdido', value: 'lost', color: 'red' },
  { label: 'Cerrado', value: 'closed', color: 'default' },
]

export const AGENCY_LEAD_STATUS_LABELS = AGENCY_LEAD_STATUS.reduce(
  (acc, status) => ({ ...acc, [status.value]: status.label }),
  {}
)

export const AGENCY_LEAD_STATUS_COLORS = AGENCY_LEAD_STATUS.reduce(
  (acc, status) => ({ ...acc, [status.value]: status.color }),
  {}
)

export const AGENCY_LEAD_SOURCE_LABELS = {
  item_detail: 'Detalle del anuncio',
  store_home: 'Pagina de agencia',
  whatsapp: 'WhatsApp',
  manual: 'Manual',
}

export const PREFERRED_CONTACT_OPTIONS = [
  { label: 'WhatsApp', value: 'whatsapp' },
  { label: 'Llamada', value: 'phone' },
  { label: 'Correo', value: 'email' },
]
