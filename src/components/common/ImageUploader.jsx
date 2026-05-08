import { Button, Progress, Upload } from 'antd'
import { UploadCloud } from 'lucide-react'
import { useState } from 'react'
import { uploadService } from '../../services/uploadService'

const ImageUploader = ({ type = 'product', onUploaded }) => {
  const [progress, setProgress] = useState(0)

  const customRequest = async ({ file, onSuccess, onError }) => {
    try {
      const response = type === 'product'
        ? await uploadService.productImage(file, event => setProgress(Math.round((event.loaded * 100) / event.total)))
        : await uploadService.storeAsset(file, type, event => setProgress(Math.round((event.loaded * 100) / event.total)))
      onUploaded?.(response.path || response.url || response.image)
      onSuccess(response)
    } catch (error) {
      onError(error)
    }
  }

  return (
    <Upload customRequest={customRequest} showUploadList={false} accept="image/*">
      <Button icon={<UploadCloud size={16} />}>Subir imagen</Button>
      {progress > 0 && progress < 100 && <Progress percent={progress} size="small" />}
    </Upload>
  )
}

export default ImageUploader
