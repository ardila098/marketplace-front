import { useEffect } from 'react'
import { getFontLoaderUrl, themeToCssVariables } from '../theme'
import { LandingRoot } from './LandingStyles'
import {
  SectionCta,
  SectionContent,
  SectionFaq,
  SectionFeatures,
  SectionFooter,
  SectionGallery,
  SectionGuarantee,
  SectionHeader,
  SectionHero,
  SectionVideo,
  SectionTestimonials,
} from './sections/LandingSections'
import SectionConversion from './sections/SectionConversion'

const SECTION_RENDERERS = {
  header: SectionHeader,
  hero: SectionHero,
  content: SectionContent,
  video: SectionVideo,
  features: SectionFeatures,
  gallery: SectionGallery,
  testimonials: SectionTestimonials,
  faq: SectionFaq,
  guarantee: SectionGuarantee,
  cta: SectionCta,
  conversion: SectionConversion,
  footer: SectionFooter,
}

const LandingRenderer = ({
  landing,
  isPreview = false,
  onSubmitLead,
  className,
  style,
}) => {
  const sections = Array.isArray(landing?.sections) ? landing.sections : []

  useEffect(() => {
    if (!landing?.metaTitle && !landing?.name) return
    const previous = document.title
    document.title = landing.metaTitle || `${landing.name}`
    return () => {
      document.title = previous
    }
  }, [landing?.metaTitle, landing?.name])

  useEffect(() => {
    const fontUrl = getFontLoaderUrl(landing?.theme?.fontFamily)
    if (!fontUrl) return undefined

    const existing = document.querySelector(`link[data-landing-font="${fontUrl}"]`)
    if (existing) return undefined

    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = fontUrl
    link.dataset.landingFont = fontUrl
    document.head.appendChild(link)

    return () => {
      link.remove()
    }
  }, [landing?.theme?.fontFamily])

  if (!landing || (!sections.length && !isPreview)) {
    return null
  }

  return (
    <LandingRoot
      className={className}
      style={{
        ...themeToCssVariables(landing?.theme),
        ...style,
      }}
    >
      {sections.filter(section => section?.enabled !== false).map((section, index) => {
        const Component = SECTION_RENDERERS[section?.type]
        if (!Component) return null

        const content = (
          <Component
            key={section.id || `${section.type}-${index}`}
            landing={landing}
            section={section}
            isPreview={isPreview}
            onSubmit={onSubmitLead}
          />
        )

        return section.type === 'conversion' ? (
          <div id="conversion" key={section.id || `conversion-${index}`}>
            {content}
          </div>
        ) : content
      })}
    </LandingRoot>
  )
}

export default LandingRenderer
