import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

const TOKEN_KEY = 'accessToken'

const getStoredToken = () => localStorage.getItem(TOKEN_KEY)

const initialState = {
  user: null,
  token: getStoredToken(),
  loading: false,
  initialized: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async payload => {
  const response = await authService.login(payload)

  localStorage.setItem(TOKEN_KEY, response.token)

  return response
})

export const loadSession = createAsyncThunk('auth/loadSession', async () => {
  const token = getStoredToken()

  if (!token) {
    return {
      user: null,
      token: null,
    }
  }

  const response = await authService.me()

  return {
    user: response.user,
    token,
  }
})

const authSlice = createSlice({
  name: 'auth',

  initialState,

  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.error = null
      state.initialized = true

      localStorage.removeItem(TOKEN_KEY)
    },
  },

  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message || 'No se pudo iniciar sesión'
      })

      .addCase(loadSession.pending, state => {
        state.loading = true
        state.error = null
      })

      .addCase(loadSession.fulfilled, (state, action) => {
        state.loading = false
        state.initialized = true
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(loadSession.rejected, state => {
        state.loading = false
        state.initialized = true
        state.user = null
        state.token = null

        localStorage.removeItem(TOKEN_KEY)
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer