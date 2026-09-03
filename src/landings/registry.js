const createId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID()
  return `section-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

export const cloneValue = value => JSON.parse(JSON.stringify(value || null))

const baseHeadingFields = [
  { path: 'data.eyebrow', label: 'Eyebrow / etiqueta', type: 'text', placeholder: 'Oferta por tiempo limitado' },
  { path: 'data.title', label: 'Título', type: 'textarea', placeholder: 'Título principal de la sección' },
  { path: 'data.subtitle', label: 'Subtítulo', type: 'textarea', placeholder: 'Describe brevemente la sección' },
]

export const SECTION_GROUPS = Object.freeze([
  {
    key: 'estructura',
    label: 'Estructura',
    sections: ['header', 'cta', 'footer'],
  },
  {
    key: 'contenido',
    label: 'Contenido',
    sections: ['hero', 'content', 'video', 'features', 'gallery'],
  },
  {
    key: 'confianza',
    label: 'Confianza',
    sections: ['testimonials', 'faq', 'guarantee'],
  },
  {
    key: 'conversion',
    label: 'Captura',
    sections: ['conversion'],
  },
])

const commonCardStyleOptions = [
  { value: 'rounded', label: 'Redondeadas' },
  { value: 'bordered', label: 'Con bordes' },
  { value: 'shadow', label: 'Con sombra' },
  { value: 'plain', label: 'Sin tarjeta' },
]

const commonCardStyleField = {
  path: 'settings.cardStyle',
  label: 'Estilo de tarjetas',
  type: 'select',
  options: commonCardStyleOptions,
}

export const SECTION_DEFINITIONS = Object.freeze({
  header: {
    type: 'header',
    label: 'Encabezado',
    description: 'Marca, navegación simple y botón de acción.',
    group: 'estructura',
    defaultVariant: 'default',
    variants: [
      { value: 'default', label: 'Clásico' },
      { value: 'minimal', label: 'Minimal' },
    ],
    defaultData: {
      logoText: '',
      ctaLabel: 'Cotizar ahora',
      showCta: true,
      whatsapp: '',
      menuLinks: [
        { label: 'Beneficios', href: '#beneficios' },
        { label: 'Testimonios', href: '#testimonios' },
      ],
    },
    defaultSettings: { variant: 'default', sticky: true },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'settings.sticky', label: 'Fijo al hacer scroll', type: 'switch' },
      { path: 'data.logoText', label: 'Texto de marca', type: 'text' },
      { path: 'data.ctaLabel', label: 'Texto del botón', type: 'text' },
      { path: 'data.showCta', label: 'Mostrar botón', type: 'switch' },
      { path: 'data.whatsapp', label: 'WhatsApp', type: 'text', placeholder: '3001234567' },
      {
        path: 'data.menuLinks',
        label: 'Enlaces del menú',
        type: 'objectList',
        addLabel: 'Agregar enlace',
        itemLabel: 'Enlace',
        itemFields: [
          { path: 'label', label: 'Texto', type: 'text' },
          { path: 'href', label: 'Destino (#seccion o URL)', type: 'text' },
        ],
      },
    ],
  },

  hero: {
    type: 'hero',
    label: 'Portada',
    description: 'Mensaje principal de la landing con imagen y CTA.',
    group: 'contenido',
    defaultVariant: 'split',
    variants: [
      { value: 'split', label: 'Texto + imagen' },
      { value: 'imageLeft', label: 'Imagen + texto' },
      { value: 'centered', label: 'Centrada' },
      { value: 'fullImage', label: 'Imagen de fondo completa' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Convierte visitantes en clientes',
      subtitle: 'Edita este texto y sube tu imagen para crear una portada profesional.',
      primaryLabel: 'Quiero esto ahora',
      secondaryLabel: '',
      badge: '',
      image: '',
      imageAlt: '',
      titleFontSize: 0,
      titleColor: '',
      subtitleFontSize: 0,
      subtitleColor: '',
      eyebrowFontSize: 0,
      eyebrowColor: '',
    },
    defaultSettings: { variant: 'split', align: 'left', minHeight: 'auto' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'settings.align', label: 'Alineación', type: 'select', options: [
        { value: 'left', label: 'Izquierda' },
        { value: 'center', label: 'Centro' },
      ] },
      { path: 'data.eyebrow', label: 'Eyebrow / etiqueta', type: 'text' },
      { path: 'data.title', label: 'Título', type: 'textarea' },
      { path: 'data.subtitle', label: 'Subtítulo', type: 'textarea' },
      { path: 'data.primaryLabel', label: 'Texto botón principal', type: 'text' },
      { path: 'data.secondaryLabel', label: 'Texto botón secundario', type: 'text' },
      { path: 'data.badge', label: 'Etiqueta / badge', type: 'text', placeholder: 'Envío gratis' },
      { path: 'data.image', label: 'Imagen de portada', type: 'image' },
      { path: 'data.imageAlt', label: 'Texto alternativo de imagen', type: 'text' },
      { path: 'data.eyebrowFontSize', label: 'Tamaño del eyebrow (px)', type: 'number', min: 10, max: 48 },
      { path: 'data.eyebrowColor', label: 'Color del eyebrow', type: 'color' },
      { path: 'data.titleFontSize', label: 'Tamaño del título (px)', type: 'number', min: 20, max: 140 },
      { path: 'data.titleColor', label: 'Color del título', type: 'color' },
      { path: 'data.subtitleFontSize', label: 'Tamaño del subtítulo (px)', type: 'number', min: 12, max: 60 },
      { path: 'data.subtitleColor', label: 'Color del subtítulo', type: 'color' },
    ],
  },

  content: {
    type: 'content',
    label: 'Texto + imagen',
    description: 'Bloque flexible para explicar servicios, historias o contenido.',
    group: 'contenido',
    defaultVariant: 'twoColumn',
    variants: [
      { value: 'twoColumn', label: 'Texto e imagen' },
      { value: 'textOnly', label: 'Solo texto' },
      { value: 'imageOnly', label: 'Solo imagen' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Cuenta tu historia',
      body: 'Usa este bloque para explicar el valor de tu servicio, el detalle de tu producto o el contenido de tu infoproducto.',
      image: '',
      imageAlt: '',
      primaryLabel: '',
      primaryHref: '',
    },
    defaultSettings: { variant: 'twoColumn', imageSide: 'right' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'settings.imageSide', label: 'Lado de la imagen', type: 'select', options: [
        { value: 'right', label: 'Derecha' },
        { value: 'left', label: 'Izquierda' },
      ] },
      { path: 'data.eyebrow', label: 'Eyebrow / etiqueta', type: 'text' },
      { path: 'data.title', label: 'Título', type: 'textarea' },
      { path: 'data.body', label: 'Texto', type: 'textarea', rows: 8 },
      { path: 'data.image', label: 'Imagen', type: 'image' },
      { path: 'data.primaryLabel', label: 'Texto del enlace', type: 'text' },
      { path: 'data.primaryHref', label: 'Destino del enlace', type: 'text' },
    ],
  },

  video: {
    type: 'video',
    label: 'Video',
    description: 'Video de YouTube, Vimeo o MP4, a todo lo ancho o acompañado de texto.',
    group: 'contenido',
    defaultVariant: 'contained',
    variants: [
      { value: 'contained', label: 'Contenedor centrado' },
      { value: 'fullWidth', label: 'A todo lo ancho' },
      { value: 'split', label: 'Texto + video' },
    ],
    defaultData: {
      eyebrow: '',
      title: '',
      subtitle: '',
      videoUrl: '',
      poster: '',
      autoplay: false,
      loop: false,
      showControls: true,
      titleFontSize: 0,
      titleColor: '',
      subtitleColor: '',
    },
    defaultSettings: { variant: 'contained', aspectRatio: '16 / 9' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'data.videoUrl', label: 'URL del video', type: 'text', hint: 'Pega una URL de YouTube, Vimeo o un archivo .mp4' },
      { path: 'data.poster', label: 'Imagen de portada / poster', type: 'image' },
      { path: 'data.autoplay', label: 'Reproducir automáticamente', type: 'switch' },
      { path: 'data.loop', label: 'Repetir video', type: 'switch' },
      { path: 'data.showControls', label: 'Mostrar controles', type: 'switch' },
      { path: 'data.eyebrow', label: 'Eyebrow / etiqueta', type: 'text' },
      { path: 'data.title', label: 'Título', type: 'textarea' },
      { path: 'data.subtitle', label: 'Subtítulo', type: 'textarea' },
      { path: 'data.titleFontSize', label: 'Tamaño del título (px)', type: 'number', min: 18, max: 100 },
      { path: 'data.titleColor', label: 'Color del título', type: 'color' },
      { path: 'data.subtitleColor', label: 'Color del subtítulo', type: 'color' },
    ],
  },

  features: {
    type: 'features',
    label: 'Beneficios',
    description: 'Tarjetas con beneficios, servicios o características del producto.',
    group: 'contenido',
    defaultVariant: 'grid',
    variants: [
      { value: 'grid', label: 'Cuadrícula' },
      { value: 'list', label: 'Lista' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Beneficios que importan',
      subtitle: '',
      items: [
        { icon: '✨', title: 'Beneficio uno', description: 'Escribe el primer beneficio o característica.' },
        { icon: '🚀', title: 'Beneficio dos', description: 'Escribe el segundo beneficio o característica.' },
        { icon: '🎯', title: 'Beneficio tres', description: 'Escribe el tercer beneficio o característica.' },
      ],
    },
    defaultSettings: { variant: 'grid', cardStyle: 'bordered', columns: 3 },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      commonCardStyleField,
      { path: 'settings.columns', label: 'Columnas', type: 'select', options: [
        { value: 2, label: '2 columnas' },
        { value: 3, label: '3 columnas' },
        { value: 4, label: '4 columnas' },
      ] },
      ...baseHeadingFields,
      {
        path: 'data.items',
        label: 'Beneficios',
        type: 'objectList',
        addLabel: 'Agregar beneficio',
        itemLabel: 'Beneficio',
        itemFields: [
          { path: 'icon', label: 'Icono (emoticono o letra)', type: 'text' },
          { path: 'title', label: 'Título', type: 'text' },
          { path: 'description', label: 'Descripción', type: 'textarea' },
          { path: 'image', label: 'Imagen opcional', type: 'image' },
        ],
      },
    ],
  },

  gallery: {
    type: 'gallery',
    label: 'Galería / slider',
    description: 'Slider o cuadrícula de imágenes, ideales para productos o portafolio.',
    group: 'contenido',
    defaultVariant: 'grid',
    variants: [
      { value: 'slider', label: 'Slider horizontal' },
      { value: 'grid', label: 'Cuadrícula' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Mira los detalles',
      subtitle: '',
      items: [
        { title: 'Imagen 1', description: '', image: '' },
        { title: 'Imagen 2', description: '', image: '' },
        { title: 'Imagen 3', description: '', image: '' },
      ],
      titleFontSize: 0,
      titleColor: '',
      subtitleColor: '',
      backgroundType: 'none',
      backgroundColor: '#ffffff',
      backgroundImage: '',
      overlayColor: 'rgba(2, 6, 23, 0.55)',
      frameEnabled: false,
      frameColor: '#e2e8f0',
      frameWidth: 1,
      frameRadius: 24,
      contentPadding: 32,
    },
    defaultSettings: { variant: 'grid', cardStyle: 'rounded', columns: 3, autoplay: true },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'settings.autoplay', label: 'Autoplay en slider', type: 'switch' },
      commonCardStyleField,
      { path: 'settings.columns', label: 'Columnas (cuadrícula)', type: 'select', options: [
        { value: 2, label: '2 columnas' },
        { value: 3, label: '3 columnas' },
        { value: 4, label: '4 columnas' },
      ] },
      ...baseHeadingFields,
      { path: 'data.titleFontSize', label: 'Tamaño del título (px)', type: 'number', min: 18, max: 100 },
      { path: 'data.titleColor', label: 'Color del título', type: 'color' },
      { path: 'data.subtitleColor', label: 'Color del subtítulo', type: 'color' },
      { path: 'data.backgroundType', label: 'Fondo del contenedor', type: 'select', options: [
        { value: 'none', label: 'Transparente' },
        { value: 'color', label: 'Color sólido' },
        { value: 'image', label: 'Imagen de fondo' },
      ] },
      { path: 'data.backgroundColor', label: 'Color de fondo', type: 'color' },
      { path: 'data.backgroundImage', label: 'Imagen de fondo', type: 'image' },
      { path: 'data.overlayColor', label: 'Color de superposición (imagen de fondo)', type: 'color' },
      { path: 'data.frameEnabled', label: 'Mostrar contenedor con borde', type: 'switch' },
      { path: 'data.frameColor', label: 'Color del borde', type: 'color' },
      { path: 'data.frameWidth', label: 'Grosor del borde (px)', type: 'number', min: 1, max: 12 },
      { path: 'data.frameRadius', label: 'Radio del contenedor (px)', type: 'number', min: 0, max: 60 },
      { path: 'data.contentPadding', label: 'Espacio interno (px)', type: 'number', min: 0, max: 120 },
      {
        path: 'data.items',
        label: 'Imágenes',
        type: 'objectList',
        addLabel: 'Agregar imagen',
        itemLabel: 'Imagen',
        itemFields: [
          { path: 'image', label: 'Imagen', type: 'image' },
          { path: 'title', label: 'Título', type: 'text' },
          { path: 'description', label: 'Descripción', type: 'textarea' },
        ],
      },
    ],
  },

  testimonials: {
    type: 'testimonials',
    label: 'Testimonios',
    description: 'Prueba social con testimonios de clientes.',
    group: 'confianza',
    defaultVariant: 'grid',
    variants: [
      { value: 'grid', label: 'Cuadrícula' },
      { value: 'slider', label: 'Slider horizontal' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Clientes felices',
      subtitle: '',
      items: [
        { quote: 'Resultado excelente, lo recomiendo totalmente.', author: 'Cliente uno', role: '', avatar: '', rating: 5 },
        { quote: 'La atención y la entrega superaron mis expectativas.', author: 'Cliente dos', role: '', avatar: '', rating: 5 },
        { quote: 'Volvería a comprar sin pensarlo.', author: 'Cliente tres', role: '', avatar: '', rating: 5 },
      ],
    },
    defaultSettings: { variant: 'grid', cardStyle: 'rounded', columns: 3 },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      commonCardStyleField,
      ...baseHeadingFields,
      {
        path: 'data.items',
        label: 'Testimonios',
        type: 'objectList',
        addLabel: 'Agregar testimonio',
        itemLabel: 'Testimonio',
        itemFields: [
          { path: 'quote', label: 'Texto', type: 'textarea' },
          { path: 'author', label: 'Nombre', type: 'text' },
          { path: 'role', label: 'Cargo o ciudad', type: 'text' },
          { path: 'avatar', label: 'Foto opcional', type: 'image' },
          { path: 'rating', label: 'Estrellas (1-5)', type: 'number', min: 1, max: 5 },
        ],
      },
    ],
  },

  faq: {
    type: 'faq',
    label: 'Preguntas frecuentes',
    description: 'Resuelve dudas de compra, entrega o servicio.',
    group: 'confianza',
    defaultVariant: 'single',
    variants: [
      { value: 'single', label: 'Una columna' },
      { value: 'twoColumns', label: 'Dos columnas' },
    ],
    defaultData: {
      eyebrow: '',
      title: 'Preguntas frecuentes',
      subtitle: '',
      items: [
        { question: '¿Cuánto tarda la entrega?', answer: 'Escribe aquí la respuesta a esta pregunta.' },
        { question: '¿Qué medios de pago aceptan?', answer: 'Escribe aquí la respuesta a esta pregunta.' },
        { question: '¿Cómo puedo contactarlos?', answer: 'Escribe aquí la respuesta a esta pregunta.' },
      ],
    },
    defaultSettings: { variant: 'single' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      ...baseHeadingFields,
      {
        path: 'data.items',
        label: 'Preguntas',
        type: 'objectList',
        addLabel: 'Agregar pregunta',
        itemLabel: 'Pregunta',
        itemFields: [
          { path: 'question', label: 'Pregunta', type: 'textarea' },
          { path: 'answer', label: 'Respuesta', type: 'textarea' },
        ],
      },
    ],
  },

  guarantee: {
    type: 'guarantee',
    label: 'Garantía',
    description: 'Sello de garantía, devolución o confianza.',
    group: 'confianza',
    defaultVariant: 'compact',
    variants: [
      { value: 'compact', label: 'Compacta' },
      { value: 'full', label: 'Con imagen' },
    ],
    defaultData: {
      icon: '🛡️',
      title: 'Compra 100% protegida',
      description: 'Explica tu garantía de satisfacción o política de devolución.',
      badge: '7 días de garantía',
      image: '',
    },
    defaultSettings: { variant: 'compact' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'data.icon', label: 'Icono (emoticono)', type: 'text' },
      { path: 'data.title', label: 'Título', type: 'text' },
      { path: 'data.description', label: 'Descripción', type: 'textarea' },
      { path: 'data.badge', label: 'Etiqueta', type: 'text' },
      { path: 'data.image', label: 'Imagen (variante con imagen)', type: 'image' },
    ],
  },

  cta: {
    type: 'cta',
    label: 'Llamada a la acción',
    description: 'Banner para invitar a comprar, cotizar o descargar.',
    group: 'estructura',
    defaultVariant: 'centered',
    variants: [
      { value: 'centered', label: 'Centrada' },
      { value: 'banner', label: 'Banner con fondo' },
    ],
    defaultData: {
      eyebrow: '',
      title: '¿Listo para empezar?',
      subtitle: 'Haz clic en el botón y completa el formulario en segundos.',
      primaryLabel: 'Quiero empezar',
      secondaryLabel: '',
      image: '',
    },
    defaultSettings: { variant: 'centered' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      ...baseHeadingFields,
      { path: 'data.primaryLabel', label: 'Texto botón', type: 'text' },
      { path: 'data.secondaryLabel', label: 'Texto botón secundario', type: 'text' },
      { path: 'data.image', label: 'Imagen de fondo', type: 'image' },
    ],
  },

  conversion: {
    type: 'conversion',
    label: 'Formulario / captura',
    description: 'Formulario de venta o lead. Productos, propiedades y campos se configuran en la sección "Conversión" de la página.',
    group: 'conversion',
    defaultVariant: 'sideCard',
    variants: [
      { value: 'sideCard', label: 'Formulario lateral' },
      { value: 'centered', label: 'Formulario centrado' },
    ],
    defaultData: {
      eyebrow: '',
      title: '',
      subtitle: '',
      sideImage: '',
      note: '',
    },
    defaultSettings: { variant: 'sideCard' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'data.eyebrow', label: 'Eyebrow (opcional)', type: 'text' },
      { path: 'data.title', label: 'Título (vacío usa el de Conversión)', type: 'text' },
      { path: 'data.subtitle', label: 'Subtítulo (vacío usa el de Conversión)', type: 'textarea' },
      { path: 'data.sideImage', label: 'Imagen lateral', type: 'image' },
      { path: 'data.note', label: 'Nota inferior', type: 'text', placeholder: '🔒 Tus datos están seguros' },
    ],
  },

  footer: {
    type: 'footer',
    label: 'Pie de página',
    description: 'Cierre con marca, redes y contacto.',
    group: 'estructura',
    defaultVariant: 'default',
    variants: [{ value: 'default', label: 'Clásico' }],
    defaultData: {
      text: 'Hecho con cuidado para ti.',
      showBrand: true,
      showWhatsapp: false,
      showInstagram: true,
      showEmail: true,
    },
    defaultSettings: { variant: 'default' },
    fields: [
      { path: 'settings.variant', label: 'Variante', type: 'select', options: [] },
      { path: 'data.text', label: 'Texto final', type: 'text' },
      { path: 'data.showBrand', label: 'Mostrar marca', type: 'switch' },
      { path: 'data.showWhatsapp', label: 'Mostrar WhatsApp', type: 'switch' },
      { path: 'data.showInstagram', label: 'Mostrar Instagram', type: 'switch' },
      { path: 'data.showEmail', label: 'Mostrar email', type: 'switch' },
    ],
  },
})

export const SECTION_GROUPS_LOOKUP = Object.fromEntries(
  SECTION_GROUPS.map(group => [group.key, group])
)

export const getSectionDefinition = type => SECTION_DEFINITIONS[type]

export const getAllSectionTypes = () => Object.keys(SECTION_DEFINITIONS)

export const makeSection = (type, overrides = {}) => {
  const definition = SECTION_DEFINITIONS[type]
  if (!definition) return null

  const settings = {
    variant: definition.defaultVariant,
    ...cloneValue(definition.defaultSettings),
  }

  return {
    id: createId(),
    type,
    label: definition.label,
    enabled: true,
    data: cloneValue(definition.defaultData) || {},
    settings,
    ...overrides,
    ...(overrides.settings ? { settings: { ...settings, ...overrides.settings } } : {}),
    ...(overrides.data ? { data: { ...cloneValue(definition.defaultData), ...overrides.data } } : {}),
  }
}

export const makeId = createId
