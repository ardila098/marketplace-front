import axios from 'axios'
import { env } from '../config/env'

const getToken = () => localStorage.getItem('accessToken')

const addAuthHeader = config => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
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

client.interceptors.request.use(addAuthHeader)
fileClient.interceptors.request.use(addAuthHeader)

client.interceptors.response.use(handleResponse, handleError)
fileClient.interceptors.response.use(handleResponse, handleError)