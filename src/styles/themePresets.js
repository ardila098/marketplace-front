export const neutralTheme = {
  primaryColor: '#111111',
  backgroundColor: '#ffffff',
  surfaceColor: '#f7f7f8',
  textColor: '#111111',
  mutedTextColor: '#6b7280',
  borderRadius: 14
}

export const buildStoreTheme = store => {
  const theme = store?.storefront?.theme || store?.theme || {}

  return {
    ...neutralTheme,
    primaryColor: theme.primaryColor || neutralTheme.primaryColor,
    backgroundColor: theme.backgroundColor || neutralTheme.backgroundColor,
    surfaceColor: theme.surfaceColor || neutralTheme.surfaceColor,
    textColor: theme.textColor || neutralTheme.textColor,
    mutedTextColor: theme.mutedTextColor || neutralTheme.mutedTextColor,
    borderRadius: theme.borderRadius || neutralTheme.borderRadius
  }
}
