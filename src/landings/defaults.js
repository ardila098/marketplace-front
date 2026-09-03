import { LANDING_CONVERSION_MODES } from '../constants/landingPages'
import { THEME_DEFAULTS } from './theme'
import { makeId } from './registry'

const contactFields = [
  { key: 'fullName', label: 'Nombre completo', type: 'text', group: 'contact', required: true, halfWidth: false, placeholder: 'Tu nombre y apellido' },
  { key: 'whatsapp', label: 'WhatsApp / celular', type: 'tel', group: 'contact', required: true, halfWidth: true, placeholder: '3001234567' },
  { key: 'email', label: 'Correo electrónico', type: 'email', group: 'contact', required: true, halfWidth: true, placeholder: 'cliente@email.com' },
]

const shippingFields = [
  { key: 'department', label: 'Departamento', type: 'text', group: 'shipping', required: true, halfWidth: true, placeholder: 'Antioquia' },
  { key: 'city', label: 'Ciudad', type: 'text', group: 'shipping', required: true, halfWidth: true, placeholder: 'Medellín' },
  { key: 'address', label: 'Dirección', type: 'text', group: 'shipping', required: true, halfWidth: false, placeholder: 'Calle, carrera, número' },
  { key: 'neighborhood', label: 'Barrio / comuna', type: 'text', group: 'shipping', required: false, halfWidth: true, placeholder: 'Opcional' },
  { key: 'addressExtra', label: 'Complemento', type: 'text', group: 'shipping', required: false, halfWidth: true, placeholder: 'Torre, apto, indicaciones' },
]

const messageField = {
  key: 'message',
  label: 'Mensaje',
  type: 'textarea',
  group: 'custom',
  required: false,
  halfWidth: false,
  placeholder: 'Cuéntanos qué necesitas',
}

export const FIELD_SETS = Object.freeze({
  product: [...contactFields, ...shippingFields],
  service: [
    { ...contactFields[0] },
    { ...contactFields[1], halfWidth: true },
    { ...contactFields[2], halfWidth: true },
    { ...messageField, label: 'Cuéntanos sobre tu proyecto' },
  ],
  infoproduct: [
    { ...contactFields[0] },
    { ...contactFields[1], halfWidth: true },
    { ...contactFields[2], halfWidth: true },
  ],
  lead: [
    { ...contactFields[0] },
    { ...contactFields[1], halfWidth: true },
    { ...contactFields[2], halfWidth: true },
    { ...messageField },
  ],
})

export const makeProduct = (overrides = {}) => ({
  key: `producto-${makeId().slice(0, 6)}`,
  name: '',
  description: '',
  price: 0,
  compareAtPrice: 0,
  currency: 'COP',
  badge: '',
  image: '',
  images: [],
  options: [],
  includes: [],
  ...overrides,
})

export const makeOption = (overrides = {}) => ({
  key: '',
  label: '',
  control: 'select',
  required: true,
  options: [],
  ...overrides,
})

export const makeChoice = (label = '', value = '', hex = '') => ({ label, value, hex })

export const buildConversion = ({ landingType = 'product', products = [], fields, ...overrides } = {}) => {
  const mode = landingType === 'product' ? LANDING_CONVERSION_MODES.ORDER : LANDING_CONVERSION_MODES.LEAD
  const fieldSource = fields || FIELD_SETS[landingType] || FIELD_SETS.lead

  return {
    enabled: true,
    mode,
    title: mode === LANDING_CONVERSION_MODES.ORDER ? 'Completa tu pedido' : 'Déjanos tus datos',
    subtitle: mode === LANDING_CONVERSION_MODES.ORDER
      ? 'Elige tus opciones y cuéntanos a dónde enviamos tu pedido.'
      : 'Te contactaremos muy pronto para resolver tu solicitud.',
    ctaLabel: mode === LANDING_CONVERSION_MODES.ORDER ? 'Enviar pedido' : 'Enviar solicitud',
    successTitle: '¡Listo!',
    successMessage: 'Recibimos tu solicitud. Te contactaremos muy pronto.',
    termsLabel: 'Acepto términos, condiciones y tratamiento de datos.',
    termsUrl: '',
    fields: fieldSource,
    products,
    ...overrides,
  }
}

export const createLandingDraft = ({ name = '', landingType = 'product', template = '', slug = '' } = {}) => ({
  name,
  slug,
  landingType,
  template,
  schemaVersion: 2,
  metaTitle: '',
  metaDescription: '',
  brand: {
    name: '',
    tagline: '',
    logo: '',
    whatsapp: '',
    email: '',
    instagram: '',
  },
  theme: { ...THEME_DEFAULTS },
  sections: [],
  conversion: buildConversion({ landingType }),
  status: 'draft',
  isActive: true,
})

export const typeToMode = landingType =>
  landingType === 'product' ? LANDING_CONVERSION_MODES.ORDER : LANDING_CONVERSION_MODES.LEAD

export const resolveConversion = landing => {
  const type = landing?.landingType || 'product'
  const stored = landing?.conversion || {}
  const mode = stored.mode || typeToMode(type)
  const fields = stored.fields?.length
    ? stored.fields
    : FIELD_SETS[type] || FIELD_SETS.lead

  return {
    enabled: stored.enabled !== false,
    mode,
    title: stored.title || (mode === LANDING_CONVERSION_MODES.ORDER ? 'Completa tu pedido' : 'Déjanos tus datos'),
    subtitle: stored.subtitle || '',
    ctaLabel: stored.ctaLabel || (mode === LANDING_CONVERSION_MODES.ORDER ? 'Enviar pedido' : 'Enviar solicitud'),
    successTitle: stored.successTitle || '¡Listo!',
    successMessage:
      stored.successMessage || 'Recibimos tu solicitud. Te contactaremos muy pronto.',
    termsLabel: stored.termsLabel || 'Acepto términos, condiciones y tratamiento de datos.',
    termsUrl: stored.termsUrl || '',
    fields,
    products: stored.products || [],
  }
}
