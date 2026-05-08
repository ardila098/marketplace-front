import { Button, Layout, Space } from 'antd'
import { ShoppingBag } from 'lucide-react'
import { Outlet, Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import UserActions from '../components/navigation/UserActions'
import { buildRoute, ROUTES } from '../constants/routes'
import { mockStores } from '../data/mockData'
import { buildStoreTheme } from '../styles/themePresets'
import { openCartDrawer } from '../store/slices/cartSlice'

const { Header, Content } = Layout

const HeaderBar = styled(Header)`
  height: 74px;
  background: ${({ theme }) => theme.surfaceColor || '#fff'};
  border-bottom: 1px solid rgba(0,0,0,.08);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 max(20px, calc((100vw - 1180px) / 2));
  position: sticky;
  top: 0;
  z-index: 20;
`

const Brand = styled(Link)`
  color: ${({ theme }) => theme.textColor || '#111'};
  font-weight: 850;
  letter-spacing: -0.05em;
  font-size: 20px;
`

const StorefrontLayout = () => {
  const dispatch = useDispatch()
  const { storeSlug } = useParams()
  const currentStore = useSelector(state => state.storefront.currentStore)
  const store = currentStore || mockStores.find(item => item.slug === storeSlug)
  const storeTheme = buildStoreTheme(store)

  return (
    <ThemeProvider theme={storeTheme}>
      <Layout style={{ background: storeTheme.backgroundColor }}>
        <HeaderBar>
          <Brand to={buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug })}>{store?.name || 'Tienda'}</Brand>
          <Space size="large">
            <Link to={ROUTES.MARKETPLACE}>Marketplace</Link>
            <Link to={buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug })}>Productos</Link>
            <Button icon={<ShoppingBag size={18} />} onClick={() => dispatch(openCartDrawer())}>Carrito</Button>
            <UserActions />
          </Space>
        </HeaderBar>
        <Content>
          <Outlet />
        </Content>
        <CartDrawer />
      </Layout>
    </ThemeProvider>
  )
}

export default StorefrontLayout
