import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  drawerOpen: false
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    openCartDrawer: state => { state.drawerOpen = true },
    closeCartDrawer: state => { state.drawerOpen = false },
    toggleCartDrawer: state => { state.drawerOpen = !state.drawerOpen },
    addCartItem: (state, action) => {
      const { product, variant, quantity = 1 } = action.payload
      const existingItem = state.items.find(item => item.product._id === product._id && item.variant._id === variant._id)
      if (existingItem) {
        existingItem.quantity += quantity
        return
      }
      state.items.push({
        id: `${product._id}-${variant._id}`,
        product,
        variant,
        quantity,
        priceSnapshot: variant.price
      })
    },
    updateCartQuantity: (state, action) => {
      const { id, quantity } = action.payload
      const item = state.items.find(currentItem => currentItem.id === id)
      if (item) item.quantity = Math.max(1, quantity)
    },
    removeCartItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
    clearCart: state => { state.items = [] }
  }
})

export const selectCartItems = state => state.cart.items
export const selectCartCount = state => state.cart.items.reduce((total, item) => total + item.quantity, 0)
export const selectCartTotal = state => state.cart.items.reduce((total, item) => total + item.priceSnapshot * item.quantity, 0)

export const {
  openCartDrawer,
  closeCartDrawer,
  toggleCartDrawer,
  addCartItem,
  updateCartQuantity,
  removeCartItem,
  clearCart
} = cartSlice.actions

export default cartSlice.reducer
