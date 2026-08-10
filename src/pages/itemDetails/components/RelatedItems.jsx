import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import ContainerItemsSlider from '../../../components/sliders/itemsSlider/components/ContainerItemsSlider'
import { buildRoute, ROUTES } from '../../../constants/routes'
import { useDictionaryTranslation } from '../../../hooks/useDictionaryTranslation'

const getProductKeys = product => {
  return [product?._id, product?.id, product?.slug, product?.productId]
    .filter(Boolean)
    .map(String)
}

const RelatedItems = ({ data = [], storeSlug, currentProduct, verticalId }) => {
  const { translate } = useDictionaryTranslation()
  const { verticalId: routeVerticalId } = useParams()
  const activeVerticalId = verticalId || routeVerticalId
  const currentProductKeys = useMemo(() => new Set(getProductKeys(currentProduct)), [currentProduct])
  const relatedItems = useMemo(() => {
    return data.filter(item => {
      const itemKeys = getProductKeys(item)
      return !itemKeys.some(key => currentProductKeys.has(key))
    })
  }, [currentProductKeys, data])

  const getProductPath = item => {
    if (!activeVerticalId || storeSlug || !item?._id) return undefined

    return buildRoute(ROUTES.VERTICAL_SCOPED_PRODUCT_DETAIL, {
      verticalId: activeVerticalId,
      id: item._id,
    })
  }

  return (
    <>
      <ContainerItemsSlider
        data={relatedItems}
        title={translate('product.relatedTitle')}
        storeSlug={storeSlug}
        getProductPath={getProductPath}
      />
    </>
  )
}

export default RelatedItems

RelatedItems.propTypes = {
  data: PropTypes.array,
  storeSlug: PropTypes.string,
  currentProduct: PropTypes.object,
  verticalId: PropTypes.string,
}
