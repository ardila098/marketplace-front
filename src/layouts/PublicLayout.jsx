import { Layout } from 'antd'
import { Outlet, Link } from 'react-router-dom'
import styled from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import ResponsivePublicMenu from '../components/navigation/ResponsivePublicMenu'
import UserActions from '../components/navigation/UserActions'
import { env } from '../config/env'
import { ROUTES } from '../constants/routes'

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
  font-weight: 850;
  letter-spacing: -0.05em;
  font-size: 20px;
  white-space: nowrap;
`

const PublicLayout = () => (
  <Layout>
    <HeaderBar>
      <Brand to={ROUTES.HOME}>{}</Brand>
      <ResponsivePublicMenu />
      <UserActions />
    </HeaderBar>
    <Content>
      <Outlet />
    </Content>
    <CartDrawer />
  </Layout>
)

export default PublicLayout
