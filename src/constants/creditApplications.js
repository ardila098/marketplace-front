export const CREDIT_APPLICATION_STATUS = [
  { label: 'Nueva', value: 'new', color: 'blue' },
  { label: 'Contactado', value: 'contacted', color: 'cyan' },
  { label: 'Recopilando informacion', value: 'collecting_info', color: 'gold' },
  { label: 'Enviada a aliado', value: 'sent_to_partner', color: 'purple' },
  { label: 'Preaprobada por aliado', value: 'partner_preapproved', color: 'geekblue' },
  { label: 'Aprobada por aliado', value: 'partner_approved', color: 'green' },
  { label: 'Rechazada por aliado', value: 'partner_rejected', color: 'red' },
  { label: 'Cerrada', value: 'closed', color: 'default' },
  { label: 'Perdida', value: 'lost', color: 'volcano' },
]

export const CREDIT_APPLICATION_STATUS_LABELS = CREDIT_APPLICATION_STATUS.reduce(
  (acc, status) => ({ ...acc, [status.value]: status.label }),
  {}
)

export const CREDIT_APPLICATION_STATUS_COLORS = CREDIT_APPLICATION_STATUS.reduce(
  (acc, status) => ({ ...acc, [status.value]: status.color }),
  {}
)

export const CREDIT_TYPE_OPTIONS = [
  { label: 'Vehiculo', value: 'vehicle' },
  { label: 'Vivienda / inmueble', value: 'mortgage' },
  { label: 'Libre inversion', value: 'personal' },
]

export const CREDIT_TYPE_LABELS = CREDIT_TYPE_OPTIONS.reduce(
  (acc, type) => ({ ...acc, [type.value]: type.label }),
  {}
)
