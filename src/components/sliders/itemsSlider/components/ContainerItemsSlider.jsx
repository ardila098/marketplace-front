import PropTypes from 'prop-types'
import CardCarouselITem from './CardCarouselITem'

const ContainerItemsSlider = ({ data, storeSlug, title, getProductPath }) => {
  return (
    <>
      <CardCarouselITem
        title={title}
        items={data}
        storeSlug={storeSlug}
        getProductPath={getProductPath}
      />
    </>
  )
}

export default ContainerItemsSlider

ContainerItemsSlider.propTypes = {
  data: PropTypes.array,
  storeSlug: PropTypes.string,
  title: PropTypes.string,
  getProductPath: PropTypes.func,
}
