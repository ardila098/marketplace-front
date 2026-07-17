import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storeService } from '../../services/storeService'

const initialState = {
  currentStore: null,
  resolutionMode: null,
  loading: false,
  error: null,
}

const normalizeStore = payload => {
  return payload?.data || payload?.store || payload || null
}

export const loadStorefront = createAsyncThunk('storefront/load', async target => {
  if (typeof target === 'string') {
    const response = await storeService.getBySlug(target)
    return {
      store: normalizeStore(response),
      resolutionMode: 'slug',
    }
  }

  const params = target?.host
    ? { host: target.host }
    : { slug: target?.slug }

  const response = await storeService.resolve(params)

  return {
    store: normalizeStore(response),
    resolutionMode: target?.host ? 'host' : 'slug',
  }
})

const storefrontSlice = createSlice({
  name: 'storefront',
  initialState,
  reducers: {
    clearStorefront: state => {
      state.currentStore = null
      state.resolutionMode = null
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadStorefront.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(loadStorefront.fulfilled, (state, action) => {
        state.loading = false
        state.currentStore = action.payload.store
        state.resolutionMode = action.payload.resolutionMode
      })
      .addCase(loadStorefront.rejected, (state, action) => {
        state.loading = false
        state.currentStore = null
        state.resolutionMode = null
        state.error = action.error.message
      })
  },
})

export const { clearStorefront } = storefrontSlice.actions
export default storefrontSlice.reducer
