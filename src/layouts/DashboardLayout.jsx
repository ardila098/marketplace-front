import { Avatar, Button, Drawer, Grid, Layout, Menu, Space, Typography } from 'antd'
import { Menu as MenuIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import UserActions from '../components/navigation/UserActions'
import { appMenuByArea, getSellerMenuByBusinessType, sellerBaseMenu } from '../constants/menu'
import { ROLES } from '../constants/roles'
import { getUploadUrl, UPLOAD_ROUTES } from '../constants/uploadRoutes'
import { useAuth } from '../hooks/useAuth'
import { storeService } from '../services/storeService'
import { selectPlatformSettings } from '../store/slices/platformSlice'
import { filterMenuByRole } from '../utils/permissions'

const { Sider, Content, Header } = Layout
const { useBreakpoint } = Grid

const StyledLayout = styled(Layout)`min-height: 100vh;`
const StyledHeader = styled(Header)`
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 64px;
  height: auto;
  line-height: normal;
  padding: 0 24px;

  @media (max-width: 768px) {
    gap: 10px;
    padding: 10px 12px;
  }
`
const StyledContent = styled(Content)`
  min-width: 0;
  padding: 28px;
  background: #fafafa;

  @media (max-width: 768px) {
    padding: 16px 12px 40px;
    overflow-x: hidden;
  }
`
const Brand = styled.div`
  min-height: 72px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  min-width: 0;
  color: #111;
  font-size: 18px;
  font-weight: 650;
  letter-spacing: 0;
`

const BrandLogo = styled.img`
  width: auto;
  max-width: 150px;
  max-height: 40px;
  object-fit: contain;
`

const HeaderIdentity = styled(Space)`
  min-width: 0;

  .ant-typography {
    line-height: 1.2;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const HeaderUserName = styled(Typography.Text)`
  display: block;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const MobileHeaderStart = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 40px minmax(0, 1fr);
    align-items: center;
    gap: 10px;
    flex: 1;
    min-width: 0;
  }
`

const MobileMenuButton = styled(Button)`
  width: 40px;
  height: 40px;
`

const MobileBrand = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  color: #111;
  font-size: 16px;
  font-weight: 650;
`

const MobileBrandLogo = styled(BrandLogo)`
  max-width: 118px;
  max-height: 32px;
`

const HeaderActions = styled.div`
  flex-shrink: 0;
`

const DashboardBrand = ({ name, logoUrl }) => (
  <Brand>
    {logoUrl ? <BrandLogo src={logoUrl} alt={name} /> : name}
  </Brand>
)

const DashboardMenu = ({ items, selectedKey, onClick }) => (
  <Menu mode="inline" selectedKeys={[selectedKey]} items={items} onClick={onClick} />
)

const DashboardLayout = ({ area }) => {
  const location = useLocation()
  const screens = useBreakpoint()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [sellerStore, setSellerStore] = useState(null)
  const [sellerStoreLoaded, setSellerStoreLoaded] = useState(false)
  const { role, user } = useAuth()
  const platformSettings = useSelector(selectPlatformSettings)
  const platformName = platformSettings.name || 'Marketplace'
  const platformLogoUrl = getUploadUrl(UPLOAD_ROUTES.platform.logos, platformSettings.logo)

  useEffect(() => {
    if (area !== 'seller' || Number(role) !== ROLES.SELLER.value) {
      setSellerStore(null)
      setSellerStoreLoaded(false)
      return
    }

    let mounted = true
    setSellerStoreLoaded(false)

    storeService.getMyStore()
      .then(response => {
        if (mounted) setSellerStore(response.data || null)
      })
      .catch(() => {
        if (mounted) setSellerStore(null)
      })
      .finally(() => {
        if (mounted) setSellerStoreLoaded(true)
      })

    return () => {
      mounted = false
    }
  }, [area, role])

  const items = useMemo(() => {
    let baseMenu = appMenuByArea[area] || []

    if (area === 'seller') {
      baseMenu = sellerStoreLoaded && sellerStore
        ? getSellerMenuByBusinessType(sellerStore.businessType)
        : sellerBaseMenu
    }

    return filterMenuByRole(baseMenu, role).map(item => ({
      key: item.path,
      icon: item.icon ? <item.icon size={18} /> : null,
      label: <Link to={item.path}>{item.label}</Link>
    }))
  }, [area, role, sellerStore, sellerStoreLoaded])

  const menu = <DashboardMenu items={items} selectedKey={location.pathname} onClick={() => setDrawerOpen(false)} />
  const homePath = items[0]?.key || location.pathname
  const areaLabel = (area || '').toUpperCase()

  return (
    <StyledLayout>
      {screens.lg ? (
        <Sider width={260} theme="light">
          <DashboardBrand name={platformName} logoUrl={platformLogoUrl} />
          {menu}
        </Sider>
      ) : (
        <Drawer title={platformName} open={drawerOpen} onClose={() => setDrawerOpen(false)} placement="left" width={290}>
          {menu}
        </Drawer>
      )}
      <Layout>
        <StyledHeader>
          <HeaderIdentity>
            <Avatar>{area?.[0]?.toUpperCase()}</Avatar>
            <div>
              <Typography.Text strong>{areaLabel}</Typography.Text>
              <HeaderUserName type="secondary">{user?.name || user?.email || 'Usuario'}</HeaderUserName>
            </div>
          </HeaderIdentity>

          <MobileHeaderStart>
            <MobileMenuButton icon={<MenuIcon size={18} />} onClick={() => setDrawerOpen(true)} />
            <MobileBrand to={homePath} aria-label={platformName}>
              {platformLogoUrl ? <MobileBrandLogo src={platformLogoUrl} alt={platformName} /> : platformName}
            </MobileBrand>
          </MobileHeaderStart>

          <HeaderActions>
            <UserActions compact={!screens.lg} />
          </HeaderActions>
        </StyledHeader>
        <StyledContent>
          <Outlet />
        </StyledContent>
      </Layout>
      <CartDrawer />
    </StyledLayout>
  )
}

export default DashboardLayout
