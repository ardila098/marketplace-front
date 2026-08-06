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
  padding: 0 24px;
`
const StyledContent = styled(Content)`padding: 28px; background: #fafafa;`
const Brand = styled.div`
  min-height: 72px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
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
          <Space>
            {!screens.lg && <Button icon={<MenuIcon size={18} />} onClick={() => setDrawerOpen(true)} />}
            <Avatar>{area?.[0]?.toUpperCase()}</Avatar>
            <div>
              <Typography.Text strong>{area.toUpperCase()}</Typography.Text><br />
              <Typography.Text type="secondary">{user?.name || user?.email || 'Usuario'}</Typography.Text>
            </div>
          </Space>
          <UserActions />
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
