import { useCallback, useState } from 'react'
import { LANDING_SECTION_VARIANTS } from '../../../constants/landingSections'


const createKey = () => crypto.randomUUID()

const useLandingBuilder = (initialSections = []) => {
  const [sections, setSections] = useState(initialSections)

  const addSection = useCallback(typeValue => {
    const variants = Object.values(LANDING_SECTION_VARIANTS[typeValue] || {})
    const defaultVariant = variants[0]?.value

    setSections(current => [
      ...current,
      {
        key: createKey(),
        type: typeValue,
        variant: defaultVariant,
        order: current.length,
        enabled: true,
        data: {},
      },
    ])
  }, [])

  const updateSection = useCallback((key, patch) => {
    setSections(current =>
      current.map(section => (section.key === key ? { ...section, ...patch } : section)),
    )
  }, [])

  const updateSectionData = useCallback((key, dataPatch) => {
    setSections(current =>
      current.map(section =>
        section.key === key ? { ...section, data: { ...section.data, ...dataPatch } } : section,
      ),
    )
  }, [])

  const removeSection = useCallback(key => {
    setSections(current =>
      current.filter(section => section.key !== key).map((section, order) => ({ ...section, order })),
    )
  }, [])

  const moveSection = useCallback((index, direction) => {
    setSections(current => {
      const target = index + direction

      if (target < 0 || target >= current.length) return current

      const next = [...current]

      ;[next[index], next[target]] = [next[target], next[index]]

      return next.map((section, order) => ({ ...section, order }))
    })
  }, [])

  return {
    sections,
    setSections,
    addSection,
    updateSection,
    updateSectionData,
    removeSection,
    moveSection,
  }
}

export default useLandingBuilder
