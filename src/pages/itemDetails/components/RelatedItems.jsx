import PropTypes from 'prop-types'
import ContainerItemsSlider from '../../../components/sliders/itemsSlider/components/ContainerItemsSlider'

const RelatedItems = ({ data }) => {



  return (
    <>
      <ContainerItemsSlider data={data} />
    </>
  )
}

export default RelatedItems

RelatedItems.propTypes = {
  data: PropTypes.array,
}
