import { useSelector } from 'react-redux'
import { getPermissionsByRole } from '../utils/permissions'

export const useAuth = () => {
  const auth = useSelector(state => state.auth)
  const role = auth.user?.role

  return {
    ...auth,
    role,
    isAuthenticated: Boolean(auth.token),
    permissions: getPermissionsByRole(role)
  }
}
