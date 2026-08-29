import PropTypes from 'prop-types'
import CardCarouselITem from './CardCarouselITem'

const ContainerItemsSlider = ({ cardStyle = 'classic', data, getProductPath, storeSlug, title }) => {
  return (
    <>
      <CardCarouselITem
        title={title}
        items={data}
        storeSlug={storeSlug}
        getProductPath={getProductPath}
        cardStyle={cardStyle}
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
  cardStyle: PropTypes.string,
}
