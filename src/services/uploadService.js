import { dataService } from './dataService'

export const uploadService = {
  productImage: (file, onUploadProgress) => {
    const formData = new FormData()
    formData.append('image', file)
    return dataService.upload('/uploads/products', formData, onUploadProgress)
  },
  storeAsset: (file, type, onUploadProgress) => {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('type', type)
    return dataService.upload('/uploads/stores', formData, onUploadProgress)
  },
}
