

export const LANDING_SECTION_TYPES = {
  HERO: { key: 'hero', value: 1, label: 'Portada' },
  CARDS: { key: 'cards', value: 2, label: 'Tarjetas' },
  SLIDER: { key: 'slider', value: 3, label: 'Slider' },
}

export const LANDING_SECTION_TYPE_OPTIONS = Object.values(LANDING_SECTION_TYPES).map(type => ({
  value: type.value,
  label: type.label,
}))

export const HERO_VARIANTS = {
  FULL: { key: 'full', value: 1, label: 'Imagen completa' },
  SPLIT: { key: 'split', value: 2, label: 'Imagen a un lado' },
  CENTERED: { key: 'centered', value: 3, label: 'Centrado' },
}

export const CARDS_VARIANTS = {
  GRID: { key: 'grid', value: 1, label: 'Cuadrícula' },
  HORIZONTAL: { key: 'horizontal', value: 2, label: 'Horizontal' },
  MINIMAL: { key: 'minimal', value: 3, label: 'Minimal' },
}

export const SLIDER_VARIANTS = {
  CARDS: { key: 'cards', value: 1, label: 'Cards rectangulares' },
  ROUNDED: { key: 'rounded', value: 2, label: 'Cards redondas' },
  IMAGES: { key: 'images', value: 3, label: 'Imágenes' },
}

export const LANDING_SECTION_VARIANTS = {
  [LANDING_SECTION_TYPES.HERO.value]: HERO_VARIANTS,
  [LANDING_SECTION_TYPES.CARDS.value]: CARDS_VARIANTS,
  [LANDING_SECTION_TYPES.SLIDER.value]: SLIDER_VARIANTS,
}

export const getVariantOptions = typeValue =>
  Object.values(LANDING_SECTION_VARIANTS[typeValue] || {}).map(variant => ({
    value: variant.value,
    label: variant.label,
  }))

export const LANDING_TEMPLATES = {
  ECOMMERCE: { key: 'ecommerce', value: 1, label: 'Ecommerce' },
}

export const LANDING_TEMPLATE_OPTIONS = Object.values(LANDING_TEMPLATES).map(template => ({
  value: template.value,
  label: template.label,
}))

export const SECTIONS_WITH_ITEMS = [LANDING_SECTION_TYPES.CARDS.value, LANDING_SECTION_TYPES.SLIDER.value]
