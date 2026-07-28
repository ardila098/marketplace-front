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
  STOREFRONT_CATEGORIES: '/stores/:storeSlug/categories',
  STOREFRONT_OUTLET: '/stores/:storeSlug/outlet',
  STOREFRONT_PRODUCT_DETAIL: '/stores/:storeSlug/products/:productSlug',
  ORDER_LOOKUP: '/order-lookup',
  ORDER_DETAIL: '/orderDetail/:id',


  CUSTOMER_CART: '/customer/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_RESULT: '/checkout/result',
  CUSTOMER_ORDERS: '/customer/orders',

  SELLER_DASHBOARD: '/seller',
  SELLER_STORE: '/seller/store',
  SELLER_DESIGN: '/seller/design',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_COUPONS: '/seller/coupons',
  SELLER_CUSTOMERS: '/seller/customers',
  SELLER_ORDERS: '/seller/orders',
  SELLER_PAYOUTS: '/seller/payouts',
  SELLER_PRODUCTS_MANAGE: '/seller/products/:id/manage',

  

  ADMIN_DASHBOARD: '/admin',
  ADMIN_STORES: '/admin/stores',
  ADMIN_VERTICALS: '/admin/verticals',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_PAYOUTS: '/admin/payouts',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_CUSTOMERS: '/admin/customers',

}

export const buildRoute = (route, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  )
}
