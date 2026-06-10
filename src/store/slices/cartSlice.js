import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { cartService } from '../../services/cartService'

const initialState = {
  cart: null,
  items: [],
  drawerOpen: false,
  loading: false,
  adding: false,
  updating: false,
  error: null,
}

const getErrorMessage = error => {
  return error?.message || error?.response?.data?.message || 'Error inesperado'
}

const getNormalizedCart = payload => {
  return payload?.data?.data || payload?.data || payload || null
}

const setCartData = (state, payload) => {
  const cart = getNormalizedCart(payload)

  state.cart = cart
  state.items = cart?.items || []
}

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.getCart()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const addItemToCart = createAsyncThunk(
  'cart/addItemToCart',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.addItem(payload)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const updateCartItemQuantity = createAsyncThunk(
  'cart/updateCartItemQuantity',
  async (payload, { rejectWithValue }) => {
    try {
      return await cartService.updateItemQuantity(payload)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const removeCartItem = createAsyncThunk(
  'cart/removeCartItem',
  async (itemId, { rejectWithValue }) => {
    try {
      return await cartService.removeItem(itemId)
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

export const clearCartAsync = createAsyncThunk(
  'cart/clearCartAsync',
  async (_, { rejectWithValue }) => {
    try {
      return await cartService.clearCart()
    } catch (error) {
      return rejectWithValue(getErrorMessage(error))
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDrawer: state => {
      state.drawerOpen = true
    },

    closeCartDrawer: state => {
      state.drawerOpen = false
    },

    toggleCartDrawer: state => {
      state.drawerOpen = !state.drawerOpen
    },

    clearCartState: state => {
      state.cart = null
      state.items = []
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCart.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false
        setCartData(state, action.payload)
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })

      .addCase(addItemToCart.pending, state => {
        state.adding = true
        state.error = null
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.adding = false
        state.drawerOpen = true
        setCartData(state, action.payload)
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.adding = false
        state.error = action.payload
      })

      .addCase(updateCartItemQuantity.pending, state => {
        state.updating = true
        state.error = null
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
        state.updating = false
        setCartData(state, action.payload)
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })

      .addCase(removeCartItem.pending, state => {
        state.updating = true
        state.error = null
      })
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.updating = false
        setCartData(state, action.payload)
      })
      .addCase(removeCartItem.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })

      .addCase(clearCartAsync.pending, state => {
        state.updating = true
        state.error = null
      })
      .addCase(clearCartAsync.fulfilled, (state, action) => {
        state.updating = false
        setCartData(state, action.payload)
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.updating = false
        state.error = action.payload
      })
  },
})

export const selectCart = state => state.cart.cart
export const selectCartItems = state => state.cart.items
export const selectCartDrawerOpen = state => state.cart.drawerOpen
export const selectCartLoading = state => state.cart.loading
export const selectCartAdding = state => state.cart.adding
export const selectCartUpdating = state => state.cart.updating
export const selectCartError = state => state.cart.error

export const selectCartCount = state => {
  return state.cart.items.reduce((total, item) => {
    return total + Number(item.quantity || 0)
  }, 0)
}

export const selectCartTotal = state => {
  return state.cart.items.reduce((total, item) => {
    return total + Number(item.priceSnapshot || 0) * Number(item.quantity || 0)
  }, 0)
}

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  clearCartState,
} = cartSlice.actions

export default cartSlice.reducer