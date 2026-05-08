import { lazy, Suspense } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Spin } from 'antd'
import { ROLES } from '../constants/roles'
import { ROUTES } from '../constants/routes'
import ProtectedRoute from './ProtectedRoute'
import StorefrontRoute from './StorefrontRoute'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import StorefrontLayout from '../layouts/StorefrontLayout'

const lazyPage = importer => {
  const Component = lazy(importer)
  return (
    <Suspense fallback={<Spin fullscreen />}>
      <Component />
    </Suspense>
  )
}

const HomePage = () => lazyPage(() => import('../pages/public/HomePage'))
const ProductListPage = () => lazyPage(() => import('../pages/public/ProductListPage'))
const ProductDetailPage = () => lazyPage(() => import('../pages/public/ProductDetailPage'))
const StoresPage = () => lazyPage(() => import('../pages/public/StoresPage'))
const LoginPage = () => lazyPage(() => import('../pages/public/LoginPage'))
const RegisterPage = () => lazyPage(() => import('../pages/public/RegisterPage'))
const StorefrontHomePage = () => lazyPage(() => import('../pages/storefront/StorefrontHomePage'))
const StorefrontProductsPage = () => lazyPage(() => import('../pages/storefront/StorefrontProductsPage'))
const StorefrontProductDetailPage = () => lazyPage(() => import('../pages/storefront/StorefrontProductDetailPage'))
const CartPage = () => lazyPage(() => import('../pages/customer/CartPage'))
const OrdersPage = () => lazyPage(() => import('../pages/customer/OrdersPage'))
const SellerDashboardPage = () => lazyPage(() => import('../pages/seller/SellerDashboardPage'))
const StoreFormPage = () => lazyPage(() => import('../pages/seller/StoreFormPage'))
const StoreDesignPage = () => lazyPage(() => import('../pages/seller/StoreDesignPage'))
const SellerProductsPage = () => lazyPage(() => import('../pages/seller/SellerProductsPage'))
const SellerOrdersPage = () => lazyPage(() => import('../pages/seller/SellerOrdersPage'))
const AdminDashboardPage = () => lazyPage(() => import('../pages/admin/AdminDashboardPage'))
const AdminStoresPage = () => lazyPage(() => import('../pages/admin/AdminStoresPage'))
const AdminProductsPage = () => lazyPage(() => import('../pages/admin/AdminProductsPage'))
const AdminUsersPage = () => lazyPage(() => import('../pages/admin/AdminUsersPage'))
const AdminSettingsPage = () => lazyPage(() => import('../pages/admin/AdminSettingsPage'))
const UnauthorizedPage = () => lazyPage(() => import('../pages/system/UnauthorizedPage'))

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.MARKETPLACE, element: <ProductListPage /> },
      { path: ROUTES.STORES, element: <StoresPage /> },
      { path: ROUTES.PRODUCT_DETAIL, element: <ProductDetailPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> }
    ]
  },
  {
    element: <StorefrontRoute />,
    children: [
      {
        element: <StorefrontLayout />,
        children: [
          { path: ROUTES.STOREFRONT_HOME, element: <StorefrontHomePage /> },
          { path: ROUTES.STOREFRONT_PRODUCTS, element: <StorefrontProductsPage /> },
          { path: ROUTES.STOREFRONT_PRODUCT_DETAIL, element: <StorefrontProductDetailPage /> }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute roles={[ROLES.CUSTOMER]} />,
    children: [
      {
        element: <DashboardLayout area="customer" />,
        children: [
          { path: ROUTES.CUSTOMER_CART, element: <CartPage /> },
          { path: ROUTES.CUSTOMER_ORDERS, element: <OrdersPage /> }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute roles={[ROLES.SELLER]} />,
    children: [
      {
        element: <DashboardLayout area="seller" />,
        children: [
          { path: ROUTES.SELLER_DASHBOARD, element: <SellerDashboardPage /> },
          { path: ROUTES.SELLER_STORE, element: <StoreFormPage /> },
          { path: ROUTES.SELLER_DESIGN, element: <StoreDesignPage /> },
          { path: ROUTES.SELLER_PRODUCTS, element: <SellerProductsPage /> },
          { path: ROUTES.SELLER_ORDERS, element: <SellerOrdersPage /> }
        ]
      }
    ]
  },
  {
    element: <ProtectedRoute roles={[ROLES.ADMIN]} />,
    children: [
      {
        element: <DashboardLayout area="admin" />,
        children: [
          { path: ROUTES.ADMIN_DASHBOARD, element: <AdminDashboardPage /> },
          { path: ROUTES.ADMIN_STORES, element: <AdminStoresPage /> },
          { path: ROUTES.ADMIN_PRODUCTS, element: <AdminProductsPage /> },
          { path: ROUTES.ADMIN_USERS, element: <AdminUsersPage /> },
          { path: ROUTES.ADMIN_SETTINGS, element: <AdminSettingsPage /> }
        ]
      }
    ]
  }
])
