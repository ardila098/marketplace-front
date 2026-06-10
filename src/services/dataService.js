import { client, fileClient } from './clientService'

class DataService {
  static get(path = '', params = {}, config = {}) {
    return client({
      method: 'GET',
      url: path,
      params,
      ...config,
    })
  }

  static post(path = '', data = {}, config = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      ...config,
    })
  }

  static patch(path = '', data = {}, config = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data,
      ...config,
    })
  }

  static put(path = '', data = {}, config = {}) {
    return client({
      method: 'PUT',
      url: path,
      data,
      ...config,
    })
  }

  static delete(path = '', config = {}) {
    return client({
      method: 'DELETE',
      url: path,
      ...config,
    })
  }

  static postFile(path = '', file, fieldName = 'image', onUploadProgress) {
    const formData = new FormData()

    formData.append(fieldName, file)

    return fileClient({
      method: 'POST',
      url: path,
      data: formData,
      onUploadProgress,
    })
  }

  static putFile(path = '', file, fieldName = 'image', onUploadProgress) {
    const formData = new FormData()

    formData.append(fieldName, file)

    return fileClient({
      method: 'PUT',
      url: path,
      data: formData,
      onUploadProgress,
    })
  }
}

export { DataService }