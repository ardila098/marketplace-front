import { Image, Space } from 'antd'
import HeaderTable from '../../common/TableActions/HeaderTable'
import AppTable from '../../common/AppTable'
import TableActions from '../../common/TableActions/TableActions'
import { PRODUCT_TYPES } from '../../../constants/productTypeConstants'
import { useNavigate } from 'react-router-dom'
import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'

const getProductPreviewImage = product => {
    return (
        product?.images?.[0] ||
        product?.variants?.find(variant => variant.images?.length)?.images?.[0] ||
        product?.references?.find(reference => reference.images?.length)?.images?.[0] ||
        ''
    )
}

const ProductsTable = ({ handleEdit, productModals, tableData, handleCreate, getProducts }) => {
    const navigate = useNavigate()


    const columns = [
        {
            title: 'Imagen',
            key: 'image',
            width: 80,
            render: (_, record) => {
                const image = getProductPreviewImage(record)

                if (!image) return '-'

                return (
                    <Image
                        src={getUploadUrl(UPLOAD_ROUTES.products.images, image)}
                        width={48}
                        height={48}
                        preview={false}
                        style={{ borderRadius: 6, objectFit: 'cover' }}
                    />
                )
            },
        },
        {
            title: 'Producto',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Estado',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Tienda',
            dataIndex: ['store', 'name'],
            key: 'store',
        },
        {
            title: 'Vertical',
            dataIndex: ['vertical', 'name'],
            key: 'vertical',
            render: (_, record) => record.vertical?.name || '-',
        },

        {
            title: 'Tipo',
            key: 'productType',
            render: (_, record) => Object.values(PRODUCT_TYPES).find((item) => item.value === record.productType).label
        },

        {
            title: 'Acciones',
            key: 'actions',
            align: 'right',
            render: (_, record) => {
                return (
                    <TableActions
                        record={record}
                        showVariant={record.productType === PRODUCT_TYPES.VARIANT.value}
                        showConfigurableSet={record.productType === PRODUCT_TYPES.CONFIGURABLE_SET.value}
                        onEdit={() => handleEdit(record._id)}
                        onAddVariant={() => productModals.openVariantModal(record)}
                        onManageParts={() => productModals.openPartsModal(record)}
                        onAddInventoryItem={() => productModals.openInventoryModal(record)}
                        onAddReference={() => productModals.openReferenceModal(record)}
                        onManage={() => navigate(`/seller/products/${record._id}/manage`)}
                        deleteTitle="Eliminar producto"
                        deleteDescription="¿Seguro que deseas eliminar este producto?"
                    />
                )
            },
        },
    ]

    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <HeaderTable />

            <AppTable
                columns={columns}
                tableData={tableData}
                searchPlaceholder="Buscar producto"
                handleCreate={handleCreate}
                onChange={getProducts}
            />


        </Space>
    )
}

export default ProductsTable
