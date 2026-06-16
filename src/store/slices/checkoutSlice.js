import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { checkoutService } from '../../services/checkoutService'

const initialState = {
  order: null,
  submitting: false,
  error: null,
}

const getErrorMessage = error => {
  return error?.message || error?.response?.data?.message || 'Error inesperado'
}

const normalizeOrder = payload => {
  return payload?.data?.data || payload?.data || payload || null
}

export const createOrderFromCart = createAsyncThunk(
  'checkout/createOrderFromCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await checkoutService.createOrder(payload)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    resetCheckoutState: state => {
      state.order = null
      state.submitting = false
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createOrderFromCart.pending, state => {
        state.submitting = true
        state.error = null
      })
      .addCase(createOrderFromCart.fulfilled, (state, action) => {
        state.submitting = false
        state.order = normalizeOrder(action.payload)
      })
      .addCase(createOrderFromCart.rejected, (state, action) => {
        state.submitting = false
        state.error = action.payload
      })
  },
})

export const selectCreatedOrder = state => state.checkout.order
export const selectCheckoutSubmitting = state => state.checkout.submitting
export const selectCheckoutError = state => state.checkout.error

export const { resetCheckoutState } = checkoutSlice.actions

export default checkoutSlice.reducer
