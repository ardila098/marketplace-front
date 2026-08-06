import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import { platformService } from '../../services/platformService'

export const DEFAULT_PLATFORM_SETTINGS = Object.freeze({
  name: 'Cooqys',
  logo: '',
  hero: {
    eyebrow: 'Marketplace multi-vertical',
    title: 'Compra por verticales seleccionadas.',
    subtitle:
      'Encuentra productos de varias tiendas en un solo lugar, con categorias pensadas para comprar rapido y sin ruido.',
    primaryCtaLabel: 'Explorar productos',
    secondaryCtaLabel: 'Ver verticales',
    verticalsSubtitle: 'Cada vertical agrupa tiendas y categorias relacionadas.',
    backgroundImage: '',
  },
  footer: {
    description: 'Marketplace multi-vertical para comprar productos seleccionados.',
  },
})

export const mergePlatformSettings = settings => ({
  ...DEFAULT_PLATFORM_SETTINGS,
  ...(settings || {}),
  hero: {
    ...DEFAULT_PLATFORM_SETTINGS.hero,
    ...(settings?.hero || {}),
  },
  footer: {
    ...DEFAULT_PLATFORM_SETTINGS.footer,
    ...(settings?.footer || {}),
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
