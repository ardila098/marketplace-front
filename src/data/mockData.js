export const mockStores = [
  {
    _id: 'store-tech',
    name: 'Tech Importados',
    slug: 'tech-importados',
    vertical: 'tech',
    status: 'approved',
    logo: '/placeholder-logo.svg',
    banner: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1600&auto=format&fit=crop',
    description: 'Tecnología minimalista para trabajar, crear y vivir mejor.',
    theme: {
      primaryColor: '#111111',
      backgroundColor: '#f7f7f7',
      surfaceColor: '#ffffff',
      textColor: '#111111',
      mutedTextColor: '#6b7280',
      borderRadius: 16
    }
  },
  {
    _id: 'store-verona',
    name: 'Verona',
    slug: 'verona',
    vertical: 'woman',
    status: 'approved',
    logo: '/placeholder-logo.svg',
    banner: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop',
    description: 'Moda femenina limpia, elegante y fácil de comprar.',
    theme: {
      primaryColor: '#2f2f2f',
      backgroundColor: '#fafafa',
      surfaceColor: '#ffffff',
      textColor: '#18181b',
      mutedTextColor: '#71717a',
      borderRadius: 18
    }
  }
]

export const mockProducts = [
  {
    _id: 'p-redmi-buds',
    name: 'Xiaomi Redmi Buds Essential',
    slug: 'xiaomi-redmi-buds-essential',
    store: mockStores[0],
    vertical: 'tech',
    category: 'Audífonos',
    price: 89900,
    compareAtPrice: 109900,
    status: 'approved',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=1200&auto=format&fit=crop'
    ],
    description: 'Audífonos inalámbricos con diseño compacto, buen sonido y batería para el día a día.',
    variants: [
      { _id: 'v-white', sku: 'XIAOMI-REDMI-WHITE', price: 89900, compareAtPrice: 109900, stock: 10, image: 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop', attributes: { color: 'Blanco' }, isActive: true },
      { _id: 'v-black', sku: 'XIAOMI-REDMI-BLACK', price: 89900, compareAtPrice: 109900, stock: 8, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop', attributes: { color: 'Negro' }, isActive: true }
    ]
  },
  {
    _id: 'p-keyboard',
    name: 'Teclado mecánico compacto',
    slug: 'teclado-mecanico-compacto',
    store: mockStores[0],
    vertical: 'tech',
    category: 'Accesorios',
    price: 189900,
    compareAtPrice: 229900,
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=1200&auto=format&fit=crop'],
    description: 'Teclado compacto para productividad, gaming casual y setups minimalistas.',
    variants: [
      { _id: 'v-blue-switch', sku: 'KEY-68-BLUE', price: 189900, stock: 5, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop', attributes: { switch: 'Blue', color: 'Negro' }, isActive: true }
    ]
  },
  {
    _id: 'p-dress',
    name: 'Vestido Verona lino',
    slug: 'vestido-verona-lino',
    store: mockStores[1],
    vertical: 'woman',
    category: 'Vestidos',
    price: 149900,
    compareAtPrice: 179900,
    status: 'approved',
    images: ['https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1200&auto=format&fit=crop'],
    description: 'Vestido limpio y fresco para uso diario, con silueta simple y elegante.',
    variants: [
      { _id: 'v-s-beige', sku: 'VER-DRESS-S-BEIGE', price: 149900, stock: 4, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&auto=format&fit=crop', attributes: { talla: 'S', color: 'Beige' }, isActive: true },
      { _id: 'v-m-black', sku: 'VER-DRESS-M-BLACK', price: 149900, stock: 6, image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&auto=format&fit=crop', attributes: { talla: 'M', color: 'Negro' }, isActive: true }
    ]
  }
]

export const mockCartItems = [
  {
    id: 'cart-1',
    product: mockProducts[0],
    variant: mockProducts[0].variants[0],
    quantity: 1,
    priceSnapshot: mockProducts[0].variants[0].price
  }
]
