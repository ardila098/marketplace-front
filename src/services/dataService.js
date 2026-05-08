import { authHeader, client } from './clientService'

class DataService {
  static get(path = '', params = {}, signal) {
    return client({
      method: 'GET',
      url: path,
      headers: {
        ...authHeader(),
      },
      params,
      signal,
    })
  }

  static post(path = '', data = {}, optionalHeader = {}) {
    return client({
      method: 'POST',
      url: path,
      data,
      headers: {
        ...authHeader(),
        ...optionalHeader,
      },
    })
  }

  static patch(path = '', data = {}) {
    return client({
      method: 'PATCH',
      url: path,
      data,
      headers: {
        ...authHeader(),
      },
    })
  }

  static put(path = '', data = {}) {
    return client({
      method: 'PUT',
      url: path,
      data,
      headers: {
        ...authHeader(),
      },
    })
  }

  static delete(path = '', data = {}) {
    return client({
      method: 'DELETE',
      url: path,
      params: data,
      headers: {
        ...authHeader(),
      },
    })
  }

  static postFile(path = '', file, fieldName = 'image', extraData = {}) {
    const formData = new FormData()

    formData.append(fieldName, file)

    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return client({
      method: 'POST',
      url: path,
      data: formData,
      headers: {
        ...authHeader(),
      },
    })
  }

  static putFile(path = '', file, fieldName = 'image', extraData = {}) {
    const formData = new FormData()

    formData.append(fieldName, file)

    Object.entries(extraData).forEach(([key, value]) => {
      formData.append(key, value)
    })

    return client({
      method: 'PUT',
      url: path,
      data: formData,
      headers: {
        ...authHeader(),
      },
    })
  }
}

export { DataService }
