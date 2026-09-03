export const getByPath = (source, path) => {
  const keys = Array.isArray(path) ? path : String(path).split('.')
  return keys.reduce((value, key) => (value === undefined || value === null ? undefined : value[key]), source)
}

export const setByPath = (source, path, nextValue) => {
  const keys = Array.isArray(path) ? path : String(path).split('.')
  const result = { ...source }
  let current = result

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      current[key] = nextValue
      return
    }

    current[key] =
      current[key] &&
      typeof current[key] === 'object' &&
      !Array.isArray(current[key])
        ? { ...current[key] }
        : {}
    current = current[key]
  })

  return result
}
