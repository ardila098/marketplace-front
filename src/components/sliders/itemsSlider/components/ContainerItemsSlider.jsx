import PropTypes from 'prop-types'
import CardCarouselITem from './CardCarouselITem'

const ContainerItemsSlider = ({ data, storeSlug }) => {
  return (
    <>
      <CardCarouselITem items={data} storeSlug={storeSlug} />
    </>
  )
}

export default ContainerItemsSlider

ContainerItemsSlider.propTypes = {
  data: PropTypes.array,
  storeSlug: PropTypes.string,
}
