import { makeSection } from './registry'
import { buildConversion, makeProduct } from './defaults'

const buildSection = (type, data = {}, settings = {}) => makeSection(type, { data, settings })

const productCommon = (productName, options) =>
  makeProduct({
    key: 'producto-principal',
    name: productName,
    description: 'Escribe una descripción clara del producto, sus materiales y qué lo hace especial.',
    price: 129900,
    compareAtPrice: 179900,
    currency: 'COP',
    badge: 'Envío gratis',
    options,
  })

const clonePackOptions = options =>
  options.map(option => ({
    ...option,
    options: (option.options || []).map(choice => ({ ...choice })),
  }))

const packShirtItems = count =>
  Array.from({ length: count }, (_, index) => ({
    key: `camisa-${index + 1}`,
    name: `Camisa ${index + 1}`,
    description: '',
    image: '',
    options: clonePackOptions(colorSizeOptions),
  }))

const colorSizeOptions = [
  {
    key: 'color',
    label: 'Color',
    control: 'color',
    required: true,
    options: [
      { label: 'Negro', value: 'negro', hex: '#171717' },
      { label: 'Blanco', value: 'blanco', hex: '#fafafa' },
      { label: 'Azul', value: 'azul', hex: '#2563eb' },
    ],
  },
  {
    key: 'size',
    label: 'Talla',
    control: 'radio',
    required: true,
    options: [
      { label: 'S', value: 'S' },
      { label: 'M', value: 'M' },
      { label: 'L', value: 'L' },
      { label: 'XL', value: 'XL' },
    ],
  },
]

const productConversion = (productName = 'Nombre de tu producto', options = colorSizeOptions) =>
  buildConversion({
    landingType: 'product',
    products: [productCommon(productName, options)],
    title: 'Completa tu pedido',
    subtitle: 'Elige color, talla u otras opciones y confirma tus datos de envío.',
    ctaLabel: 'Enviar pedido',
  })

const serviceConversion = () =>
  buildConversion({
    landingType: 'service',
    products: [],
    title: 'Solicita una cotización',
    subtitle: 'Cuéntanos qué necesitas y te contactaremos en menos de 24 horas.',
    ctaLabel: 'Enviar solicitud',
  })

const infoproductConversion = () =>
  buildConversion({
    landingType: 'infoproduct',
    products: [],
    title: 'Reserva tu acceso',
    subtitle: 'Déjanos tus datos y te enviaremos el acceso a tu infoproducto.',
    ctaLabel: 'Quiero mi acceso',
  })

const leadConversion = () =>
  buildConversion({
    landingType: 'lead',
    products: [],
    title: 'Descarga el material',
    subtitle: 'Déjanos tus datos y te enviaremos la información.',
    ctaLabel: 'Enviar',
  })

