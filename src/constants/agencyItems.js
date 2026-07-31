export const AGENCY_ITEM_KINDS = Object.freeze({
  VEHICLE: {
    value: 'vehicle',
    label: 'Vehiculo',
  },
  MOTORCYCLE: {
    value: 'motorcycle',
    label: 'Moto',
  },
  PROPERTY: {
    value: 'property',
    label: 'Inmueble',
  },
})

export const AGENCY_ITEM_KIND_OPTIONS = Object.freeze(
  Object.values(AGENCY_ITEM_KINDS).map(kind => ({
    label: kind.label,
    value: kind.value,
  }))
)

export const AGENCY_ITEM_STATUS = Object.freeze({
  DRAFT: {
    value: 'draft',
    label: 'Borrador',
  },
  PUBLISHED: {
    value: 'published',
    label: 'Publicado',
  },
  ARCHIVED: {
    value: 'archived',
    label: 'Archivado',
  },
})

export const AGENCY_ITEM_STATUS_OPTIONS = Object.freeze(
  Object.values(AGENCY_ITEM_STATUS).map(status => ({
    label: status.label,
    value: status.value,
  }))
)

export const getAgencyKindLabel = value => {
  return Object.values(AGENCY_ITEM_KINDS).find(kind => kind.value === value)?.label || value
}

export const getAgencyStatusLabel = value => {
  return Object.values(AGENCY_ITEM_STATUS).find(status => status.value === value)?.label || value
}

