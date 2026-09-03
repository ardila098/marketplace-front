import { Empty, Spin } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import LandingRenderer from '../../landings/render/LandingRenderer'
import { landingPageService } from '../../services/landingPageService'

const LandingPublicPage = ({ host, initialLanding = null }) => {
  const { slug } = useParams()
  const [landing, setLanding] = useState(initialLanding)
  const [loading, setLoading] = useState(!initialLanding)

  const loadLanding = useCallback(async () => {
    if (initialLanding) {
      setLanding(initialLanding)
      setLoading(false)
      return
    }

    if (!slug && !host) {
      setLanding(null)
      setLoading(false)
      return
    }

    setLoading(true)

    try {
      const response = host
        ? await landingPageService.resolvePublic({ host })
        : await landingPageService.getPublicBySlug(slug)
      setLanding(response.data)
    } finally {
      setLoading(false)
    }
  }, [host, initialLanding, slug])

  useEffect(() => {
    loadLanding()
  }, [loadLanding])

  const submitLead = async payload => {
    if (!landing?.slug) return
    await landingPageService.createLead(landing.slug, payload)
  }

  if (loading) {
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <Spin size="large" />
      </div>
    )
  }

  if (!landing) {
    return (
      <div style={{ minHeight: '60vh', display: 'grid', placeItems: 'center' }}>
        <Empty description="Landing no disponible" />
      </div>
    )
  }

  return <LandingRenderer landing={landing} onSubmitLead={submitLead} />
}

export default LandingPublicPage
