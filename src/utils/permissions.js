import { ROLE_PERMISSIONS } from '../constants/permissions'

export const getPermissionsByRole = role => ROLE_PERMISSIONS[role] || []

export const hasPermission = (role, permission) => {
  if (!permission) return true
  return getPermissionsByRole(role).includes(permission)
}

export const hasAnyRole = (currentRole, allowedRoles = []) => {
  if (!allowedRoles.length) return true
  return allowedRoles.includes(currentRole)
}

export const filterMenuByRole = (items = [], role) => (
  items.filter(item => hasPermission(role, item.permission))
)
