import { createBrowserRouter } from 'react-router-dom'
import { ROLES } from '../constants/roles'
import { ROUTES } from '../constants/routes'
import ProtectedRoute from './ProtectedRoute'
import StorefrontRoute from './StorefrontRoute'
import PublicLayout from '../layouts/PublicLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import StorefrontLayout from '../layouts/StorefrontLayout'
import { createLazyPage } from './LazyPage'

const HomePage = createLazyPage(() => import('../pages/home/Homepage'))
const ProductListPage = createLazyPage(() => import('../pages/items/ItemsListPage'))
const ItemDetailPage = createLazyPage(() => import('../pages/itemDetails/ItemDetailsPage'))
const LoginPage = createLazyPage(() => import('../pages/public/LoginPage'))
const RegisterPage = createLazyPage(() => import('../pages/public/RegisterPage'))

const StorefrontHomePage = createLazyPage(() => import('../pages/storefront/StorefrontHomePage'))
const StorefrontProductsPage = createLazyPage(() => import('../pages/storefront/StorefrontProductsPage'))
const StorefrontCategoriesPage = createLazyPage(() => import('../pages/storefront/StorefrontCategoriesPage'))
const StorefrontProductDetailPage = createLazyPage(
  () => import('../pages/storefront/StorefrontProductDetailPage')
)
const StorefrontAgencyItemDetailPage = createLazyPage(
  () => import('../pages/storefront/StorefrontAgencyItemDetailPage')
)
const StoresPage = createLazyPage(() => import('../pages/stores/StoresPage'))
const BrokerPublicPage = createLazyPage(() => import('../pages/brokers/BrokerPublicPage'))

const CartPage = createLazyPage(() => import('../pages/customer/CartPage'))
const CheckoutPage = createLazyPage(() => import('../pages/checkout/CheckoutPage'))
const CheckoutResultPage = createLazyPage(() => import('../pages/checkout/CheckoutResultPage'))
const OrdersPage = createLazyPage(() => import('../pages/customer/OrdersPage'))
const OrdersLookupPage = createLazyPage(() => import('../pages/orders/components/OrderLookupPage'))

const VerticalsPage = createLazyPage(() => import('../pages/verticals/VerticalsPage'))
const VerticalPage = createLazyPage(() => import('../pages/vertical/VerticalPage'))
const SellerDashboardPage = createLazyPage(
  () => import('../pages/seller/components/SellerDashboardPage/SellerDashboardPage')
)
const StoreFormPage = createLazyPage(() => import('../pages/seller/StoreFormPage'))
const StoreDesignPage = createLazyPage(() => import('../pages/seller/StoreDesignPage'))
const SellerProductsPage = createLazyPage(
  () => import('../pages/seller/components/SellerProducts/SellerProductsPage')
)
const AgencyItemsPage = createLazyPage(() => import('../pages/seller/AgencyItemsPage'))
const AgencyLeadsPage = createLazyPage(() => import('../pages/agency/AgencyLeadsPage'))
const CouponsPage = createLazyPage(() => import('../pages/coupons/CouponsPage'))
const CustomersPage = createLazyPage(() => import('../pages/customers/CustomersPage'))
const PayoutsPage = createLazyPage(() => import('../pages/payouts/PayoutsPage'))
const CreditApplicationsPage = createLazyPage(() => import('../pages/creditApplications/CreditApplicationsPage'))
const SellerOrdersPage = createLazyPage(() => import('../pages/orders/OrdersPage'))
const OrderDetailPage = createLazyPage(() => import('../pages/orders/components/OrdersDetails'))
const SellerProductManagePage = createLazyPage(
  () => import('../pages/seller/components/sellerProductsManage/SellerProductsManagePage')
)

const AdminDashboardPage = createLazyPage(() => import('../pages/admin/AdminDashboardPage'))
const AdminStoresPage = createLazyPage(() => import('../pages/admin/AdminStoresPage'))
const AdminAdvisorsPage = createLazyPage(() => import('../pages/admin/AdminAdvisorsPage'))
const AdminVerticalsPage = createLazyPage(() => import('../pages/admin/AdminVerticalsPage'))
const AdminProductsPage = createLazyPage(() => import('../pages/admin/AdminProductsPage'))
const AdminCategoriesPage = createLazyPage(() => import('../pages/admin/AdminCategoriesPage'))
const AdminUsersPage = createLazyPage(() => import('../pages/admin/AdminUsersPage'))
const AdminSettingsPage = createLazyPage(() => import('../pages/admin/AdminSettingsPage'))
const AdminOrdersPage = createLazyPage(() => import('../pages/orders/OrdersPage'))
const BrokerDashboardPage = createLazyPage(() => import('../pages/broker/BrokerDashboardPage'))
const BrokerProfilePage = createLazyPage(() => import('../pages/broker/BrokerProfilePage'))
const AdvisorDashboardPage = createLazyPage(() => import('../pages/advisor/AdvisorDashboardPage'))
const AdvisorStoresPage = createLazyPage(() => import('../pages/advisor/AdvisorStoresPage'))
const AdvisorPayoutsPage = createLazyPage(() => import('../pages/advisor/AdvisorPayoutsPage'))

const UnauthorizedPage = createLazyPage(() => import('../pages/system/UnauthorizedPage'))

