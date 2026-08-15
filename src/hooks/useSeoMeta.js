import { useEffect } from 'react'

import { env } from '../config/env'

const DEFAULT_TITLE = env.appName || 'Cooqys'
const DEFAULT_DESCRIPTION = 'Marketplace multi-vertical para comprar productos seleccionados.'
const JSON_LD_ID = 'page-json-ld'

const normalizeText = value => String(value || '').trim()

const getCurrentUrl = () => {
  if (typeof window === 'undefined') return ''

  return `${window.location.origin}${window.location.pathname}`
}

const toAbsoluteUrl = value => {
  const url = normalizeText(value)

  if (!url) return ''
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url
  if (typeof window === 'undefined') return url

  return url.startsWith('/')
    ? `${window.location.origin}${url}`
    : url
}

const setMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  const value = normalizeText(content)

  if (!value) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }

  element.setAttribute('content', value)
}

const setCanonical = href => {
  let element = document.head.querySelector('link[rel="canonical"]')
  const value = normalizeText(href)

  if (!value) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', value)
}

const setJsonLd = content => {
  let element = document.getElementById(JSON_LD_ID)

  if (!content) {
    element?.remove()
    return
  }

  if (!element) {
    element = document.createElement('script')
    element.id = JSON_LD_ID
    element.type = 'application/ld+json'
    document.head.appendChild(element)
  }

  element.textContent = content
}

export const useSeoMeta = ({
  title,
  description,
  keywords,
  image,
  canonical,
  type = 'website',
  siteName,
  verification,
  jsonLd,
} = {}) => {
  const keywordsText = Array.isArray(keywords)
    ? keywords.filter(Boolean).join(', ')
    : normalizeText(keywords)
  const imageUrl = toAbsoluteUrl(image)
  const canonicalUrl = toAbsoluteUrl(canonical) || getCurrentUrl()
  const pageTitle = normalizeText(title) || DEFAULT_TITLE
  const pageDescription = normalizeText(description) || DEFAULT_DESCRIPTION
  const jsonLdText = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    document.title = pageTitle

    setMeta('name', 'description', pageDescription)
    setMeta('name', 'keywords', keywordsText)
    setMeta('name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary')
    setMeta('name', 'twitter:title', pageTitle)
    setMeta('name', 'twitter:description', pageDescription)
    setMeta('name', 'twitter:image', imageUrl)
    setMeta('name', 'google-site-verification', verification)

    setMeta('property', 'og:type', type)
    setMeta('property', 'og:title', pageTitle)
    setMeta('property', 'og:description', pageDescription)
    setMeta('property', 'og:image', imageUrl)
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('property', 'og:site_name', siteName || DEFAULT_TITLE)

    setCanonical(canonicalUrl)
    setJsonLd(jsonLdText)
  }, [
    canonicalUrl,
    imageUrl,
    jsonLdText,
    keywordsText,
    pageDescription,
    pageTitle,
    siteName,
    type,
    verification,
  ])
}
