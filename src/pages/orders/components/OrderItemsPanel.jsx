import { Empty } from 'antd'

import { getUploadUrl, UPLOAD_ROUTES } from '../../../constants/uploadRoutes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'
import { currency } from '../../../utils/formatters'
import { getItemDescription, getItemName } from '../orderViewUtils'
import {
  Panel,
  PanelTitle,
  ProductImage,
  ProductInfo,
  ProductItem,
  ProductList,
  ProductMeta,
  ProductName,
  ProductPrice,
} from '../style'

const OrderItemsPanel = ({ title, items = [] }) => {
  const { translate } = useDictionaryTranslation()

  return (
    <Panel>
      <PanelTitle>{title}</PanelTitle>

      {items.length ? (
        <ProductList>
          {items.map(item => {
            const imageUrl = getUploadUrl(UPLOAD_ROUTES.products.images, item.imageSnapshot)
            const description = getItemDescription(item)

            return (
              <ProductItem key={item._id}>
                <ProductImage
                  src={imageUrl || undefined}
                  preview={false}
                  fallback=""
                />

                <ProductInfo>
                  <ProductName>
                    {getItemName(item, translate('orders.detail.productFallback'))}
                  </ProductName>

                  {item.storeName && (
                    <ProductMeta>
                      {translate('orders.detail.store')}: {item.storeName}
                    </ProductMeta>
                  )}

                  {description && <ProductMeta>{description}</ProductMeta>}

                  <ProductMeta>
                    {translate('quantity')}: {item.quantity}
                  </ProductMeta>

                  {(item.selectedItems || []).map(selectedItem => (
                    <ProductMeta key={`${item._id}-${selectedItem.partId}`}>
                      {selectedItem.partNameSnapshot}: {selectedItem.optionLabelSnapshot}
                    </ProductMeta>
                  ))}

                  <ProductPrice>{currency(item.subtotal || 0)}</ProductPrice>
                </ProductInfo>
              </ProductItem>
            )
          })}
        </ProductList>
      ) : (
        <Empty description={translate('orders.detail.noProducts')} />
      )}
    </Panel>
  )
}

export default OrderItemsPanel
