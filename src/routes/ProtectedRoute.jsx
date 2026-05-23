import { Navigate, Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { hasAnyRole, hasPermission } from '../utils/permissions'

const ProtectedRoute = ({ roles = [], permission }) => {
  const {
    user,
    role,
    initialized,
    loading,
    isAuthenticated,
  } = useAuth()

  if (!initialized || loading) {
    return <Spin fullscreen />
  }

  if (!isAuthenticated || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  if (roles.length > 0 && !hasAnyRole(role, roles)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  if (permission && !hasPermission(role, permission)) {
    return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  }

  return <Outlet />
}

export default ProtectedRoute