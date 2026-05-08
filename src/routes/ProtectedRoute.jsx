import { Navigate, Outlet } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { useAuth } from '../hooks/useAuth'
import { hasAnyRole, hasPermission } from '../utils/permissions'

const ProtectedRoute = ({ roles = [], permission }) => {
  const { isAuthenticated, role } = useAuth()

  if (!isAuthenticated) return <Navigate to={ROUTES.LOGIN} replace />
  if (!hasAnyRole(role, roles)) return <Navigate to={ROUTES.UNAUTHORIZED} replace />
  if (!hasPermission(role, permission)) return <Navigate to={ROUTES.UNAUTHORIZED} replace />

  return <Outlet />
}

export default ProtectedRoute
