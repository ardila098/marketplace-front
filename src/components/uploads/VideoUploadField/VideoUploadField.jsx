import { Button, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useState } from 'react'

import { uploadService } from '../../../services/uploadService'
import { getUploadUrl } from '../../../constants/uploadRoutes'

const MAX_VIDEO_SIZE_MB = 120
const MAX_VIDEO_SIZE_BYTES = MAX_VIDEO_SIZE_MB * 1024 * 1024
const ACCEPTED_VIDEOS = 'video/mp4,video/webm,video/ogg,video/quicktime'

const getFileNameFromResponse = response => {
  return (
    response?.data?.fileName ||
    response?.fileName ||
    response?.data?.data?.fileName
  )
}

const VideoUploadField = ({
  label = 'Video',
  value = '',
  onChange,
  folder,
  uploadRoute,
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false)
  const previewUrl = value ? getUploadUrl(uploadRoute, value) : ''

  const validateFile = file => {
    if (!ACCEPTED_VIDEOS.split(',').includes(file.type)) {
      message.error('Usa un video MP4, WebM u OGG')
      return Upload.LIST_IGNORE
    }

    if (file.size <= MAX_VIDEO_SIZE_BYTES) return true

    message.error(`El video no puede pesar mas de ${MAX_VIDEO_SIZE_MB} MB`)
    return Upload.LIST_IGNORE
  }

  const handleUpload = async ({ file, onSuccess, onError }) => {
    setUploading(true)

    try {
      const response = await uploadService.video({ file, folder })
      const fileName = getFileNameFromResponse(response)

      if (!fileName) {
        throw new Error('No se pudo leer el nombre del archivo subido')
      }

      onChange?.(fileName)
      onSuccess?.(response)
      message.success('Video subido correctamente')
    } catch (error) {
      message.error(error?.message || 'No se pudo subir el video')
      onError?.(error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      {label ? (
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>{label}</div>
      ) : null}

      {previewUrl ? (
        <video
          key={previewUrl}
          src={previewUrl}
          controls
          preload="metadata"
          style={{
            width: '100%',
            maxHeight: 240,
            borderRadius: 12,
            background: '#0f172a',
            display: 'block',
          }}
        />
      ) : null}

      <div style={{ marginTop: value ? 10 : 0 }}>
        <Upload
          accept={ACCEPTED_VIDEOS}
          showUploadList={false}
          beforeUpload={validateFile}
          customRequest={handleUpload}
          disabled={disabled || uploading}
        >
          <Button icon={<UploadOutlined />} loading={uploading} disabled={disabled || uploading}>
            {value ? 'Reemplazar video' : 'Subir video'}
          </Button>
        </Upload>
      </div>
    </div>
  )
}

export default VideoUploadField