export const router = createBrowserRouter([
  {
    element: <PublicLayout />,
    children: [
      { path: ROUTES.HOME, element: <HomePage /> },
      { path: ROUTES.VERTICAL, element: <VerticalPage /> },
      { path: ROUTES.VERTICALS, element: <VerticalsPage /> },
      { path: ROUTES.MARKETPLACE, element: <ProductListPage /> },
      { path: ROUTES.STORES, element: <StoresPage /> },
      { path: ROUTES.BROKER_PUBLIC_PROFILE, element: <BrokerPublicPage /> },
      { path: ROUTES.VERTICAL_PRODUCT_DETAIL, element: <ItemDetailPage /> },
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.REGISTER, element: <RegisterPage /> },
      { path: ROUTES.UNAUTHORIZED, element: <UnauthorizedPage /> },
      { path: ROUTES.CUSTOMER_CART, element: <CartPage /> },
      { path: ROUTES.CHECKOUT, element: <CheckoutPage /> },
      { path: ROUTES.CHECKOUT_RESULT, element: <CheckoutResultPage /> },
      { path: ROUTES.ORDER_LOOKUP, element: <OrdersLookupPage /> },
      { path: ROUTES.ORDER_DETAIL, element: <OrderDetailPage /> },
      {
        element: <StorefrontRoute />,
        children: [
          {
            element: <StorefrontLayout />,
            children: [
              { path: '/products', element: <StorefrontProductsPage /> },
              { path: '/categories', element: <StorefrontCategoriesPage /> },
              { path: '/outlet', element: <StorefrontProductsPage /> },
              { path: '/products/:productSlug', element: <StorefrontProductDetailPage /> },
              { path: '/agency-items/:itemSlug', element: <StorefrontAgencyItemDetailPage /> },
            ],
          },
        ],
      },
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
          { path: ROUTES.STOREFRONT_CATEGORIES, element: <StorefrontCategoriesPage /> },
          { path: ROUTES.STOREFRONT_OUTLET, element: <StorefrontProductsPage /> },
          { path: ROUTES.STOREFRONT_PRODUCT_DETAIL, element: <StorefrontProductDetailPage /> },
          { path: ROUTES.STOREFRONT_AGENCY_ITEM_DETAIL, element: <StorefrontAgencyItemDetailPage /> },
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
          { path: ROUTES.SELLER_AGENCY_ITEMS, element: <AgencyItemsPage /> },
          { path: ROUTES.SELLER_AGENCY_LEADS, element: <AgencyLeadsPage /> },
          { path: ROUTES.SELLER_COUPONS, element: <CouponsPage /> },
          { path: ROUTES.SELLER_CUSTOMERS, element: <CustomersPage /> },
          { path: ROUTES.SELLER_ORDERS, element: <SellerOrdersPage /> },
          { path: ROUTES.SELLER_PAYOUTS, element: <PayoutsPage /> },
          { path: ROUTES.SELLER_CREDIT_APPLICATIONS, element: <CreditApplicationsPage /> },
          { path: ROUTES.SELLER_PRODUCTS_MANAGE, element: <SellerProductManagePage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.BROKER.value]} />,
    children: [
      {
        element: <DashboardLayout area="broker" />,
        children: [
          { path: ROUTES.BROKER_DASHBOARD, element: <BrokerDashboardPage /> },
          { path: ROUTES.BROKER_PROFILE, element: <BrokerProfilePage /> },
          { path: ROUTES.BROKER_CREDIT_APPLICATIONS, element: <CreditApplicationsPage /> },
        ],
      },
    ],
  },
  {
    element: <ProtectedRoute roles={[ROLES.ADVISOR.value]} />,
    children: [
      {
        element: <DashboardLayout area="advisor" />,
        children: [
          { path: ROUTES.ADVISOR_DASHBOARD, element: <AdvisorDashboardPage /> },
          { path: ROUTES.ADVISOR_STORES, element: <AdvisorStoresPage /> },
          { path: ROUTES.ADVISOR_PAYOUTS, element: <AdvisorPayoutsPage /> },
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
          { path: ROUTES.ADMIN_ADVISORS, element: <AdminAdvisorsPage /> },
          { path: ROUTES.ADMIN_AGENCY_LEADS, element: <AgencyLeadsPage /> },
          { path: ROUTES.ADMIN_VERTICALS, element: <AdminVerticalsPage /> },
          { path: ROUTES.ADMIN_PRODUCTS, element: <AdminProductsPage /> },
          { path: ROUTES.ADMIN_CATEGORIES, element: <AdminCategoriesPage /> },
          { path: ROUTES.ADMIN_COUPONS, element: <CouponsPage /> },
          { path: ROUTES.ADMIN_CUSTOMERS, element: <CustomersPage /> },
          { path: ROUTES.ADMIN_USERS, element: <AdminUsersPage /> },
          { path: ROUTES.ADMIN_ORDERS, element: <AdminOrdersPage /> },
          { path: ROUTES.ADMIN_PAYOUTS, element: <PayoutsPage /> },
          { path: ROUTES.ADMIN_CREDIT_APPLICATIONS, element: <CreditApplicationsPage /> },
          { path: ROUTES.ADMIN_SETTINGS, element: <AdminSettingsPage /> },
        ],
      },
    ],
  },
])
