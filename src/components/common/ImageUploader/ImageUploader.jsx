import { PlusOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { useImageUpload } from '../../../hooks/useImageUpload'

const ImageUploader = ({
  value,
  onChange,
  uploadRoute,
  uploadRequest,
  multiple = false,
  maxCount = 1,
  disabled = false,
}) => {
  const {
    fileList,
    customRequest,
    handleRemove,
  } = useImageUpload({
    value,
    onChange,
    uploadRoute,
    uploadRequest,
    multiple,
  })

  return (
    <Upload
      listType="picture-card"
      fileList={fileList}
      customRequest={customRequest}
      onRemove={handleRemove}
      maxCount={maxCount}
      multiple={multiple}
      disabled={disabled}
      accept="image/*"
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

export default ImageUploader