import { Layout } from 'antd'
import { useEffect, useState } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import SiteFooter from '../components/layout/SiteFooter'
import ResponsivePublicMenu from '../components/navigation/ResponsivePublicMenu'
import UserActions from '../components/navigation/UserActions'
import { ROUTES } from '../constants/routes'
import { getUploadUrl, UPLOAD_ROUTES } from '../constants/uploadRoutes'
import { selectPlatformSettings } from '../store/slices/platformSlice'
import StorefrontLayout from './StorefrontLayout'

const { Header, Content } = Layout

const PageLayout = styled(Layout)`
  min-height: 100vh;
`

const HeaderBar = styled(Header)`
  color: ${({ $textColor }) => $textColor || '#111111'};

  a {
    color: inherit;
  }

  .ant-menu-light.ant-menu-horizontal,
  .ant-menu-light.ant-menu-horizontal > .ant-menu-item,
  .ant-menu-light.ant-menu-horizontal > .ant-menu-submenu {
    background: transparent;
    color: inherit;
    border-bottom: 0;
  }

  .ant-menu-light.ant-menu-horizontal > .ant-menu-item:hover,
  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected,
  .ant-menu-light.ant-menu-horizontal > .ant-menu-item-selected::after {
    color: inherit;
  }

  height: 72px;
  ${({ $overlayNav, $scrolled, $backgroundColor }) => (
    $overlayNav
      ? css`
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background: ${$scrolled ? $backgroundColor || 'rgba(255,255,255,.94)' : 'transparent'};
          border-bottom: ${$scrolled ? '1px solid rgba(0,0,0,.08)' : '0'};
          backdrop-filter: ${$scrolled ? 'blur(14px)' : 'none'};
          transition: background 240ms ease, border-color 240ms ease;
        `
      : css`
          position: sticky;
          top: 0;
          background: ${$backgroundColor || 'rgba(255,255,255,.92)'};
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #f0f0f0;
        `
  )}
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 24px;
  align-items: center;
  padding: 0 max(20px, calc((100vw - 1180px) / 2));
  z-index: 50;

  @media (max-width: 768px) {
    grid-template-columns: auto auto 1fr;
    gap: 12px;
  }
`

const Brand = styled(Link)`
  color: inherit;
  font-weight: 200;
  letter-spacing: 0;
  font-size: 18px;
  white-space: nowrap;
  display: inline-flex;
  align-items: center;
  min-height: 42px;
`

const BrandLogo = styled.img`
  width: auto;
  max-width: 138px;
  max-height: 38px;
  object-fit: contain;
`

const PublicLayout = () => {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const { currentStore, resolutionMode } = useSelector(state => state.storefront)
  const platformSettings = useSelector(selectPlatformSettings)
  const logoUrl = getUploadUrl(UPLOAD_ROUTES.platform.logos, platformSettings.logo)
  const navigation = platformSettings.navigation || {}
  const isCustomDomainHome = location.pathname === '/' && currentStore && resolutionMode === 'host'
  const isOverlayNav =
    !currentStore &&
    location.pathname === '/' &&
    navigation.transparentOnHome === true

  useEffect(() => {
    if (!isOverlayNav) {
      setScrolled(false)
      return undefined
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 24)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [isOverlayNav])
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
    <PageLayout>
      <HeaderBar
        $overlayNav={isOverlayNav}
        $scrolled={scrolled}
        $backgroundColor={navigation.backgroundColor}
        $textColor={navigation.textColor}
      >
        <Brand to={ROUTES.HOME}>
          {logoUrl ? (
            <BrandLogo src={logoUrl} alt={platformSettings.name || 'Marketplace'} />
          ) : (
            platformSettings.name || 'Marketplace'
          )}
        </Brand>
        <ResponsivePublicMenu />
        <UserActions showLoginLinks={false} />
      </HeaderBar>
      <Content>
        <Outlet />
      </Content>
      <SiteFooter />
      <CartDrawer />
    </PageLayout>
  )
}

export default PublicLayout
