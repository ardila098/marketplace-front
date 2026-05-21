import { useEffect, useState } from 'react'
import { Form, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

import { uploadService } from '../../../services/uploadService'
import { getUploadUrl } from '../../../constants/uploadRoutes'

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

const getImagesKey = images => {
  if (!Array.isArray(images)) return ''
  return images.join('|')
}

const ImageUploadInput = ({
  value,
  onChange,
  folder,
  uploadRoute,
  maxCount = 5,
  multiple = true,
  disabled = false,
}) => {
  const [fileList, setFileList] = useState([])

  useEffect(() => {
    const images = Array.isArray(value) ? value : []
    const currentImages = fileList
      .map(file => file.fileName)
      .filter(Boolean)

    if (getImagesKey(images) === getImagesKey(currentImages)) return

    setFileList(buildFileList(images, uploadRoute))
  }, [value, uploadRoute, fileList])

  const syncImages = nextFileList => {
    const hasUploading = nextFileList.some(file => file.status === 'uploading')

    if (hasUploading) return

    const images = nextFileList
      .filter(file => file.status === 'done')
      .map(file => file.fileName)
      .filter(Boolean)

    onChange?.(images)
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
  label = 'Imágenes',
  name = 'images',
  folder,
  uploadRoute,
  maxCount = 5,
  multiple = true,
  disabled = false,
  rules = [],
}) => {
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
      />
    </Form.Item>
  )
}

export default ImageUploadField