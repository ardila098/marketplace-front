import { createSlice } from '@reduxjs/toolkit'
import { env } from '../../config/env'

const dictionaries = {
  es: {
    marketplace: 'Marketplace',
    login: 'Iniciar sesión',
    register: 'Crear cuenta',
    addToCart: 'Agregar al carrito',
    products: 'Productos',
    stores: 'Tiendas'
  },
  en: {
    marketplace: 'Marketplace',
    login: 'Sign in',
    register: 'Create account',
    addToCart: 'Add to cart',
    products: 'Products',
    stores: 'Stores'
  }
}

const i18nSlice = createSlice({
  name: 'i18n',
  initialState: {
    locale: env.defaultLocale,
    dictionaries
  },
  reducers: {
    setLocale: (state, action) => {
      state.locale = action.payload
    }
  }
})

export const { setLocale } = i18nSlice.actions
export default i18nSlice.reducer
