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

export const arrayToText = values => (values || []).join(', ')
export const textToArray = value =>
  String(value || '')
    .split(',')
    .map(item => item.trim())
    .filter(Boolean)
export const datesToText = values =>
  (values || []).map(value => String(value).slice(0, 10)).join(', ')
export const textToDates = value => textToArray(value).map(item => item.slice(0, 10))

export const pairsToText = (values = [], leftKey, rightKey) =>
  values.map(item => [item?.[leftKey], item?.[rightKey]].filter(Boolean).join(' | ')).join('\n')

export const textToPairs = (value, leftKey, rightKey) =>
  String(value || '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .map(line => {
      const [left, ...rightParts] = line.split('|')

      return {
        [leftKey]: String(left || '').trim(),
        [rightKey]: rightParts.join('|').trim(),
      }
    })
    .filter(item => item[leftKey] || item[rightKey])