export const TEMPLATES = Object.freeze({
  product_essentials: {
    value: 'product_essentials',
    label: 'Producto clásico',
    landingType: 'product',
    description: 'Portada, beneficios, pedido y prueba social para vender un producto.',
    theme: {
      primaryColor: '#111111',
      accentColor: '#f59e0b',
      backgroundColor: '#ffffff',
      surfaceColor: '#ffffff',
      textColor: '#111111',
      mutedColor: '#64748b',
      fontFamily: 'modern',
      radius: 16,
      buttonRadius: 999,
    },
    conversion: productConversion(),
    sections: [
      buildSection('header', { ctaLabel: 'Quiero comprarlo', whatsapp: '' }),
      buildSection('hero', {
        eyebrow: 'Oferta por tiempo limitado',
        title: 'Producto que tus clientes van a amar',
        subtitle: 'Usa este espacio para destacar el beneficio principal y crear urgencia.',
        primaryLabel: 'Quiero comprarlo',
        badge: 'Envío gratis',
        image: '',
      }),
      buildSection('features', {
        eyebrow: 'Beneficios',
        title: '¿Por qué elegirlo?',
        subtitle: 'Explica los beneficios más importantes del producto.',
        items: [
          { icon: '✨', title: 'Calidad premium', description: 'Describe la calidad y los materiales.' },
          { icon: '🚚', title: 'Envío rápido', description: 'Entrega en 24/48 horas en tu ciudad.' },
          { icon: '🔄', title: 'Cambios fáciles', description: 'Política de cambios clara y sin estrés.' },
        ],
      }, { cardStyle: 'rounded' }),
      buildSection('conversion', {}, { variant: 'sideCard' }),
      buildSection('gallery', {
        eyebrow: 'Detalles',
        title: 'Míralo de cerca',
        subtitle: 'Sube varias fotos para que tus clientes vean cada ángulo.',
        items: [
          { title: 'Detalle 1', description: '', image: '' },
          { title: 'Detalle 2', description: '', image: '' },
          { title: 'Detalle 3', description: '', image: '' },
        ],
      }, { variant: 'slider', cardStyle: 'bordered', autoplay: true }),
      buildSection('testimonials', {
        title: 'Clientes felices',
        subtitle: 'La prueba social convierte visitantes en compradores.',
        items: [
          { quote: 'Excelente calidad y llegó muy rápido.', author: 'María F.', role: 'Medellín', rating: 5 },
          { quote: 'Me encantó, volveré a comprar.', author: 'Carlos R.', role: 'Bogotá', rating: 5 },
        ],
      }, { cardStyle: 'rounded' }),
      buildSection('faq', {
        items: [
          { question: '¿Cuánto tarda la entrega?', answer: 'Entre 1 y 3 días hábiles según tu ciudad.' },
          { question: '¿Qué medios de pago aceptan?', answer: 'Tarjetas, PSE y pagos contra entrega en ciudades seleccionadas.' },
        ],
      }),
      buildSection('guarantee', {
        title: 'Compra protegida',
        description: 'Si no estás 100% satisfecho, tienes 7 días para solicitar un cambio o devolución.',
        badge: 'Garantía de satisfacción',
      }),
      buildSection('footer'),
    ],
  },

  bundle_sale: {
    value: 'bundle_sale',
    label: 'Pack promocional',
    landingType: 'product',
    description: 'Vende varios productos o un pack con opciones por cada componente.',
    theme: {
      primaryColor: '#1e1b4b',
      accentColor: '#f59e0b',
      backgroundColor: '#0f172a',
      surfaceColor: '#1e293b',
      textColor: '#f8fafc',
      mutedColor: '#94a3b8',
      fontFamily: 'modern',
      radius: 18,
      buttonRadius: 12,
    },
    conversion: buildConversion({
      landingType: 'product',
      products: [
        makeProduct({
          key: 'pack-camisetas',
          name: 'Pack 3 camisetas',
          description: 'Escoge el color y la talla de cada una de las tres camisas del pack.',
          price: 189900,
          compareAtPrice: 259700,
          currency: 'COP',
          badge: 'Ahorra 27%',
          options: [],
          packItems: packShirtItems(3),
        }),
      ],
      title: 'Arma tu pack',
      subtitle: 'Escoge las opciones de tu pack y confirma los datos de envío.',
      ctaLabel: 'Ordenar pack',
    }),
    sections: [
      buildSection('header', { ctaLabel: 'Comprar pack' }),
      buildSection('hero', {
        eyebrow: 'Pack promocional',
        title: 'Tres veces mejor, un solo pago',
        subtitle: 'Aprovecha esta oferta de pack con ahorro real y envío incluido.',
        primaryLabel: 'Ordenar pack',
        badge: 'Ahorra 30%',
        image: '',
      }),
      buildSection('features', {
        title: '¿Qué incluye tu pack?',
        items: [
          { icon: '👕', title: 'Pieza 1', description: 'Describe la primera pieza del pack.' },
          { icon: '👕', title: 'Pieza 2', description: 'Describe la segunda pieza del pack.' },
          { icon: '👕', title: 'Pieza 3', description: 'Describe la tercera pieza del pack.' },
        ],
      }, { cardStyle: 'rounded' }),
      buildSection('conversion', {}, { variant: 'sideCard' }),
      buildSection('gallery', {
        title: 'Vistas del pack',
        items: [
          { title: 'Pack completo', description: '', image: '' },
          { title: 'Detalle color', description: '', image: '' },
        ],
      }, { variant: 'slider' }),
      buildSection('testimonials'),
      buildSection('guarantee'),
      buildSection('faq'),
      buildSection('footer'),
    ],
  },

  agency_clean: {
    value: 'agency_clean',
    label: 'Agencia / servicios',
    landingType: 'service',
    description: 'Presenta servicios, portafolio y captura clientes potenciales.',
    theme: {
      primaryColor: '#0f766e',
      accentColor: '#f59e0b',
      backgroundColor: '#f8fafc',
      surfaceColor: '#ffffff',
      textColor: '#0f172a',
      mutedColor: '#64748b',
      fontFamily: 'clean',
      radius: 18,
      buttonRadius: 10,
    },
    conversion: serviceConversion(),
    sections: [
      buildSection('header', { ctaLabel: 'Cotizar proyecto' }),
      buildSection('hero', {
        eyebrow: 'Agencia creativa',
        title: 'Ayudamos a marcas a crecer con estrategia',
        subtitle: 'Diseño, desarrollo y marketing digital con resultados medibles para tu negocio.',
        primaryLabel: 'Cotizar proyecto',
        image: '',
      }),
      buildSection('features', {
        eyebrow: 'Servicios',
        title: 'Lo que podemos hacer por ti',
        subtitle: 'Elige los servicios que necesita tu marca.',
        items: [
          { icon: '🎨', title: 'Diseño de marca', description: 'Identidad visual, logo y manual de marca.' },
          { icon: '💻', title: 'Desarrollo web', description: 'Páginas y tiendas online rápidas y modernas.' },
          { icon: '📈', title: 'Marketing digital', description: 'Campañas en redes y anuncios que convierten.' },
        ],
      }, { cardStyle: 'rounded' }),
      buildSection('content', {
        eyebrow: 'Nuestra metodología',
        title: 'Estrategia clara, resultados medibles',
        body: 'Trabajamos de la mano con tu equipo para entender tus objetivos, diseñar la mejor experiencia y medir cada campaña para mejorar continuamente.',
        image: '',
      }, { imageSide: 'left' }),
      buildSection('gallery', {
        eyebrow: 'Portafolio',
        title: 'Proyectos recientes',
        items: [
          { title: 'Proyecto 1', description: 'Resultado destacado', image: '' },
          { title: 'Proyecto 2', description: 'Resultado destacado', image: '' },
          { title: 'Proyecto 3', description: 'Resultado destacado', image: '' },
        ],
      }, { variant: 'slider', cardStyle: 'shadow' }),
      buildSection('testimonials', { title: 'Lo que dicen nuestros clientes' }, { cardStyle: 'shadow' }),
      buildSection('conversion', {}, { variant: 'sideCard' }),
      buildSection('faq'),
      buildSection('footer'),
    ],
  },

  infoproduct_launch: {
    value: 'infoproduct_launch',
    label: 'Lanzamiento de infoproducto',
    landingType: 'infoproduct',
    description: 'Vende un curso, ebook o comunidad y captura los datos de tus clientes.',
    theme: {
      primaryColor: '#7c3aed',
      accentColor: '#f59e0b',
      backgroundColor: '#faf5ff',
      surfaceColor: '#ffffff',
      textColor: '#1e1b4b',
      mutedColor: '#6d28d9',
      fontFamily: 'modern',
      radius: 20,
      buttonRadius: 999,
    },
    conversion: infoproductConversion(),
    sections: [
      buildSection('header', { ctaLabel: 'Quiero mi acceso' }),
      buildSection('hero', {
        eyebrow: 'Nuevo lanzamiento',
        title: 'Aprende [tu tema] desde cero',
        subtitle: 'Un programa práctico paso a paso para lograr resultados reales en tiempo récord.',
        primaryLabel: 'Quiero mi acceso',
        badge: 'Cupos limitados',
        image: '',
      }),
      buildSection('content', {
        eyebrow: '¿Qué vas a aprender?',
        title: 'Contenido 100% práctico',
        body: 'Módulos en video, plantillas descargables y comunidad privada para que apliques todo desde el primer día.',
        image: '',
      }, { imageSide: 'left' }),
      buildSection('features', {
        title: 'Esto incluye tu acceso',
        items: [
          { icon: '🎬', title: 'Módulos en video', description: 'Horas de contenido organizado y sin relleno.' },
          { icon: '📁', title: 'Plantillas y recursos', description: 'Descarga todo lo necesario para aplicar.' },
          { icon: '💬', title: 'Comunidad privada', description: 'Acompañamiento y networking con estudiantes.' },
        ],
      }, { cardStyle: 'bordered' }),
      buildSection('conversion', {}, { variant: 'sideCard' }),
      buildSection('testimonials', { title: 'Resultados de estudiantes' }, { cardStyle: 'rounded' }),
      buildSection('faq'),
      buildSection('guarantee', {
        title: 'Garantía de 7 días',
        description: 'Si no es para ti, te devolvemos el 100% de tu inversión sin preguntas.',
      }),
      buildSection('footer'),
    ],
  },

  lead_capture: {
    value: 'lead_capture',
    label: 'Captura de leads',
    landingType: 'lead',
    description: 'Lead magnet o campaña para captar contactos interesados.',
    theme: {
      primaryColor: '#0f172a',
      accentColor: '#10b981',
      backgroundColor: '#ffffff',
      surfaceColor: '#ffffff',
      textColor: '#0f172a',
      mutedColor: '#64748b',
      fontFamily: 'clean',
      radius: 16,
      buttonRadius: 10,
    },
    conversion: leadConversion(),
    sections: [
      buildSection('header', { ctaLabel: 'Descargar gratis', showCta: true }),
      buildSection('hero', {
        eyebrow: 'Guía gratuita',
        title: 'Descarga el material que transformará tu negocio',
        subtitle: 'Aprende estrategias concretas que puedes aplicar hoy mismo.',
        primaryLabel: 'Descargar gratis',
        badge: 'Gratis',
        image: '',
      }, { variant: 'split' }),
      buildSection('content', {
        title: '¿Qué incluye el material?',
        body: 'Una guía práctica con pasos claros, ejemplos reales y recursos descargables para que empieces hoy.',
        image: '',
      }),
      buildSection('conversion', {}, { variant: 'sideCard' }),
      buildSection('testimonials', { title: 'Personas que ya lo usan' }),
      buildSection('faq'),
      buildSection('footer'),
    ],
  },
})

export const TEMPLATE_OPTIONS = Object.values(TEMPLATES).map(template => ({
  label: template.label,
  value: template.value,
  landingType: template.landingType,
  description: template.description,
}))

export const getTemplatesByType = landingType =>
  TEMPLATE_OPTIONS.filter(template => template.landingType === landingType)
