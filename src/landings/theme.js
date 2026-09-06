export const FONT_PRESETS = Object.freeze({
  modern: {
    label: 'Moderna',
    stack: "'Inter', 'Segoe UI', system-ui, -apple-system, sans-serif",
    family: 'Inter',
  },
  editorial: {
    label: 'Editorial',
    stack: "'Playfair Display', Georgia, 'Times New Roman', serif",
    family: 'Playfair Display',
  },
  clean: {
    label: 'Redondeada amigable',
    stack: "'Nunito Sans', 'Avenir Next', 'Segoe UI', system-ui, sans-serif",
    family: 'Nunito Sans',
  },
  display: {
    label: 'Display moderna',
    stack: "'Poppins', 'Segoe UI', system-ui, sans-serif",
    family: 'Poppins',
  },
  space: {
    label: 'Space moderna',
    stack: "'Space Grotesk', 'Segoe UI', system-ui, sans-serif",
    family: 'Space Grotesk',
  },
  elegant: {
    label: 'Elegante',
    stack: "'Cormorant Garamond', Georgia, serif",
    family: 'Cormorant Garamond',
  },
  mono: {
    label: 'Técnica / mono',
    stack: "'JetBrains Mono', 'SFMono-Regular', Consolas, monospace",
    family: 'JetBrains Mono',
  },
})

export const FONT_OPTIONS = Object.entries(FONT_PRESETS).map(([value, preset]) => ({
  value,
  label: preset.label,
  style: { fontFamily: preset.stack },
}))

export const THEME_DEFAULTS = Object.freeze({
  primaryColor: '#111111',
  accentColor: '#f59e0b',
  backgroundColor: '#ffffff',
  surfaceColor: '#ffffff',
  textColor: '#111111',
  mutedColor: '#64748b',
  fontFamily: 'modern',
  baseFontSize: 16,
  sectionSpacing: 72,
  containerWidth: 1140,
  radius: 16,
  buttonRadius: 10,
})

export const buildTheme = (theme = {}) => ({
  ...THEME_DEFAULTS,
  ...theme,
  fontFamily: FONT_PRESETS[theme?.fontFamily] ? theme.fontFamily : THEME_DEFAULTS.fontFamily,
  baseFontSize: Number(theme?.baseFontSize) || THEME_DEFAULTS.baseFontSize,
  sectionSpacing: Number(theme?.sectionSpacing) || THEME_DEFAULTS.sectionSpacing,
  containerWidth: Number(theme?.containerWidth) || THEME_DEFAULTS.containerWidth,
  radius: Number.isFinite(Number(theme?.radius)) ? Number(theme.radius) : THEME_DEFAULTS.radius,
  buttonRadius: Number.isFinite(Number(theme?.buttonRadius))
    ? Number(theme.buttonRadius)
    : THEME_DEFAULTS.buttonRadius,
})

export const getFontStack = fontFamily => FONT_PRESETS[fontFamily]?.stack || FONT_PRESETS.modern.stack

export const getFontLoaderUrl = fontFamily => {
  const family = FONT_PRESETS[fontFamily]?.family
  if (!family) return ''

  return `https://fonts.googleapis.com/css2?family=${family.replace(/ /g, '+')}:wght@400;600;700;800&display=swap`
}

export const themeToCssVariables = theme => {
  const resolved = buildTheme(theme)

  return {
    '--lp-primary': resolved.primaryColor,
    '--lp-accent': resolved.accentColor,
    '--lp-bg': resolved.backgroundColor,
    '--lp-surface': resolved.surfaceColor,
    '--lp-text': resolved.textColor,
    '--lp-muted': resolved.mutedColor,
    '--lp-font': getFontStack(resolved.fontFamily),
    '--lp-font-size': `${resolved.baseFontSize}px`,
    '--lp-section-gap': `${resolved.sectionSpacing}px`,
    '--lp-container': `${resolved.containerWidth}px`,
    '--lp-radius': `${resolved.radius}px`,
    '--lp-button-radius': `${resolved.buttonRadius}px`,
  }
}

export const CONTRAST_TEXT = color => {
  const hex = String(color || '#111111').replace('#', '')
  if (hex.length < 6) return '#ffffff'

  const red = Number.parseInt(hex.slice(0, 2), 16)
  const green = Number.parseInt(hex.slice(2, 4), 16)
  const blue = Number.parseInt(hex.slice(4, 6), 16)
  const luminance = (red * 299 + green * 587 + blue * 114) / 1000

  return luminance > 150 ? '#111111' : '#ffffff'
}
