import { Layout } from 'antd'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import SiteFooter from '../components/layout/SiteFooter'
import ResponsivePublicMenu from '../components/navigation/ResponsivePublicMenu'
import UserActions from '../components/navigation/UserActions'
import { env } from '../config/env'
import { ROUTES } from '../constants/routes'
import StorefrontLayout from './StorefrontLayout'

const { Header, Content } = Layout

const HeaderBar = styled(Header)`
  height: 72px;
  background: rgba(255,255,255,.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f0f0f0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 0 max(20px, calc((100vw - 1180px) / 2));
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 768px) {
    grid-template-columns: auto auto 1fr;
    gap: 12px;
  }
`

const Brand = styled(Link)`
  color: #111;
  font-weight: 200;
  letter-spacing: 0;
  font-size: 18px;
  white-space: nowrap;
`

const PublicLayout = () => {
  const location = useLocation()
  const { currentStore, resolutionMode } = useSelector(state => state.storefront)
  const isCustomDomainHome = location.pathname === '/' && currentStore && resolutionMode === 'host'
  const isCustomDomainStorePath =
    currentStore &&
    resolutionMode === 'host' &&
    (
      location.pathname === '/products' ||
      location.pathname.startsWith('/products/') ||
      location.pathname === '/categories' ||
      location.pathname === '/outlet'
    )

  if (isCustomDomainHome) {
    return <StorefrontLayout />
  }

  if (isCustomDomainStorePath) {
    return <Outlet />
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <HeaderBar>
        <Brand to={ROUTES.HOME}>{env.appName || 'Marketplace'}</Brand>
        <ResponsivePublicMenu />
        <UserActions />
      </HeaderBar>
      <Content>
        <Outlet />
      </Content>
      <SiteFooter />
      <CartDrawer />
    </Layout>
  )
}

export default PublicLayout
