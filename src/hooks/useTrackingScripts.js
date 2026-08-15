import { useEffect } from 'react'

const normalizeId = value => String(value || '').trim()

const addScript = (id, src) => {
  if (!src || document.getElementById(id)) return

  const script = document.createElement('script')
  script.id = id
  script.async = true
  script.src = src
  document.head.appendChild(script)
}

export const useStorefrontTracking = tracking => {
  const googleAnalyticsId = normalizeId(tracking?.googleAnalyticsId)
  const googleTagManagerId = normalizeId(tracking?.googleTagManagerId)

  useEffect(() => {
    if (!googleAnalyticsId) return

    addScript(
      `ga-${googleAnalyticsId}`,
      `https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`
    )

    window.dataLayer = window.dataLayer || []
    window.gtag = window.gtag || function gtag() {
      window.dataLayer.push(arguments)
    }
    window.gtag('js', new Date())
    window.gtag('config', googleAnalyticsId)
  }, [googleAnalyticsId])

  useEffect(() => {
    if (!googleTagManagerId) return

    addScript(
      `gtm-${googleTagManagerId}`,
      `https://www.googletagmanager.com/gtm.js?id=${googleTagManagerId}`
    )
  }, [googleTagManagerId])
}
