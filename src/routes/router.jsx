import { createBrowserRouter } from 'react-router-dom'
import { ROLES } from '../constants/roles'
import { ROUTES } from '../constants/routes'
import ProtectedRoute from './ProtectedRoute'
import StorefrontRoute from './StorefrontRoute'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import StorefrontLayout from '../layouts/StorefrontLayout'
import { createLazyPage } from './lazyPage'
import VerticalPage from '../pages/verticals/VerticalPage'

const HomePage = createLazyPage(() => import('../pages/public/HomePage'))
const ProductListPage = createLazyPage(() => import('../pages/public/ProductListPage'))
const ProductDetailPage = createLazyPage(() => import('../pages/public/ProductDetailPage'))
const StoresPage = createLazyPage(() => import('../pages/public/StoresPage'))
const LoginPage = createLazyPage(() => import('../pages/public/LoginPage'))
const RegisterPage = createLazyPage(() => import('../pages/public/RegisterPage'))

const StorefrontHomePage = createLazyPage(() => import('../pages/storefront/StorefrontHomePage'))
const StorefrontProductsPage = createLazyPage(() => import('../pages/storefront/StorefrontProductsPage'))
const StorefrontProductDetailPage = createLazyPage(() => import('../pages/storefront/StorefrontProductDetailPage'))

const CartPage = createLazyPage(() => import('../pages/customer/CartPage'))
const OrdersPage = createLazyPage(() => import('../pages/customer/OrdersPage'))

const SellerDashboardPage = createLazyPage(() => import('../pages/seller/components/SellerDashboardPage/SellerDashboardPage'))
const StoreFormPage = createLazyPage(() => import('../pages/seller/StoreFormPage'))
const StoreDesignPage = createLazyPage(() => import('../pages/seller/StoreDesignPage'))
const SellerProductsPage = createLazyPage(() => import('../pages/seller/components/SellerProducts/SellerProductsPage'))
const SellerOrdersPage = createLazyPage(() => import('../pages/seller/SellerOrdersPage'))

const AdminDashboardPage = createLazyPage(() => import('../pages/admin/AdminDashboardPage'))
const AdminStoresPage = createLazyPage(() => import('../pages/admin/AdminStoresPage'))
const AdminProductsPage = createLazyPage(() => import('../pages/admin/AdminProductsPage'))
const AdminUsersPage = createLazyPage(() => import('../pages/admin/AdminUsersPage'))
const AdminSettingsPage = createLazyPage(() => import('../pages/admin/AdminSettingsPage'))

const UnauthorizedPage = createLazyPage(() => import('../pages/system/UnauthorizedPage'))

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.VERTICAL_DETAILS, element: <VerticalPage /> },
      { path: ROUTES.MARKETPLACE, element: <ProductListPage /> },
      { path: ROUTES.STORES, element: <StoresPage /> },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> },
    ],
  },
  {
    element: <StorefrontRoute />,
    children: [
      {
        element: <StorefrontLayout />,
        children: [
          { path: ROUTES.STOREFRONT_HOME, element: <StorefrontHomePage /> },
          { path: ROUTES.STOREFRONT_PRODUCTS, element: <StorefrontProductsPage /> },
          { path: ROUTES.STOREFRONT_PRODUCT_DETAIL, element: <StorefrontProductDetailPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.CUSTOMER.value]} />,
    children: [
      {
        element: <DashboardLayout area="customer" />,
        children: [
          { path: ROUTES.CUSTOMER_CART, element: <CartPage /> },
          { path: ROUTES.CUSTOMER_ORDERS, element: <OrdersPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.SELLER.value]} />,
    children: [
      {
        element: <DashboardLayout area="seller" />,
        children: [
          { path: ROUTES.SELLER_DASHBOARD, element: <SellerDashboardPage /> },
          { path: ROUTES.SELLER_STORE, element: <StoreFormPage /> },
          { path: ROUTES.SELLER_DESIGN, element: <StoreDesignPage /> },
          { path: ROUTES.SELLER_PRODUCTS, element: <SellerProductsPage /> },
          { path: ROUTES.SELLER_ORDERS, element: <SellerOrdersPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.ADMIN.value]} />,
    children: [
      {
        element: <DashboardLayout area="admin" />,
        children: [
          { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboardPage /> },
          { path: ROUTES.ADMIN_STORES, element: <AdminStoresPage /> },
          { path: ROUTES.ADMIN_PRODUCTS, element: <AdminProductsPage /> },
          { path: ROUTES.ADMIN_USERS, element: <AdminUsersPage /> },
          { path: ROUTES.ADMIN_SETTINGS, element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
])