
export const LANDING_PAGE_STATUS = Object.freeze({
  DRAFT: {
    value: 'draft',
    label: 'Borrador',
    color: 'default',
  },
  PUBLISHED: {
    value: 'published',
    label: 'Publicada',
    color: 'green',
  },
  PAUSED: {
    value: 'paused',
    label: 'Pausada',
    color: 'gold',
  },
})

export const LANDING_PAGE_STATUS_OPTIONS = Object.freeze(
  Object.values(LANDING_PAGE_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const LANDING_LEAD_STATUS = Object.freeze({
  NEW: {
    value: 'new',
    label: 'Nuevo',
    color: 'blue',
  },
  CONTACTED: {
    value: 'contacted',
    label: 'Contactado',
    color: 'gold',
  },
  CONVERTED: {
    value: 'converted',
    label: 'Convertido',
    color: 'green',
  },
  LOST: {
    value: 'lost',
    label: 'Perdido',
    color: 'red',
  },
})

export const LANDING_LEAD_STATUS_OPTIONS = Object.freeze(
  Object.values(LANDING_LEAD_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const LANDING_DOMAIN_STATUS = Object.freeze({
  NOT_CONFIGURED: {
    value: 'not_configured',
    label: 'Sin configurar',
    color: 'default',
  },
  PENDING_VERIFICATION: {
    value: 'pending_verification',
    label: 'Pendiente de verificacion',
    color: 'gold',
  },
  VERIFIED: {
    value: 'verified',
    label: 'Verificado',
    color: 'green',
  },
  REJECTED: {
    value: 'rejected',
    label: 'Rechazado',
    color: 'red',
  },
})

export const LANDING_DOMAIN_STATUS_OPTIONS = Object.freeze(
  Object.values(LANDING_DOMAIN_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const getLandingStatusLabel = status => (
  Object.values(LANDING_PAGE_STATUS).find(item => item.value === status)?.label || status
)

export const getLandingStatusColor = status => (
  Object.values(LANDING_PAGE_STATUS).find(item => item.value === status)?.color || 'default'
)

export const getLandingLeadStatusLabel = status => (
  Object.values(LANDING_LEAD_STATUS).find(item => item.value === status)?.label || status
)

export const getLandingLeadStatusColor = status => (
  Object.values(LANDING_LEAD_STATUS).find(item => item.value === status)?.color || 'default'
)

export const getLandingDomainStatusLabel = status => (
  Object.values(LANDING_DOMAIN_STATUS).find(item => item.value === status)?.label || status
)

export const getLandingDomainStatusColor = status => (
  Object.values(LANDING_DOMAIN_STATUS).find(item => item.value === status)?.color || 'default'
)
