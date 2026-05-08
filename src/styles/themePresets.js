export const neutralTheme = {
  primaryColor: '#111111',
  backgroundColor: '#ffffff',
  surfaceColor: '#f7f7f8',
  textColor: '#111111',
  mutedTextColor: '#6b7280',
  borderRadius: 14
}

export const buildStoreTheme = store => ({
  ...neutralTheme,
  primaryColor: store?.theme?.primaryColor || neutralTheme.primaryColor,
  backgroundColor: store?.theme?.backgroundColor || neutralTheme.backgroundColor,
  surfaceColor: store?.theme?.surfaceColor || neutralTheme.surfaceColor,
  textColor: store?.theme?.textColor || neutralTheme.textColor,
  mutedTextColor: store?.theme?.mutedTextColor || neutralTheme.mutedTextColor,
  borderRadius: store?.theme?.borderRadius || neutralTheme.borderRadius
})
