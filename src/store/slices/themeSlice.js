import { createSlice } from '@reduxjs/toolkit'
import { neutralTheme } from '../../styles/themePresets'

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    appTheme: neutralTheme
  },
  reducers: {
    setAppTheme: (state, action) => {
      state.appTheme = { ...state.appTheme, ...action.payload }
    },
    resetAppTheme: state => {
      state.appTheme = neutralTheme
    }
  }
})

export const { setAppTheme, resetAppTheme } = themeSlice.actions
export default themeSlice.reducer
