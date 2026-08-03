export const ROLES = Object.freeze({
  ADMIN: {
    value: 1,
    label: 'Admin',
  },
  SELLER: {
    value: 2,
    label: 'Seller',
  },
  CUSTOMER: {
    value: 3,
    label: 'Customer',
  },
  BROKER: {
    value: 4,
    label: 'Broker',
  },
  ADVISOR: {
    value: 5,
    label: 'Advisor',
  },
})

export const ROLE_VALUES = Object.freeze(
  Object.values(ROLES).map((role) => role.value)
)
