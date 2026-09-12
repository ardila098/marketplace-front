import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { platformService } from '../../services/platformService'

export const DEFAULT_PLATFORM_SETTINGS = Object.freeze({
  name: 'Cooqys',
  logo: '',
  navigation: {
    backgroundColor: '#ffffff',
    textColor: '#111111',
    logoSize: 38,
    transparentOnHome: true,
  },
  hero: {
    showcaseEnabled: false,
    showcaseContentType: 'products',
    slideImages: [],
    slideFrameStyle: 'solid',
    featuredProducts: [],
    productCtaLabel: 'Ver producto',
    backgroundType: 'color',
    backgroundColor: '#f6f1ea',
    backgroundPosition: 'center',
    overlayEnabled: true,
    overlayOpacity: 0.35,
    eyebrow: 'Marketplace multi-vertical',
    title: 'Compra por verticales seleccionadas.',
    subtitle:
      'Encuentra productos de varias tiendas en un solo lugar, con categorias pensadas para comprar rapido y sin ruido.',
    primaryCtaLabel: 'Explorar productos',
    secondaryCtaLabel: 'Ver verticales',
    verticalsSubtitle: 'Cada vertical agrupa tiendas y categorias relacionadas.',
    verticalsEnabled: true,
    verticalsLayout: 'showcase',
    verticalsTitle: 'Verticales destacadas',
    verticalsImageSide: 'right',
    verticalsBackgroundType: 'color',
    verticalsBackgroundColor: '#f7f4ef',
    verticalsBackgroundImage: '',
    verticalsBackgroundPosition: 'center',
    verticalsOverlayEnabled: false,
    verticalsOverlayOpacity: 0.35,
    verticalsFrameStyle: 'solid',
    verticalsImageHeight: 420,
    showcaseAutoplaySeconds: 6,
    verticalsAutoplaySeconds: 6,
    relatedAutoplaySeconds: 5,
    backgroundImage: '',
  },
  footer: {
    description: 'Marketplace multi-vertical para comprar productos seleccionados.',
  },
  seo: {
    title: 'Cooqys',
    description: 'Marketplace multi-vertical para comprar productos seleccionados.',
    keywords: [],
    image: '',
  },
})

export const mergePlatformSettings = settings => ({
  ...DEFAULT_PLATFORM_SETTINGS,
  ...(settings || {}),
  navigation: {
    ...DEFAULT_PLATFORM_SETTINGS.navigation,
    ...(settings?.navigation || {}),
  },
  hero: {
    ...DEFAULT_PLATFORM_SETTINGS.hero,
    ...(settings?.hero || {}),
  },
  footer: {
    ...DEFAULT_PLATFORM_SETTINGS.footer,
    ...(settings?.footer || {}),
  },
  seo: {
    ...DEFAULT_PLATFORM_SETTINGS.seo,
    ...(settings?.seo || {}),
  },
})

export const loadPlatformSettings = createAsyncThunk(
  'platform/loadSettings',
  async () => {
    const response = await platformService.getSettings()

    return mergePlatformSettings(response.data)
  }
)

const platformSlice = createSlice({
  name: 'platform',
  initialState: {
    settings: DEFAULT_PLATFORM_SETTINGS,
    loading: false,
    loaded: false,
    error: null,
  },
  reducers: {
    setPlatformSettings: (state, action) => {
      state.settings = mergePlatformSettings(action.payload)
      state.loaded = true
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadPlatformSettings.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loadPlatformSettings.fulfilled, (state, action) => {
        state.loading = false
        state.loaded = true
        state.settings = mergePlatformSettings(action.payload)
      })
      .addCase(loadPlatformSettings.rejected, (state, action) => {
        state.loading = false
        state.loaded = true
        state.error = action.error.message
      })
  },
})

export const { setPlatformSettings } = platformSlice.actions
export const selectPlatformSettings = state => state.platform.settings
export const selectPlatformSettingsLoaded = state => state.platform.loaded
export default platformSlice.reducer
