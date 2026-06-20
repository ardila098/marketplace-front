import PropTypes from 'prop-types'
import CardCarouselITem from './CardCarouselITem'

const ContainerItemsSlider = ({ data }) => {
  return (
    <>
      <CardCarouselITem items={data} />
    </>
  )
}

export default ContainerItemsSlider

ContainerItemsSlider.propTypes = {
  data: PropTypes.array,
}
