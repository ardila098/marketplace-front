import { Navigate, Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { hasAnyRole, hasPermission } from '../utils/permissions'

const ProtectedRoute = ({ roles = [], permission }) => {
  const {
    user,
    token,
    role,
    initialized,
    isAuthenticated,
  } = useAuth()

  if (!initialized) {
    return <Spin fullscreen />
  }

  if (!token || !isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (!hasAnyRole(role, roles)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  if (!hasPermission(role, permission)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <Outlet />
}

export default ProtectedRoute