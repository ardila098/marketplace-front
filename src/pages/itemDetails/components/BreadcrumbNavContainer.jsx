import { Link } from 'react-router-dom'
import { BreadcrumbNav } from '../styles/styleItemDetails'
import PropTypes from 'prop-types'

const BreadcrumbNavContainer = ({ dataItem }) => {
  return (
    <>
      <BreadcrumbNav>
        <Link to="/">Inicio</Link>
        <span className="separator">/</span>
        {dataItem.vertical && (
          <>
            <Link to={`/vertical/${dataItem.vertical?._id}`}>{dataItem?.vertical?.name}</Link>
            <span className="separator">/</span>
          </>
        )}
        {dataItem.category && (
          <>
            <span className="current">{dataItem.category.name}</span>
            <span className="separator">/</span>
          </>
        )}
        <span className="current">{dataItem.name}</span>
      </BreadcrumbNav>
    </>
  )
}

export default BreadcrumbNavContainer

BreadcrumbNavContainer.propTypes = {
  dataItem: PropTypes.object,
}
