export const STOREFRONT_TEMPLATES = Object.freeze({
  CLASSIC: {
    value: 'classic',
    label: 'Clasica limpia',
    description: 'Catalogo sobrio para tiendas que quieren vender rapido.',
  },
  CLAY_BOUTIQUE: {
    value: 'clay_boutique',
    label: 'Clay boutique',
    description: 'Superficies suaves, visual premium y enfoque en marca.',
  },
  EDITORIAL_CLEAN: {
    value: 'editorial_clean',
    label: 'Editorial catalogo',
    description: 'Composicion visual para tiendas con fotografia fuerte.',
  },
})

export const STOREFRONT_TEMPLATE_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_TEMPLATES).map(template => ({
    label: template.label,
    value: template.value,
  }))
)

export const STOREFRONT_SECTION_DEFAULTS = Object.freeze({
  showTrustStrip: true,
  showCategories: true,
  showFeaturedProducts: true,
  showCreditForm: true,
  showNewsletter: true,
})

export const STOREFRONT_SECTION_OPTIONS = Object.freeze([
  {
    key: 'showTrustStrip',
    label: 'Beneficios de compra',
    description: 'Muestra pago seguro, productos verificados y beneficios.',
  },
  {
    key: 'showCategories',
    label: 'Categorias destacadas',
    description: 'Muestra el carrusel de categorias en la portada.',
  },
  {
    key: 'showFeaturedProducts',
    label: 'Productos destacados',
    description: 'Muestra una seleccion de productos en la portada.',
  },
  {
    key: 'showCreditForm',
    label: 'Asesoria de credito',
    description: 'Muestra el formulario si la tienda tiene broker asignado.',
  },
  {
    key: 'showNewsletter',
    label: 'Captura de correos',
    description: 'Muestra el bloque para capturar clientes potenciales.',
  },
])

export const getStorefrontTemplateMeta = template => (
  Object.values(STOREFRONT_TEMPLATES).find(item => item.value === template) ||
  STOREFRONT_TEMPLATES.CLASSIC
)
