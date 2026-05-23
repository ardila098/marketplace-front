import { Space } from 'antd'
import useItemsTableActions from '../../../../hooks/useItemsTableActions'
import { useSellerProducts } from './hooks/useSellerProducts'
import { useSellerProductModals } from './hooks/useSellerProductModals'
import SellerProductModals from './modals/SellerProductModals'
import ModalEditSellerProduct from './modals/ModalEditSellerProduct'
import ProductsTable from '../../../../components/products/productsTable/ProductsTable'

const SellerProductsPage = () => {
    const { tableData, saveProduct, getProducts, getProduct, addVariant, addPiece, addInventoryItem, saving, addReference } = useSellerProducts()
    const { handleCreate, handleEdit, dataItem, handleClose, } = useItemsTableActions({ onGetItem: getProduct, })
    const productModals = useSellerProductModals({ addVariant, addPiece, addInventoryItem, addReference })


    return (
        <Space direction="vertical" size="large" style={{ width: '100%' }}>

            <ProductsTable getProducts={getProducts} handleCreate={handleCreate} handleEdit={handleEdit} tableData={tableData} productModals={productModals} />

            <ModalEditSellerProduct
                open={dataItem.open}
                loading={saving || dataItem.loading}
                onCancel={handleClose}
                onSubmit={saveProduct}
                data={dataItem.data}
            />

            <SellerProductModals
                saving={saving}
                modals={productModals}
            />
        </Space>
    )
}

export default SellerProductsPage