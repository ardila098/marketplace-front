export const PRODUCT_TYPES = Object.freeze({
    // SIMPLE: { value: 1, label: 'Simple' },
    VARIANT: { value: 2, label: 'Con variantes' },
    CONFIGURABLE_SET: { value: 3, label: 'Set configurable' },
})
export const PRODUCT_TYPE_VALUES = Object.freeze(Object.values(PRODUCT_TYPES).map(x => x.value))
