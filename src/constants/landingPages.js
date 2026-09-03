export const LANDING_PAGE_TEMPLATES = Object.freeze({
  PRODUCT_ESSENTIALS: {
    value: 'product_essentials',
    label: 'Producto clásico',
  },
  BUNDLE_SALE: {
    value: 'bundle_sale',
    label: 'Pack promocional',
  },
  AGENCY_CLEAN: {
    value: 'agency_clean',
    label: 'Agencia / servicios',
  },
  INFO_PRODUCT: {
    value: 'infoproduct_launch',
    label: 'Lanzamiento de infoproducto',
  },
  LEAD_CAPTURE: {
    value: 'lead_capture',
    label: 'Captura de leads',
  },
})

export const LANDING_PAGE_TEMPLATE_OPTIONS = Object.freeze(
  Object.values(LANDING_PAGE_TEMPLATES).map(template => ({
    label: template.label,
    value: template.value,
  }))
)

export const LANDING_PAGE_TYPES = Object.freeze({
  PRODUCT: {
    value: 'product',
    label: 'Producto físico',
  },
  SERVICE: {
    value: 'service',
    label: 'Agencia / servicios',
  },
  INFO_PRODUCT: {
    value: 'infoproduct',
    label: 'Infoproducto',
  },
  LEAD: {
    value: 'lead',
    label: 'Captura de leads',
  },
})

export const LANDING_PAGE_TYPE_OPTIONS = Object.freeze(
  Object.values(LANDING_PAGE_TYPES).map(type => ({
    label: type.label,
    value: type.value,
  }))
)

export const getLandingTypeLabel = type => (
  Object.values(LANDING_PAGE_TYPES).find(item => item.value === type)?.label || type
)

export const LANDING_SECTION_TYPES = Object.freeze({
  HEADER: 'header',
  HERO: 'hero',
  FEATURES: 'features',
  GALLERY: 'gallery',
  TESTIMONIALS: 'testimonials',
  FAQ: 'faq',
  GUARANTEE: 'guarantee',
  CONTENT: 'content',
  VIDEO: 'video',
  CTA: 'cta',
  CONVERSION: 'conversion',
  FOOTER: 'footer',
})

export const LANDING_CONVERSION_MODES = Object.freeze({
  ORDER: 'order',
  LEAD: 'lead',
})

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
