import { Avatar, Button, Drawer, Grid, Layout, Menu, Space, Typography } from 'antd'
import { Menu as MenuIcon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import CartDrawer from '../components/cart/CartDrawer'
import UserActions from '../components/navigation/UserActions'
import { appMenuByArea, getSellerMenuByBusinessType, sellerBaseMenu } from '../constants/menu'
import { ROLES } from '../constants/roles'
import { useAuth } from '../hooks/useAuth'
import { storeService } from '../services/storeService'
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
const Brand = styled.div`padding: 24px; font-weight: 850; letter-spacing: -.05em; font-size: 18px;`

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
          <Brand>Marketplace</Brand>
          {menu}
        </Sider>
      ) : (
        <Drawer title="Marketplace" open={drawerOpen} onClose={() => setDrawerOpen(false)} placement="left" width={290}>
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
