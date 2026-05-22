import {
  Button,
  Popconfirm,
  Space,
  Tooltip,
} from 'antd'
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusCircleOutlined,
  PlusSquareOutlined,
  SkinOutlined,
} from '@ant-design/icons'

const actionButtonStyle = {
  border: 'none',
  boxShadow: 'none',
}

const iconColors = {
  edit: '#1d4ed8',
  variant: '#047857',
  reference: '#4338ca',
  inventory: '#b45309',
  detail: '#475569',
  delete: '#b91c1c',
}

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
  referenceTitle = 'Añadir referencia',
  detailsTitle = 'Detalle',
  inventoryTitle = 'Añadir inventario',
  deleteDescription = '¿Seguro que deseas eliminar este registro?',
  showConfigurableSet = false,
  onAddInventoryItem,
  onAddReference,
  onManage,
}) => {
  const id = record?._id || record?.id

  return (
    <Space size="small">
      <Tooltip title={editText}>
        <Button
          size="small"
          type="text"
          icon={<EditOutlined style={{ color: iconColors.edit }} />}
          style={actionButtonStyle}
          onClick={() => onEdit?.(id)}
        />
      </Tooltip>

      {showVariant && (
        <Tooltip title={variantText}>
          <Button
            size="small"
            type="text"
            icon={<PlusCircleOutlined style={{ color: iconColors.variant }} />}
            style={actionButtonStyle}
            onClick={() => onAddVariant?.(record)}
          />
        </Tooltip>
      )}

      {showConfigurableSet && (
        <Tooltip title={referenceTitle}>
          <Button
            size="small"
            type="text"
            icon={<SkinOutlined style={{ color: iconColors.reference }} />}
            style={actionButtonStyle}
            onClick={() => onAddReference?.(record)}
          />
        </Tooltip>
      )}

      {showConfigurableSet && (
        <Tooltip title={inventoryTitle}>
          <Button
            size="small"
            type="text"
            icon={<PlusSquareOutlined style={{ color: iconColors.inventory }} />}
            style={actionButtonStyle}
            onClick={() => onAddInventoryItem?.(record)}
          />
        </Tooltip>
      )}

      <Tooltip title={detailsTitle}>
        <Button
          size="small"
          type="text"
          icon={<EyeOutlined style={{ color: iconColors.detail }} />}
          style={actionButtonStyle}
          onClick={() => onManage?.(record)}
        />
      </Tooltip>

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
              type="text"
              icon={<DeleteOutlined style={{ color: iconColors.delete }} />}
              style={actionButtonStyle}
            />
          </Tooltip>
        </Popconfirm>
      )}
    </Space>
  )
}

export default TableActions