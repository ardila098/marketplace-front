import { PRODUCT_TYPES } from "../../../constants/productTypeConstants"
import DropdownSelect from "../../common/DropdownSelect"

const options = Object.values(PRODUCT_TYPES).map(type => ({
    label: type.label,
    value: type.value,
}))
    
const SelectProductType = props => {
    return (
        <DropdownSelect
            options={options}
            placeholder="Selecciona un tipo de producto"
            {...props}
        />
    )
}

export default SelectProductType