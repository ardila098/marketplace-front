export const STORE_BUSINESS_TYPES = Object.freeze({
  RETAIL: {
    value: 'retail',
    label: 'Tienda ecommerce',
  },
  VEHICLE_AGENCY: {
    value: 'vehicle_agency',
    label: 'Agencia de vehiculos',
  },
  REAL_ESTATE_AGENCY: {
    value: 'real_estate_agency',
    label: 'Agencia inmobiliaria',
  },
})

export const STORE_BUSINESS_TYPE_OPTIONS = Object.freeze(
  Object.values(STORE_BUSINESS_TYPES).map(type => ({
    label: type.label,
    value: type.value,
  }))
)

export const AGENCY_BUSINESS_TYPES = Object.freeze([
  STORE_BUSINESS_TYPES.VEHICLE_AGENCY.value,
  STORE_BUSINESS_TYPES.REAL_ESTATE_AGENCY.value,
])

export const isAgencyBusiness = businessType => AGENCY_BUSINESS_TYPES.includes(businessType)

