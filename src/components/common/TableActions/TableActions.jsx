import { Button, Popconfirm, Space, Tooltip } from 'antd'
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from '@ant-design/icons'

const TableActions = ({
  record,
  onEdit,
  onDelete,
  onAddVariant,
  showDelete = true,
  showVariant = false,
  editText = 'Editar',
  deleteText = 'Eliminar',
  variantText = 'Variante',
  deleteTitle = 'Eliminar registro',
  deleteDescription = '¿Seguro que deseas eliminar este registro?',
}) => {
  return (
    <Space size="small">
      <Tooltip title={editText}>
        <Button
          size="small"
          icon={<EditOutlined />}
          onClick={() => onEdit?.(record._id || record.id)}
        />
      </Tooltip>

      {showVariant && (
        <Tooltip title={variantText}>
          <Button
            size="small"
            icon={<PlusCircleOutlined />}
            onClick={() => onAddVariant?.(record)}
          />
        </Tooltip>
      )}

      {showDelete && (
        <Popconfirm
          title={deleteTitle}
          description={deleteDescription}
          okText="Sí"
          cancelText="Cancelar"
          onConfirm={() => onDelete?.(record)}
        >
          <Tooltip title={deleteText}>
            <Button
              size="small"
              danger
              icon={<DeleteOutlined />}
            />
          </Tooltip>
        </Popconfirm>
      )}
    </Space>
  )
}

export default TableActions