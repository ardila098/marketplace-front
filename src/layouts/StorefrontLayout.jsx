import { Button, Drawer, Layout, Space } from 'antd'
import { useState } from 'react'
import { Outlet, Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { ThemeProvider } from 'styled-components'
import { Menu as MenuIcon } from 'lucide-react'
import CartDrawer from '../components/cart/CartDrawer'
import SiteFooter from '../components/layout/SiteFooter'
import UserActions from '../components/navigation/UserActions'
import StorefrontSearchDrawer from '../components/storefront/StorefrontSearchDrawer'
import { buildRoute, ROUTES } from '../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../constants/uploadRoutes'
import { useDictionaryTranslation } from '../hooks/useDictionaryTranslation'
import { buildStoreTheme } from '../styles/themePresets'

const { Header, Content } = Layout

const HeaderBar = styled(Header)`
  min-height: 68px;
  background: ${({ theme }) => `${theme.surfaceColor || '#fff'}30`};
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 18px;
  padding: 0 max(20px, calc((100vw - 1180px) / 2));
  position: sticky;
  top: 0;
  z-index: 20;

  @media (max-width: 768px) {
    grid-template-columns: 44px 1fr auto;
    min-height: 64px;
    padding-top: 14px;
    padding-bottom: 14px;
  }
`

const Brand = styled(Link)`
  color: ${({ theme }) => theme.textColor || '#111'};
  font-weight: 200;
  letter-spacing: 0;
  font-size: 18px;
  display: inline-flex;
  align-items: center;
  min-width: 0;
`

const BrandLogo = styled.img`
  display: block;
  width: auto;
  max-width: 152px;
  max-height: 42px;
  object-fit: contain;

  @media (max-width: 768px) {
    margin: 0 auto;
    max-width: 138px;
    max-height: 36px;
  }
`

const BrandText = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const NavLink = styled(Link)`
  color: ${({ theme }) => theme.textColor || '#111'};
  font-weight: 400;
  font-size: 14px;

  &:hover {
    color: ${({ theme }) => theme.primaryColor || '#111'};
  }
`

const DesktopNav = styled(Space)`
  justify-self: end;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileMenuButton = styled(Button)`
  display: none;
  border: none;
  background: transparent;
  box-shadow: none;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`

const MobileActions = styled(Space)`
  display: none;

  @media (max-width: 768px) {
    display: inline-flex;
  }
`

const DrawerContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;

  a {
    color: ${({ theme }) => theme.textColor || '#111'};
    font-size: 15px;
    font-weight: 450;
  }
`

const StorefrontLayout = () => {
  const { translate } = useDictionaryTranslation()
  const { storeSlug } = useParams()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { currentStore: store, resolutionMode } = useSelector(state => state.storefront)
  const activeStoreSlug = storeSlug || store?.slug
  const homePath =
    resolutionMode === 'host'
      ? '/'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_HOME, { storeSlug: activeStoreSlug })
        : '/'
  const productsPath =
    resolutionMode === 'host'
      ? '/products'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_PRODUCTS, { storeSlug: activeStoreSlug })
        : '/products'
  const categoriesPath =
    resolutionMode === 'host'
      ? '/categories'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_CATEGORIES, { storeSlug: activeStoreSlug })
        : '/categories'
  const outletPath =
    resolutionMode === 'host'
      ? '/outlet'
      : activeStoreSlug
        ? buildRoute(ROUTES.STOREFRONT_OUTLET, { storeSlug: activeStoreSlug })
        : '/outlet'
  const storeTheme = buildStoreTheme(store)
  const logoUrl = getUploadUrl(UPLOAD_ROUTES.stores.logos, store?.logo)
  const navLinks = [
    { to: homePath, label: translate('home') },
    { to: productsPath, label: translate('products') },
    { to: categoriesPath, label: translate('categories') },
    { to: outletPath, label: translate('outlet') },
  ]

  return (
    <ThemeProvider theme={storeTheme}>
      <Layout style={{ background: storeTheme.backgroundColor, minHeight: '100vh' }}>
        <HeaderBar>
          <MobileMenuButton
            aria-label={translate('menu')}
            icon={<MenuIcon size={18} />}
            onClick={() => setDrawerOpen(true)}
          />

          <Brand to={homePath}>
            {logoUrl ? (
              <BrandLogo src={logoUrl} alt={store?.name || 'Tienda'} />
            ) : (
              <BrandText>{store?.name || 'Tienda'}</BrandText>
            )}
          </Brand>

          <DesktopNav size="middle" wrap>
            {navLinks.map(item => (
              <NavLink key={item.to} to={item.to}>
                {item.label}
              </NavLink>
            ))}
            <StorefrontSearchDrawer storeSlug={activeStoreSlug} resolutionMode={resolutionMode} />
            <UserActions />
          </DesktopNav>

          <MobileActions size={4}>
            <StorefrontSearchDrawer storeSlug={activeStoreSlug} resolutionMode={resolutionMode} />
            <UserActions compact showAccount={false} />
          </MobileActions>
        </HeaderBar>

        <Drawer
          title={store?.name || 'Tienda'}
          placement="left"
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          size="default"
        >
          <DrawerContent>
            {navLinks.map(item => (
              <Link key={item.to} to={item.to} onClick={() => setDrawerOpen(false)}>
                {item.label}
              </Link>
            ))}
            <UserActions compact={false} showAccount />
          </DrawerContent>
        </Drawer>

        <Content>
          <Outlet />
        </Content>
        <SiteFooter store={store} resolutionMode={resolutionMode} />
        <CartDrawer />
      </Layout>
    </ThemeProvider>
  )
}

export default StorefrontLayout
