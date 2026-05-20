import axios from 'axios'
import { env } from '../config/env'

export const authHeader = () => {
  const token = localStorage.getItem('accessToken')

  if (!token) return {}

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

export const fileClient = axios.create({
  baseURL: env.apiBaseUrl,
  timeout: 30000,
})

const handleResponse = response => response.data

const handleError = error => {
  const message =
    error?.response?.data?.message ||
    error.message ||
    'Error inesperado'

  return Promise.reject(new Error(message))
}

client.interceptors.response.use(handleResponse, handleError)
fileClient.interceptors.response.use(handleResponse, handleError)