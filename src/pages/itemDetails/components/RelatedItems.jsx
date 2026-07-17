import PropTypes from 'prop-types'
import ContainerItemsSlider from '../../../components/sliders/itemsSlider/components/ContainerItemsSlider'

const RelatedItems = ({ data, storeSlug }) => {



  return (
    <>
      <ContainerItemsSlider data={data} storeSlug={storeSlug} />
    </>
  )
}

export default RelatedItems

RelatedItems.propTypes = {
  data: PropTypes.array,
  storeSlug: PropTypes.string,
}
