export const EXPERIENCE_LISTING_STATUS = Object.freeze({
  DRAFT: { value: 'draft', label: 'Borrador', color: 'default' },
  PUBLISHED: { value: 'published', label: 'Publicado', color: 'green' },
  PAUSED: { value: 'paused', label: 'Pausado', color: 'gold' },
})

export const EXPERIENCE_LISTING_STATUS_OPTIONS = Object.freeze(
  Object.values(EXPERIENCE_LISTING_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const EXPERIENCE_PRICING_UNITS = Object.freeze({
  NIGHT: { value: 'night', label: 'Por noche' },
  PERSON: { value: 'person', label: 'Por persona' },
  PACKAGE: { value: 'package', label: 'Paquete' },
})

export const EXPERIENCE_PRICING_UNIT_OPTIONS = Object.freeze(
  Object.values(EXPERIENCE_PRICING_UNITS).map(unit => ({
    label: unit.label,
    value: unit.value,
  }))
)

export const BOOKING_REQUEST_STATUS = Object.freeze({
  NEW: { value: 'new', label: 'Nuevo', color: 'blue' },
  CONTACTED: { value: 'contacted', label: 'Contactado', color: 'cyan' },
  PENDING_PAYMENT: { value: 'pending_payment', label: 'Pendiente de pago', color: 'gold' },
  CONFIRMED: { value: 'confirmed', label: 'Confirmada', color: 'green' },
  CANCELLED: { value: 'cancelled', label: 'Cancelada', color: 'red' },
  COMPLETED: { value: 'completed', label: 'Completada', color: 'purple' },
})

export const BOOKING_REQUEST_STATUS_OPTIONS = Object.freeze(
  Object.values(BOOKING_REQUEST_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const getExperienceStatusLabel = value => (
  Object.values(EXPERIENCE_LISTING_STATUS).find(status => status.value === value)?.label || value
)

export const getExperienceStatusColor = value => (
  Object.values(EXPERIENCE_LISTING_STATUS).find(status => status.value === value)?.color || 'default'
)

export const getPricingUnitLabel = value => (
  Object.values(EXPERIENCE_PRICING_UNITS).find(unit => unit.value === value)?.label || value
)

export const getBookingStatusLabel = value => (
  Object.values(BOOKING_REQUEST_STATUS).find(status => status.value === value)?.label || value
)

export const getBookingStatusColor = value => (
  Object.values(BOOKING_REQUEST_STATUS).find(status => status.value === value)?.color || 'default'
)
