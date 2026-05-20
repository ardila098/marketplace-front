import useCategorys from '../../../hooks/useCategorys'
import DropdownSelect from '../../common/DropdownSelect'

const SelectCategory = ({
  params,
  placeholder = 'Selecciona una categoría',
  ...props
}) => {
  const { categorys, loading } = useCategorys(params)

  const options = categorys.map(category => ({
    label: category.name,
    value: category._id || category.id,
  }))

  return (
    <DropdownSelect
      options={options}
      loading={loading}
      placeholder={placeholder}
      {...props}
    />
  )
}

export default SelectCategory