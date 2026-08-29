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

export const STOREFRONT_HERO_STYLES = Object.freeze({
  IMAGE_PANEL: {
    value: 'image_panel',
    label: 'Imagen lateral',
    description: 'Portada limpia con texto y producto destacado.',
  },
  BACKGROUND: {
    value: 'background',
    label: 'Imagen de fondo',
    description: 'Portada inmersiva para marcas con buena fotografia.',
  },
  SPLIT: {
    value: 'split',
    label: 'Editorial dividida',
    description: 'Composicion mas editorial para catologos visuales.',
  },
  GLASS: {
    value: 'glass',
    label: 'Glass premium',
    description: 'Portada con capas translucidas y sensacion moderna.',
  },
})

export const STOREFRONT_PRODUCT_CARD_STYLES = Object.freeze({
  CLASSIC: {
    value: 'classic',
    label: 'Clasica',
    description: 'Card equilibrada para cualquier tienda.',
  },
  COMPACT: {
    value: 'compact',
    label: 'Compacta',
    description: 'Mas productos visibles por pantalla.',
  },
  EDITORIAL: {
    value: 'editorial',
    description: 'Imagen protagonista y detalle mas aspiracional.',
    label: 'Editorial',
  },
  GLASS: {
    value: 'glass',
    label: 'Glass',
    description: 'Superficie suave con efecto translucido.',
  },
})

export const STOREFRONT_CATEGORY_SLIDER_STYLES = Object.freeze({
  CIRCLES: {
    value: 'circles',
    label: 'Circulos',
    description: 'Categorias redondas tipo boutique.',
  },
  TILES: {
    value: 'tiles',
    label: 'Bloques',
    description: 'Categorias en cards rectangulares con imagen.',
  },
  GLASS: {
    value: 'glass',
    label: 'Glass',
    description: 'Carrusel translucido y premium.',
  },
})

export const STOREFRONT_PRODUCT_DETAIL_LAYOUTS = Object.freeze({
  CLASSIC: {
    value: 'classic',
    label: 'Clasico',
    description: 'Detalle simple y directo.',
  },
  SPLIT: {
    value: 'split',
    label: 'Split premium',
    description: 'Mas aire y jerarquia para productos aspiracionales.',
  },
  GALLERY_FOCUS: {
    value: 'gallery_focus',
    label: 'Galeria protagonista',
    description: 'La fotografia ocupa mas espacio.',
  },
  GLASS: {
    value: 'glass',
    label: 'Glass',
    description: 'Panel de compra con superficie translucida.',
  },
})

export const STOREFRONT_VISUAL_SECTION_STYLES = Object.freeze({
  NONE: {
    value: 'none',
    label: 'Sin bloque visual',
    description: 'Mantiene la portada mas limpia.',
  },
  IMAGE_STRIP: {
    value: 'image_strip',
    label: 'Franja de imagenes',
    description: 'Rellena la portada con imagenes pequenas.',
  },
  EDITORIAL_BANNER: {
    value: 'editorial_banner',
    label: 'Banner editorial',
    description: 'Bloque ancho para reforzar marca.',
  },
  GLASS_MOSAIC: {
    value: 'glass_mosaic',
    label: 'Mosaico glass',
    description: 'Composicion visual moderna con glassmorfismo.',
  },
})

export const STOREFRONT_HERO_STYLE_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_HERO_STYLES).map(style => ({
    label: style.label,
    value: style.value,
  }))
)

export const STOREFRONT_PRODUCT_CARD_STYLE_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_PRODUCT_CARD_STYLES).map(style => ({
    label: style.label,
    value: style.value,
  }))
)

export const STOREFRONT_CATEGORY_SLIDER_STYLE_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_CATEGORY_SLIDER_STYLES).map(style => ({
    label: style.label,
    value: style.value,
  }))
)

export const STOREFRONT_PRODUCT_DETAIL_LAYOUT_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_PRODUCT_DETAIL_LAYOUTS).map(style => ({
    label: style.label,
    value: style.value,
  }))
)

export const STOREFRONT_VISUAL_SECTION_STYLE_OPTIONS = Object.freeze(
  Object.values(STOREFRONT_VISUAL_SECTION_STYLES).map(style => ({
    label: style.label,
    value: style.value,
  }))
)

export const STOREFRONT_STYLE_DEFAULTS = Object.freeze({
  heroStyle: STOREFRONT_HERO_STYLES.IMAGE_PANEL.value,
  productCardStyle: STOREFRONT_PRODUCT_CARD_STYLES.CLASSIC.value,
  categorySliderStyle: STOREFRONT_CATEGORY_SLIDER_STYLES.CIRCLES.value,
  productDetailLayout: STOREFRONT_PRODUCT_DETAIL_LAYOUTS.CLASSIC.value,
  visualSectionStyle: STOREFRONT_VISUAL_SECTION_STYLES.IMAGE_STRIP.value,
})

export const STOREFRONT_SECTION_DEFAULTS = Object.freeze({
  showTrustStrip: true,
  showCategories: true,
  showFeaturedProducts: true,
  showVisualSection: true,
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
    key: 'showVisualSection',
    label: 'Bloque visual',
    description: 'Muestra una franja o mosaico con imagenes de marca.',
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

export const getStorefrontStyleMeta = (collection, value) => (
  Object.values(collection).find(item => item.value === value) ||
  Object.values(collection)[0]
)
