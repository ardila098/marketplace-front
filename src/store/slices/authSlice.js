import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authService } from '../../services/authService'

const initialState = {
  user: null,
  token: localStorage.getItem('accessToken'),
  loading: false,
  error: null,
}

export const login = createAsyncThunk('auth/login', async payload => {
  const response = await authService.login(payload)

  localStorage.setItem('accessToken', response.token)

  return response
})

export const loadSession = createAsyncThunk('auth/loadSession', async () => {
  return authService.me()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: state => {
      state.user = null
      state.token = null
      state.error = null

      localStorage.removeItem('accessToken')
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
        state.user = action.payload.user
        state.token = action.payload.token
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

      .addCase(loadSession.fulfilled, (state, action) => {
        state.user = action.payload.user
      })

      .addCase(loadSession.rejected, state => {
        state.user = null
        state.token = null

        localStorage.removeItem('accessToken')
      })
  },
})

export const { logout } = authSlice.actions

export default authSlice.reducer