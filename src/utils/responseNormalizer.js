export const normalizeListResponse = response => {
  return {
    data: response?.data || [],
    page: response?.page || 1,
    pageSize: response?.pageSize || 10,
    total: response?.total || 0,
    totalPages: response?.totalPages || response?.pages || 1,
    message: response?.message || '',
  }
}

export const normalizeItemResponse = (response, defaultMessage = '') => {
  return {
    data: response?.data || null,
    message: response?.message || defaultMessage,
  }
}

export const normalizeAuthResponse = (response, defaultMessage = '') => {
  return {
    data: response?.data || null,
    token: response?.token || response?.accessToken || response?.data?.token || response?.data?.accessToken || null,
    user: response?.user || response?.data?.user || null,
    message: response?.message || defaultMessage,
  }
}