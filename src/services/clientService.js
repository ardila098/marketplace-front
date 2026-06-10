import axios from 'axios'
import { env } from '../config/env'
import { getGuestId } from '../helpers/guestCart'

const getToken = () => localStorage.getItem('accessToken')

const addRequestHeaders = config => {
  const token = getToken()
  const guestId = getGuestId()

  config.headers = config.headers || {}

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  if (guestId) {
    config.headers['x-guest-id'] = guestId
  }

  return config
}

const handleResponse = response => response.data

const handleError = error => {
  const message =
    error?.response?.data?.message ||
    error.message ||
    'Error inesperado'

  return Promise.reject(new Error(message))
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

client.interceptors.request.use(addRequestHeaders)
fileClient.interceptors.request.use(addRequestHeaders)

client.interceptors.response.use(handleResponse, handleError)
fileClient.interceptors.response.use(handleResponse, handleError)