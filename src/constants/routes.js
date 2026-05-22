export const ROUTES = {
  HOME: '/',
  MARKETPLACE: '/marketplace',
  VERTICAL_DETAILS: '/vertical/:id',
  PRODUCT_DETAIL: '/products/:productSlug',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',

  STORES: '/stores',
  STOREFRONT_HOME: '/stores/:storeSlug',
  STOREFRONT_PRODUCTS: '/stores/:storeSlug/products',
  STOREFRONT_PRODUCT_DETAIL: '/stores/:storeSlug/products/:productSlug',

  CUSTOMER_CART: '/customer/cart',
  CUSTOMER_ORDERS: '/customer/orders',

  SELLER_DASHBOARD: '/seller',
  SELLER_STORE: '/seller/store',
  SELLER_DESIGN: '/seller/design',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_ORDERS: '/seller/orders',
  SELLER_PRODUCTS_MANAGE: '/seller/products/:id/manage',



  ADMIN_DASHBOARD: '/admin',
  ADMIN_STORES: '/admin/stores',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings'
}

export const buildRoute = (route, params = {}) => {
  return Object.entries(params).reduce((path, [key, value]) => path.replace(`:${key}`, value), route)
}
