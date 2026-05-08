import axios from 'axios'
import { env } from '../config/env'

export const authHeader = () => {
  const token = localStorage.getItem('accessToken')

  if (!token) {
    return {}
  }

  return {
    Authorization: `Bearer ${token}`,
  }
}

export const client = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.response.use(
  response => response.data,
  error => {
    const message = error?.response?.data?.message || error.message || 'Error inesperado'
    return Promise.reject(new Error(message))
  }
)
