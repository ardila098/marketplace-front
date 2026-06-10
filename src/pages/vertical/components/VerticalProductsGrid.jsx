import { Spin } from 'antd'
import ProductCatalogCard from '../../../components/catalog/ProductCatalogCard/ProductCatalogCard'
import { ProductGrid } from '../../vertical/styles/styleVerticalPage'

const VerticalProductsGrid = ({ products = [], loadingProducts }) => {
  return (
    <Spin spinning={loadingProducts}>
      <ProductGrid>
        {products.map(product => (
          <ProductCatalogCard product={product} />
        ))}
      </ProductGrid>
    </Spin>
  )
}

export default VerticalProductsGrid
