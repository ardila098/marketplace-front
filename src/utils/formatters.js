export const currency = value =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))

export const formatCurrency = currency

export const normalizeText = value =>
  String(value || '')
    .toLowerCase()
    .trim()

export const getInitials = value =>
  String(value || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(part => part[0])
    .join('')
    .toUpperCase()
