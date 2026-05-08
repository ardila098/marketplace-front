import { neutralTheme } from './themePresets'

export const createAntdTheme = (theme = neutralTheme) => ({
  token: {
    colorPrimary: theme.primaryColor,
    colorText: theme.textColor,
    colorTextSecondary: theme.mutedTextColor,
    colorBgLayout: theme.backgroundColor,
    colorBgContainer: '#ffffff',
    borderRadius: theme.borderRadius,
    fontFamily: "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  components: {
    Button: {
      controlHeight: 42,
      borderRadius: theme.borderRadius
    },
    Card: {
      borderRadiusLG: theme.borderRadius + 4
    },
    Table: {
      headerBg: '#fafafa',
      rowHoverBg: '#f8f8f8'
    }
  }
})

export const antdTheme = createAntdTheme()
