export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    logout: '/auth/logout',
  },

  users: {
    base: '/users',
    byId: id => `/users/${id}`,
  },

  stores: {
    base: '/stores',
    byId: id => `/stores/${id}`,
    admin: '/stores/admin',
    domains: '/stores/domains',
    myStore: '/stores/my-store',
    resolve: '/stores/resolve',
    bySlug: slug => `/stores/slug/${slug}`,
    products: slug => `/stores/${slug}/products`,
    productBySlug: (slug, productSlug) => `/stores/${slug}/products/${productSlug}`,
    categories: slug => `/stores/${slug}/categories`,
    storefront: id => `/stores/${id}/storefront`,
    domainStatus: id => `/stores/${id}/domain/status`,
    approve: id => `/stores/${id}/approve`,
  },

  brokers: {
    public: '/brokers/public',
    publicBySlug: slug => `/brokers/public/${slug}`,
    admin: '/brokers/admin',
    me: '/brokers/me',
  },

  advisors: {
    admin: '/advisors/admin',
    adminById: id => `/advisors/admin/${id}`,
    summary: '/advisors/me/summary',
    stores: '/advisors/me/stores',
    pending: '/advisors/me/pending',
    payouts: '/advisors/payouts',
    payPayout: id => `/advisors/payouts/${id}/pay`,
  },

  dashboard: {
    summary: '/dashboard',
  },

  creditApplications: {
    base: '/credit-applications',
    status: id => `/credit-applications/${id}/status`,
    notes: id => `/credit-applications/${id}/notes`,
    assignBroker: id => `/credit-applications/${id}/assign-broker`,
  },

  agencyItems: {
    base: '/agency-items',
    byId: id => `/agency-items/${id}`,
    status: id => `/agency-items/${id}/status`,
    myStore: '/agency-items/my-store',
    admin: '/agency-items/admin',
    publicByStore: storeSlug => `/agency-items/store/${storeSlug}`,
    publicBySlug: (storeSlug, itemSlug) => `/agency-items/store/${storeSlug}/${itemSlug}`,
  },

  agencyLeads: {
    base: '/agency-leads',
    byId: id => `/agency-leads/${id}`,
    notes: id => `/agency-leads/${id}/notes`,
  },

  contacts: {
    base: '/contacts',
  },

  experiences: {
    base: '/experiences',
    byId: id => `/experiences/${id}`,
    status: id => `/experiences/${id}/status`,
    myStore: '/experiences/my-store',
    admin: '/experiences/admin',
    bookings: '/experiences/bookings',
    bookingById: id => `/experiences/bookings/${id}`,
    bookingNotes: id => `/experiences/bookings/${id}/notes`,
    publicByStore: storeSlug => `/experiences/store/${storeSlug}`,
    publicBySlug: (storeSlug, experienceSlug) => `/experiences/store/${storeSlug}/${experienceSlug}`,
  },

  products: {
    base: '/products',
    myStoreProducts: '/products/my-store-products',
    byId: id => `/products/${id}`,
    bySlug: slug => `/products/slug/${slug}`,
    byStore: storeSlug => `/stores/${storeSlug}/products`,
    approve: id => `/products/${id}/approve`,
    reject: id => `/products/${id}/reject`,
    sellerById: id => `/products/seller/${id}`,
    addVariant: id => `/products/${id}/variants`,
    updateVariant: (id, variantId) => `/products/${id}/variants/${variantId}`,
    adjustVariantStock: (id, variantId) => `/products/${id}/variants/${variantId}/adjust-stock`,
    addPiece: id => `/products/${id}/pieces`,
    addInventoryItem: id => `/products/${id}/inventory-items`,
    updateInventoryItem: (id, inventoryItemId) => `/products/${id}/inventory-items/${inventoryItemId}`,
    adjustInventoryItemStock: (id, inventoryItemId) => `/products/${id}/inventory-items/${inventoryItemId}/adjust-stock`,
    addReference: id => `/products/${id}/references`,
    updateReference: (id, referenceId) => `/products/${id}/references/${referenceId}`,
    sellerDetail: id => `/products/seller/${id}/detail`,
  },

  cart: {
    base: '/cart',
    addItem: '/cart/items',
    updateItem: itemId => `/cart/items/${itemId}`,
    removeItem: itemId => `/cart/items/${itemId}`,
    coupon: '/cart/coupon',
  },

  orders: {
    base: '/orders',
    byId: id => `/orders/${id}`,
    lookup: '/orders/lookup',
    paymentResult: '/orders/payment-result',
    pendingPayouts: '/orders/payouts/pending',
    payoutSummary: '/orders/payouts/summary',
    payouts: '/orders/payouts',
    payPayout: id => `/orders/payouts/${id}/pay`,
    storeOrderSentToPlatform: id => `/orders/store-orders/${id}/sent-to-platform`,
    storeOrderReceivedByPlatform: id => `/orders/store-orders/${id}/received-by-platform`,
  },

  categories: {
    base: '/categories',
    admin: '/categories/admin',
    byId: id => `/categories/${id}`,
  },

  coupons: {
    base: '/coupons',
    byId: id => `/coupons/${id}`,
  },

  newsletter: {
    base: '/newsletter',
  },

  uploads: {
    productImage: '/uploads/products',
    storeLogo: '/uploads/stores/logo',
    storeBanner: '/uploads/stores/banner',
  },

  verticals: {
    base: '/verticals',
    byId: id => `/verticals/${id}`,
    updateItem: itemId => `/verticals/${itemId}`,
    status: id => `/verticals/${id}/status`,
  },

  catalogs: {
    base: '/catalogs',
    catalogVerticals: '/catalogs/catalogVerticals',
    byId: id => `/catalogs/products/${id}`,
  },

  checkout: {
    base: '/checkout',
  },
}
