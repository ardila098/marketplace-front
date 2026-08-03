import {
  BarChart3,
  Boxes,
  Tags,
  Brush,
  CalendarCheck,
  Car,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
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
  Sparkles,
} from 'lucide-react'
import { isAgencyBusiness, isExperienceBusiness } from './businessTypes'
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

export const sellerBaseMenu = [
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
]

const sellerRetailMenu = [
  ...sellerBaseMenu,
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

const sellerAgencyMenu = [
  ...sellerBaseMenu,
  {
    key: ROUTES.SELLER_AGENCY_ITEMS,
    label: 'Inventario agencia',
    path: ROUTES.SELLER_AGENCY_ITEMS,
    icon: Car,
    permission: PERMISSIONS.SELLER_AGENCY_ITEMS_MANAGE,
  },
  {
    key: ROUTES.SELLER_AGENCY_LEADS,
    label: 'Leads agencia',
    path: ROUTES.SELLER_AGENCY_LEADS,
    icon: Users,
    permission: PERMISSIONS.SELLER_AGENCY_LEADS_MANAGE,
  },
  {
    key: ROUTES.SELLER_CONTACTS,
    label: 'Contactos',
    path: ROUTES.SELLER_CONTACTS,
    icon: Mail,
    permission: PERMISSIONS.SELLER_CONTACTS_VIEW,
  },
  {
    key: ROUTES.SELLER_CREDIT_APPLICATIONS,
    label: 'Solicitudes credito',
    path: ROUTES.SELLER_CREDIT_APPLICATIONS,
    icon: FileText,
    permission: PERMISSIONS.SELLER_CREDIT_APPLICATIONS_VIEW,
  },
]

const sellerExperienceMenu = [
  ...sellerBaseMenu,
  {
    key: ROUTES.SELLER_EXPERIENCES,
    label: 'Experiencias',
    path: ROUTES.SELLER_EXPERIENCES,
    icon: Sparkles,
    permission: PERMISSIONS.SELLER_EXPERIENCES_MANAGE,
  },
  {
    key: ROUTES.SELLER_EXPERIENCE_BOOKINGS,
    label: 'Reservas',
    path: ROUTES.SELLER_EXPERIENCE_BOOKINGS,
    icon: CalendarCheck,
    permission: PERMISSIONS.SELLER_EXPERIENCE_BOOKINGS_MANAGE,
  },
  {
    key: ROUTES.SELLER_CONTACTS,
    label: 'Contactos',
    path: ROUTES.SELLER_CONTACTS,
    icon: Mail,
    permission: PERMISSIONS.SELLER_CONTACTS_VIEW,
  },
  {
    key: ROUTES.SELLER_CREDIT_APPLICATIONS,
    label: 'Solicitudes credito',
    path: ROUTES.SELLER_CREDIT_APPLICATIONS,
    icon: FileText,
    permission: PERMISSIONS.SELLER_CREDIT_APPLICATIONS_VIEW,
  },
]

export const sellerMenu = sellerRetailMenu

export const getSellerMenuByBusinessType = businessType => {
  if (isAgencyBusiness(businessType)) return sellerAgencyMenu
  if (isExperienceBusiness(businessType)) return sellerExperienceMenu

  return sellerRetailMenu
}

export const brokerMenu = [
  {
    key: ROUTES.BROKER_DASHBOARD,
    label: 'Resumen',
    path: ROUTES.BROKER_DASHBOARD,
    icon: LayoutDashboard,
    permission: PERMISSIONS.BROKER_DASHBOARD_VIEW,
  },
  {
    key: ROUTES.BROKER_PROFILE,
    label: 'Mi landing',
    path: ROUTES.BROKER_PROFILE,
    icon: BriefcaseBusiness,
    permission: PERMISSIONS.BROKER_PROFILE_MANAGE,
  },
  {
    key: ROUTES.BROKER_CREDIT_APPLICATIONS,
    label: 'Solicitudes',
    path: ROUTES.BROKER_CREDIT_APPLICATIONS,
    icon: FileText,
    permission: PERMISSIONS.BROKER_CREDIT_APPLICATIONS_MANAGE,
  },
]

export const advisorMenu = [
  {
    key: ROUTES.ADVISOR_DASHBOARD,
    label: 'Resumen',
    path: ROUTES.ADVISOR_DASHBOARD,
    icon: LayoutDashboard,
    permission: PERMISSIONS.ADVISOR_DASHBOARD_VIEW,
  },
  {
    key: ROUTES.ADVISOR_STORES,
    label: 'Negocios',
    path: ROUTES.ADVISOR_STORES,
    icon: Store,
    permission: PERMISSIONS.ADVISOR_STORES_VIEW,
  },
  {
    key: ROUTES.ADVISOR_PAYOUTS,
    label: 'Comisiones',
    path: ROUTES.ADVISOR_PAYOUTS,
    icon: Wallet,
    permission: PERMISSIONS.ADVISOR_PAYOUTS_VIEW,
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
    key: ROUTES.ADMIN_ADVISORS,
    label: 'Asesores',
    path: ROUTES.ADMIN_ADVISORS,
    icon: Users,
    permission: PERMISSIONS.ADMIN_USERS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_AGENCY_LEADS,
    label: 'Leads agencia',
    path: ROUTES.ADMIN_AGENCY_LEADS,
    icon: BriefcaseBusiness,
    permission: PERMISSIONS.ADMIN_AGENCY_LEADS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_EXPERIENCE_BOOKINGS,
    label: 'Reservas',
    path: ROUTES.ADMIN_EXPERIENCE_BOOKINGS,
    icon: CalendarCheck,
    permission: PERMISSIONS.ADMIN_EXPERIENCE_BOOKINGS_MANAGE,
  },
  {
    key: ROUTES.ADMIN_CONTACTS,
    label: 'Contactos',
    path: ROUTES.ADMIN_CONTACTS,
    icon: Mail,
    permission: PERMISSIONS.ADMIN_CONTACTS_VIEW,
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
    key: ROUTES.ADMIN_CREDIT_APPLICATIONS,
    label: 'Solicitudes',
    path: ROUTES.ADMIN_CREDIT_APPLICATIONS,
    icon: FileText,
    permission: PERMISSIONS.ADMIN_CREDIT_APPLICATIONS_MANAGE,
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
  broker: brokerMenu,
  advisor: advisorMenu,
  admin: adminMenu,
}
