import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import cartReducer from './slices/cartSlice'
import i18nReducer from './slices/i18nSlice'
import storefrontReducer from './slices/storefrontSlice'
import themeReducer from './slices/themeSlice'
import checkoutReducer from './slices/checkoutSlice'
import platformReducer from './slices/platformSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    i18n: i18nReducer,
    storefront: storefrontReducer,
    theme: themeReducer,
    checkout: checkoutReducer,
    platform: platformReducer,
  },
})
