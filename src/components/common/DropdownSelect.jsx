import { Select } from 'antd'

const DropdownSelect = ({
  options = [],
  placeholder = 'Selecciona una opción',
  allowClear = true,
  showSearch = true,
  mode,
  optionFilterProp = 'label',
  ...props
}) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      allowClear={allowClear}
      showSearch={showSearch}
      mode={mode}
      optionFilterProp={optionFilterProp}
      {...props}
    />
  )
}

export default DropdownSelect