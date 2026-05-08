export const API_ROUTES = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    me: '/auth/me',
    logout: '/auth/logout',
  },

  stores: {
    base: '/stores',
    byId: id => `/stores/${id}`,
    bySlug: slug => `/stores/slug/${slug}`,
    approve: id => `/stores/${id}/approve`,
    reject: id => `/stores/${id}/reject`,
    theme: id => `/stores/${id}/theme`,
  },

  products: {
    base: '/products',
    byId: id => `/products/${id}`,
    bySlug: slug => `/products/slug/${slug}`,
    byStore: storeSlug => `/stores/${storeSlug}/products`,
    approve: id => `/products/${id}/approve`,
    reject: id => `/products/${id}/reject`,
  },

  cart: {
    base: '/cart',
    addItem: '/cart/items',
    updateItem: itemId => `/cart/items/${itemId}`,
    removeItem: itemId => `/cart/items/${itemId}`,
    clear: '/cart/clear',
  },

  orders: {
    base: '/orders',
    byId: id => `/orders/${id}`,
    myOrders: '/orders/me',
    sellerOrders: '/orders/seller',
    adminOrders: '/orders/admin',
  },

  uploads: {
    productImage: '/uploads/products',
    storeLogo: '/uploads/stores/logo',
    storeBanner: '/uploads/stores/banner',
  },
}
