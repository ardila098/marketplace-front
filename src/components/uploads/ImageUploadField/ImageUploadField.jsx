import { useCallback, useEffect, useState } from 'react'
import { Form, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { uploadService } from '../../../services/uploadService'
import { getUploadUrl } from '../../../constants/uploadRoutes'

const MAX_IMAGE_SIZE_MB = 8
const MAX_IMAGE_SIZE_BYTES = MAX_IMAGE_SIZE_MB * 1024 * 1024

const normalizeValue = value => {
  if (Array.isArray(value)) return value.filter(Boolean)
  return value ? [value] : []
}

const getOutputValue = (images, multiple) => {
  return multiple ? images : images[0] || ''
}

const buildFileList = (images = [], uploadRoute) => {
  return images.map((fileName, index) => ({
    uid: fileName || String(index),
    name: fileName,
    status: 'done',
    url: getUploadUrl(uploadRoute, fileName),
    fileName,
  }))
}

const getFileNameFromResponse = response => {
  return (
    response?.data?.fileName ||
    response?.fileName ||
    response?.data?.data?.fileName
  )
}

const getImagesKey = images => normalizeValue(images).join('|')

const ImageUploadInput = ({
  value,
  onChange,
  onValueChange,
  onUploadingChange,
  folder,
  uploadRoute,
  maxCount = 5,
  multiple = true,
  disabled = false,
}) => {
  const [fileList, setFileList] = useState([])

  const validateFile = file => {
    if (file.size <= MAX_IMAGE_SIZE_BYTES) return true

    message.error(`La imagen no puede pesar mas de ${MAX_IMAGE_SIZE_MB} MB`)
    return Upload.LIST_IGNORE
  }

  useEffect(() => {
    const images = normalizeValue(value)

    setFileList(currentFileList => {
      const currentImages = currentFileList
        .map(file => file.fileName)
        .filter(Boolean)

      if (getImagesKey(images) === getImagesKey(currentImages)) {
        return currentFileList
      }

      return buildFileList(images, uploadRoute)
    })
  }, [value, uploadRoute])

  const syncImages = nextFileList => {
    const hasUploading = nextFileList.some(file => file.status === 'uploading')
    onUploadingChange?.(hasUploading)

    if (hasUploading) return

    const images = nextFileList
      .filter(file => file.status === 'done')
      .map(file => file.fileName)
      .filter(Boolean)

    const outputValue = getOutputValue(images, multiple)

    onChange?.(outputValue)
    onValueChange?.(outputValue)
  }

  const handleUpload = async ({ file, onSuccess, onError, onProgress }) => {
    try {
      const response = await uploadService.image({
        file,
        folder,
        onUploadProgress: event => {
          if (!event.total) return

          onProgress?.({
            percent: Math.round((event.loaded * 100) / event.total),
          })
        },
      })

      onSuccess?.(response)
    } catch (error) {
      message.error(error?.message || 'No se pudo subir la imagen')
      onError?.(error)
    }
  }

  const handleChange = ({ fileList: nextList }) => {
    const nextFileList = nextList.map(file => {
      const fileName =
        file.fileName ||
        getFileNameFromResponse(file.response)

      return {
        ...file,
        fileName,
        name: fileName || file.name,
        url: fileName
          ? getUploadUrl(uploadRoute, fileName)
          : file.url,
      }
    })

    setFileList(nextFileList)
    syncImages(nextFileList)
  }

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      customRequest={handleUpload}
      onChange={handleChange}
      beforeUpload={validateFile}
      maxCount={maxCount}
      multiple={multiple}
      accept="image/jpeg,image/png,image/webp"
      disabled={disabled}
    >
      {fileList.length >= maxCount ? null : (
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Subir</div>
        </div>
      )}
    </Upload>
  )
}

const ImageUploadField = ({
  label = 'Imagenes',
  name = 'images',
  folder,
  uploadRoute,
  maxCount = 5,
  multiple = true,
  disabled = false,
  rules = [],
  onUploadingChange,
}) => {
  const form = Form.useFormInstance()
  const handleValueChange = useCallback(value => {
    form.setFieldValue(name, value)
  }, [form, name])

  return (
    <Form.Item
      label={label}
      name={name}
      rules={rules}
    >
      <ImageUploadInput
        folder={folder}
        uploadRoute={uploadRoute}
        maxCount={maxCount}
        multiple={multiple}
        disabled={disabled}
        onValueChange={handleValueChange}
        onUploadingChange={onUploadingChange}
      />
    </Form.Item>
  )
}

export default ImageUploadField
