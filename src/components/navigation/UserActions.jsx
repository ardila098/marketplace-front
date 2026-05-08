import { Avatar, Badge, Button, Dropdown, Space } from 'antd'
import { LogOut, ShoppingBag, User } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { ROUTES } from '../../constants/routes'
import { useAuth } from '../../hooks/useAuth'
import { logout } from '../../store/slices/authSlice'
import { openCartDrawer, selectCartCount } from '../../store/slices/cartSlice'

const dashboardByRole = {
  admin: ROUTES.ADMIN_DASHBOARD,
  seller: ROUTES.SELLER_DASHBOARD,
  customer: ROUTES.CUSTOMER_ORDERS
}

const UserActions = () => {
  const dispatch = useDispatch()
  const cartCount = useSelector(selectCartCount)
  const { user, role } = useAuth()

  const menuItems = user ? [
    { key: 'dashboard', label: <Link to={dashboardByRole[role] || ROUTES.HOME}>Mi panel</Link> },
    { key: 'logout', label: 'Cerrar sesión', icon: <LogOut size={15} />, onClick: () => dispatch(logout()) }
  ] : []

  return (
    <Space size="middle">
      <Badge count={cartCount} size="small">
        <Button icon={<ShoppingBag size={18} />} onClick={() => dispatch(openCartDrawer())}>Carrito</Button>
      </Badge>
      {user ? (
        <Dropdown menu={{ items: menuItems }} trigger={['click']}>
          <Avatar icon={<User size={18} />} style={{ cursor: 'pointer' }} />
        </Dropdown>
      ) : (
        <Space>
          <Link to={ROUTES.LOGIN}>Ingresar</Link>
          <Link to={ROUTES.REGISTER}><Button type="primary">Crear cuenta</Button></Link>
        </Space>
      )}
    </Space>
  )
}

export default UserActions
