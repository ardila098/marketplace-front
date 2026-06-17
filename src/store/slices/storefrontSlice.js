import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storeService } from '../../services/storeService'

const initialState = {
  currentStore: null,
  loading: false,
  error: null
}

// El backend no expone /stores/slug/:slug todavía, así que traemos la lista real
// de tiendas (GET /stores) y filtramos por slug del lado del cliente.
export const loadStorefront = createAsyncThunk('storefront/load', async storeSlug => {
  const response = await storeService.list()
  const stores = response?.data || []
  return stores.find(store => store.slug === storeSlug) || null
})

const storefrontSlice = createSlice({
  name: 'storefront',
  initialState,
  reducers: {
    clearStorefront: state => {
      state.currentStore = null
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(loadStorefront.pending, state => { state.loading = true; state.error = null })
      .addCase(loadStorefront.fulfilled, (state, action) => {
        state.loading = false
        state.currentStore = action.payload?.store || action.payload || null
      })
      .addCase(loadStorefront.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearStorefront } = storefrontSlice.actions
export default storefrontSlice.reducer
