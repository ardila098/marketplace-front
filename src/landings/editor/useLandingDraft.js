import { useCallback, useEffect, useMemo, useState } from 'react'
import { makeSection } from '../registry'
import { setByPath } from './utils'

const useLandingDraft = initialLanding => {
  const [landing, setLanding] = useState(initialLanding)
  const [selectedSectionId, setSelectedSectionId] = useState(
    initialLanding?.sections?.find(section => section.enabled !== false)?.id || null
  )

  const selectedSection = useMemo(
    () => (landing?.sections || []).find(section => section.id === selectedSectionId) || null,
    [landing?.sections, selectedSectionId]
  )

  useEffect(() => {
    if (!initialLanding) return

    setLanding(initialLanding)
    setSelectedSectionId(
      initialLanding?.sections?.find(section => section.enabled !== false)?.id || null
    )
  }, [initialLanding])

  const replaceLanding = useCallback(nextLanding => {
    setLanding(nextLanding)
  }, [])

  const updateRoot = useCallback((path, value) => {
    setLanding(current => (current ? setByPath(current, path, value) : current))
  }, [])

  const updateSection = useCallback((sectionId, nextSection) => {
    setLanding(current => ({
      ...current,
      sections: (current?.sections || []).map(section =>
        section.id === sectionId ? nextSection : section
      ),
    }))
  }, [])

  const addSection = useCallback(type => {
    const section = makeSection(type)
    setLanding(current => ({
      ...current,
      sections: [...(current?.sections || []), section],
    }))
    setSelectedSectionId(section.id)
    return section
  }, [])

  const moveSection = useCallback((sectionId, direction) => {
    setLanding(current => {
      const sections = [...(current?.sections || [])]
      const index = sections.findIndex(section => section.id === sectionId)
      const target = index + direction
      if (index < 0 || target < 0 || target >= sections.length) return current

      const [section] = sections.splice(index, 1)
      sections.splice(target, 0, section)
      return { ...current, sections }
    })
  }, [])

  const deleteSection = useCallback(sectionId => {
    setLanding(current => ({
      ...current,
      sections: (current?.sections || []).filter(section => section.id !== sectionId),
    }))
    setSelectedSectionId(null)
  }, [])

  const toggleSection = useCallback(sectionId => {
    setLanding(current => ({
      ...current,
      sections: (current?.sections || []).map(section =>
        section.id === sectionId
          ? { ...section, enabled: section.enabled === false }
          : section
      ),
    }))
  }, [])

  return {
    landing,
    setLanding: replaceLanding,
    selectedSectionId,
    setSelectedSectionId,
    selectedSection,
    updateRoot,
    updateSection,
    addSection,
    moveSection,
    deleteSection,
    toggleSection,
  }
}

export default useLandingDraft
