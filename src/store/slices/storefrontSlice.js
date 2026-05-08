import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { storeService } from '../../services/storeService'

const initialState = {
  currentStore: null,
  loading: false,
  error: null
}

export const loadStorefront = createAsyncThunk('storefront/load', async storeSlug => storeService.getBySlug(storeSlug))

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
        state.currentStore = action.payload.store || action.payload
      })
      .addCase(loadStorefront.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const { clearStorefront } = storefrontSlice.actions
export default storefrontSlice.reducer
