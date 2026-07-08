import {
  BarChart3,
  Boxes,
  Brush,
  ClipboardList,
  Home,
  LayoutDashboard,
  Package,
  Settings,
  ShoppingCart,
  Store,
  Users,
} from 'lucide-react'
import { PERMISSIONS } from './permissions'
import { ROUTES } from './routes'

export const publicMenu = [
  { key: ROUTES.HOME, label: 'Marketplace', path: ROUTES.HOME, icon: Home },
  { key: ROUTES.VERTICALS, label: 'Verticales', path: ROUTES.VERTICALS, icon: '' },
  { key: ROUTES.STORES, label: 'Tiendas', path: ROUTES.STORES, icon: '' },
]

export const customerMenu = [
  { key: ROUTES.MARKETPLACE, label: 'Comprar', path: ROUTES.MARKETPLACE, icon: Package },
  {
    key: ROUTES.CUSTOMER_CART,
    label: 'Carrito',
    path: ROUTES.CUSTOMER_CART,
    icon: ShoppingCart,
    permission: PERMISSIONS.CUSTOMER_CART_MANAGE,
  },
  {
    key: ROUTES.CUSTOMER_ORDERS,
    label: 'Mis órdenes',
    path: ROUTES.CUSTOMER_ORDERS,
    icon: ClipboardList,
    permission: PERMISSIONS.CUSTOMER_ORDERS_VIEW,
  },
]

export const sellerMenu = [
  {
    key: ROUTES.SELLER_DASHBOARD,
    label: 'Resumen',
    path: ROUTES.SELLER_DASHBOARD,
    icon: LayoutDashboard,
    permission: PERMISSIONS.SELLER_DASHBOARD_VIEW,
  },
  {
    key: ROUTES.SELLER_STORE,
    label: 'Mi tienda',
    path: ROUTES.SELLER_STORE,
    icon: Store,
    permission: PERMISSIONS.SELLER_STORE_MANAGE,
  },
  {
    key: ROUTES.SELLER_DESIGN,
    label: 'Diseño',
    path: ROUTES.SELLER_DESIGN,
    icon: Brush,
    permission: PERMISSIONS.SELLER_DESIGN_MANAGE,
  },
  {
    key: ROUTES.SELLER_PRODUCTS,
    label: 'Productos',
    path: ROUTES.SELLER_PRODUCTS,
    icon: Package,
    permission: PERMISSIONS.SELLER_PRODUCTS_MANAGE,
  },
  {
    key: ROUTES.SELLER_ORDERS,
    label: 'Órdenes',
    path: ROUTES.SELLER_ORDERS,
    icon: ClipboardList,
    permission: PERMISSIONS.SELLER_ORDERS_VIEW,
  },
]

export const adminMenu = [
  {
    key: ROUTES.ADMIN_DASHBOARD,
    label: 'Resumen',
    path: ROUTES.ADMIN_DASHBOARD,
    icon: BarChart3,
    permission: PERMISSIONS.ADMIN_DASHBOARD_VIEW,
  },
  {
    key: ROUTES.ADMIN_STORES,
    label: 'Tiendas',
    path: ROUTES.ADMIN_STORES,
    icon: Store,
    permission: PERMISSIONS.ADMIN_STORES_MANAGE,
  },
  {
    key: ROUTES.ADMIN_PRODUCTS,
    label: 'Productos',
    path: ROUTES.ADMIN_PRODUCTS,
    icon: Boxes,
    permission: PERMISSIONS.ADMIN_PRODUCTS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_USERS,
    label: 'Usuarios',
    path: ROUTES.ADMIN_USERS,
    icon: Users,
    permission: PERMISSIONS.ADMIN_USERS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_ORDERS,
    label: 'Órdenes',
    path: ROUTES.ADMIN_ORDERS,
    icon: ClipboardList,
    permission: PERMISSIONS.ADMIN_USERS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_SETTINGS,
    label: 'Configuración',
    path: ROUTES.ADMIN_SETTINGS,
    icon: Settings,
    permission: PERMISSIONS.ADMIN_SETTINGS_MANAGE,
  },
]

export const appMenuByArea = {
  customer: customerMenu,
  seller: sellerMenu,
  admin: adminMenu,
}
