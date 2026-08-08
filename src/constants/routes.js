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
  STOREFRONT_AGENCY_ITEM_DETAIL: '/stores/:storeSlug/agency-items/:itemSlug',
  STOREFRONT_EXPERIENCE_DETAIL: '/stores/:storeSlug/experiences/:experienceSlug',
  BROKER_PUBLIC_PROFILE: '/brokers/:slug',
  ORDER_LOOKUP: '/order-lookup',
  RETURN_REQUEST: '/returns',
  ORDER_DETAIL: '/orderDetail/:id',


  CUSTOMER_CART: '/customer/cart',
  CHECKOUT: '/checkout',
  CHECKOUT_RESULT: '/checkout/result',
  CUSTOMER_ORDERS: '/customer/orders',

  SELLER_DASHBOARD: '/seller',
  SELLER_STORE: '/seller/store',
  SELLER_DESIGN: '/seller/design',
  SELLER_PRODUCTS: '/seller/products',
  SELLER_AGENCY_ITEMS: '/seller/agency-items',
  SELLER_AGENCY_LEADS: '/seller/agency-leads',
  SELLER_EXPERIENCES: '/seller/experiences',
  SELLER_EXPERIENCE_BOOKINGS: '/seller/experience-bookings',
  SELLER_CONTACTS: '/seller/contacts',
  SELLER_COUPONS: '/seller/coupons',
  SELLER_CUSTOMERS: '/seller/customers',
  SELLER_ORDERS: '/seller/orders',
  SELLER_SHIPMENTS: '/seller/shipments',
  SELLER_COURIERS: '/seller/couriers',
  SELLER_PAYOUTS: '/seller/payouts',
  SELLER_CREDIT_APPLICATIONS: '/seller/credit-applications',
  SELLER_PRODUCTS_MANAGE: '/seller/products/:id/manage',

  BROKER_DASHBOARD: '/broker',
  BROKER_PROFILE: '/broker/profile',
  BROKER_CREDIT_APPLICATIONS: '/broker/credit-applications',

  ADVISOR_DASHBOARD: '/advisor',
  ADVISOR_STORES: '/advisor/stores',
  ADVISOR_PAYOUTS: '/advisor/payouts',


  ADMIN_DASHBOARD: '/admin',
  ADMIN_STORES: '/admin/stores',
  ADMIN_ADVISORS: '/admin/advisors',
  ADMIN_AGENCY_LEADS: '/admin/agency-leads',
  ADMIN_EXPERIENCE_BOOKINGS: '/admin/experience-bookings',
  ADMIN_CONTACTS: '/admin/contacts',
  ADMIN_VERTICALS: '/admin/verticals',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_CATEGORIES: '/admin/categories',
  ADMIN_USERS: '/admin/users',
  ADMIN_SETTINGS: '/admin/settings',
  ADMIN_ORDERS: '/admin/orders',
  ADMIN_SHIPMENTS: '/admin/shipments',
  ADMIN_RETURNS: '/admin/returns',
  ADMIN_PAYOUTS: '/admin/payouts',
  ADMIN_COUPONS: '/admin/coupons',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_CREDIT_APPLICATIONS: '/admin/credit-applications',

  COURIER_SHIPMENTS: '/courier/shipments',

}

export const buildRoute = (route, params = {}) => {
  return Object.entries(params).reduce(
    (path, [key, value]) => path.replace(`:${key}`, value),
    route
  )
}
