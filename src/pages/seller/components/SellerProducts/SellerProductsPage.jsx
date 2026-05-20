import AppTable from '../../../../components/common/AppTable'
import { useSellerProducts } from './hooks/useSellerProducts'
import TableActions from '../../../../components/common/TableActions/TableActions'
import useItemsTableActions from '../../../../hooks/useItemsTableActions'
import { Space } from 'antd'
import HeaderTable from '../../../../components/common/TableActions/HeaderTable'
import ModalEditSellerProduct from './components/ModalEditSellerProduct'

const SellerProductsPage = () => {

    const { tableData, saveProduct, getProducts, } = useSellerProducts()
    const { handleCreate, handleEdit, handleCreateExternal, dataItem, handleClose } = useItemsTableActions()

    const columns = [
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
            title: 'Acciones',
            key: 'actions',
            align: 'right',
            render: (_, record) => (
                <TableActions
                    record={record}
                    showVariant
                    onEdit={handleEdit}
                    onAddVariant={handleCreateExternal}
                    deleteTitle="Eliminar producto"
                    deleteDescription="¿Seguro que deseas eliminar este producto?"
                />
            ),
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
            <ModalEditSellerProduct open={dataItem.open} onCancel={handleClose} onSubmit={saveProduct} data={dataItem.data} />
        </Space>
    )
}

export default SellerProductsPage