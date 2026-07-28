import {
  BarChart3,
  Boxes,
  Tags,
  Brush,
  ClipboardList,
  Home,
  Layers,
  LayoutDashboard,
  Package,
  Percent,
  Mail,
  Settings,
  ShoppingCart,
  Store,
  Wallet,
  Users,
} from 'lucide-react'
import { PERMISSIONS } from './permissions'
import { ROUTES } from './routes'

export const publicMenu = [
  { key: ROUTES.HOME, labelKey: 'home', path: ROUTES.HOME, icon: Home },
  { key: ROUTES.MARKETPLACE, labelKey: 'products', path: ROUTES.MARKETPLACE, icon: Package },
  { key: `${ROUTES.MARKETPLACE}?discounted=true`, labelKey: 'outlet', path: `${ROUTES.MARKETPLACE}?discounted=true`, icon: Percent },
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
    label: 'Mis ordenes',
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
    label: 'Diseno',
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
    key: ROUTES.SELLER_COUPONS,
    label: 'Cupones',
    path: ROUTES.SELLER_COUPONS,
    icon: Percent,
    permission: PERMISSIONS.SELLER_COUPONS_MANAGE,
  },
  {
    key: ROUTES.SELLER_CUSTOMERS,
    label: 'Clientes',
    path: ROUTES.SELLER_CUSTOMERS,
    icon: Mail,
    permission: PERMISSIONS.SELLER_CUSTOMERS_VIEW,
  },
  {
    key: ROUTES.SELLER_ORDERS,
    label: 'Ordenes',
    path: ROUTES.SELLER_ORDERS,
    icon: ClipboardList,
    permission: PERMISSIONS.SELLER_ORDERS_VIEW,
  },
  {
    key: ROUTES.SELLER_PAYOUTS,
    label: 'Liquidaciones',
    path: ROUTES.SELLER_PAYOUTS,
    icon: Wallet,
    permission: PERMISSIONS.SELLER_PAYOUTS_VIEW,
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
    key: ROUTES.ADMIN_VERTICALS,
    label: 'Verticales',
    path: ROUTES.ADMIN_VERTICALS,
    icon: Layers,
    permission: PERMISSIONS.ADMIN_VERTICALS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_PRODUCTS,
    label: 'Productos',
    path: ROUTES.ADMIN_PRODUCTS,
    icon: Boxes,
    permission: PERMISSIONS.ADMIN_PRODUCTS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_CATEGORIES,
    label: 'Categorias',
    path: ROUTES.ADMIN_CATEGORIES,
    icon: Tags,
    permission: PERMISSIONS.ADMIN_CATEGORIES_MANAGE,
  },
  {
    key: ROUTES.ADMIN_COUPONS,
    label: 'Cupones',
    path: ROUTES.ADMIN_COUPONS,
    icon: Percent,
    permission: PERMISSIONS.ADMIN_COUPONS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_CUSTOMERS,
    label: 'Clientes',
    path: ROUTES.ADMIN_CUSTOMERS,
    icon: Mail,
    permission: PERMISSIONS.ADMIN_CUSTOMERS_VIEW,
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
    label: 'Ordenes',
    path: ROUTES.ADMIN_ORDERS,
    icon: ClipboardList,
    permission: PERMISSIONS.ADMIN_USERS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_PAYOUTS,
    label: 'Liquidaciones',
    path: ROUTES.ADMIN_PAYOUTS,
    icon: Wallet,
    permission: PERMISSIONS.ADMIN_PAYOUTS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_SETTINGS,
    label: 'Configuracion',
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
