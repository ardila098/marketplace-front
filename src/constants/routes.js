export const ROUTES = {
  HOME: '/',
  MARKETPLACE: '/marketplace',
  VERTICAL: '/vertical/:id',
  VERTICAL_PRODUCT_DETAIL: '/vertical/products/:id',
  LOGIN: '/login',
  REGISTER: '/register',
  UNAUTHORIZED: '/unauthorized',

  VERTICALS: '/verticals',

  STORES: '/stores',
  STOREFRONT_HOME: '/stores/:storeSlug',
  STOREFRONT_PRODUCTS: '/stores/:storeSlug/products',
  STOREFRONT_PRODUCT_DETAIL: '/stores/:storeSlug/products/:productSlug',
  ORDER_LOOKUP: '/order-lookup',

  CUSTOMER_CART: '/customer/cart',
  CHECKOUT: '/checkout',
  CUSTOMER_ORDERS: '/customer/orders',

  SELLER_DASHBOARD: '/seller',
  SELLER_STORE: '/seller/store',
  SELLER_DESIGN: '/seller/design',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_ORDERS: '/seller/orders',
  SELLER_PRODUCTS_MANAGE: '/seller/products/:id/manage',
  SELLER_ORDER_DETAIL: '/seller/orderDetail/:id',

  

  ADMIN_DASHBOARD: '/admin',
  ADMIN_STORES: '/admin/stores',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
}

export const buildRoute = (route, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  )
}
