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
import styled from 'styled-components'

const ICON_COLORS = {
  edit: '#1d4ed8',
  variant: '#047857',
  reference: '#4338ca',
  inventory: '#b45309',
  detail: '#475569',
  delete: '#b91c1c',
}

const ActionButton = styled(Button)`
  border: none;
  box-shadow: none;
`

const ActionIcon = styled.span`
  color: ${({ $color }) => $color};
  display: inline-flex;
`

const renderIcon = (Icon, color) => (
  <ActionIcon $color={color}>
    <Icon />
  </ActionIcon>
)

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
        <ActionButton
          size="small"
          type="text"
          icon={renderIcon(EditOutlined, ICON_COLORS.edit)}
          onClick={() => onEdit?.(id)}
        />
      </Tooltip>

      {showVariant && (
        <Tooltip title={variantText}>
          <ActionButton
            size="small"
            type="text"
            icon={renderIcon(PlusCircleOutlined, ICON_COLORS.variant)}
            onClick={() => onAddVariant?.(record)}
          />
        </Tooltip>
      )}

      {showConfigurableSet && (
        <Tooltip title={referenceTitle}>
          <ActionButton
            size="small"
            type="text"
            icon={renderIcon(SkinOutlined, ICON_COLORS.reference)}
            onClick={() => onAddReference?.(record)}
          />
        </Tooltip>
      )}

      {showConfigurableSet && (
        <Tooltip title={inventoryTitle}>
          <ActionButton
            size="small"
            type="text"
            icon={renderIcon(PlusSquareOutlined, ICON_COLORS.inventory)}
            onClick={() => onAddInventoryItem?.(record)}
          />
        </Tooltip>
      )}

      <Tooltip title={detailsTitle}>
        <ActionButton
          size="small"
          type="text"
          icon={renderIcon(EyeOutlined, ICON_COLORS.detail)}
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
            <ActionButton
              size="small"
              type="text"
              icon={renderIcon(DeleteOutlined, ICON_COLORS.delete)}
            />
          </Tooltip>
        </Popconfirm>
      )}
    </Space>
  )
}

export default TableActions
