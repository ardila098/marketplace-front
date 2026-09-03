import { Collapse } from 'antd'
import { UPLOAD_ROUTES, getUploadUrl } from '../../../constants/uploadRoutes'
import {
  LpButton,
  LpCard,
  LpContainer,
  LpEyebrow,
  LpFooter,
  LpImage,
  LpMediaFrame,
  LpSection,
  LpSectionHead,
  LpSubtitle,
  LpTitle,
} from '../LandingStyles'

const imageUrl = (fileName, route = UPLOAD_ROUTES.landings.images) =>
  getUploadUrl(route, fileName)

const whatsappLink = value => {
  if (!value) return ''
  return `https://wa.me/${String(value).replace(/\D/g, '')}`
}

const heading = (section, center = true) => {
  const { eyebrow, title, subtitle } = section?.data || {}
  if (!title && !subtitle && !eyebrow) return null
  const titleStyle = {}
  const subtitleStyle = {}
  const eyebrowStyle = {}

  if (Number(section?.data?.titleFontSize) > 0) {
    titleStyle.fontSize = `${section.data.titleFontSize}px`
  }
  if (section?.data?.titleColor) titleStyle.color = section.data.titleColor
  if (Number(section?.data?.subtitleFontSize) > 0) {
    subtitleStyle.fontSize = `${section.data.subtitleFontSize}px`
  }
  if (section?.data?.subtitleColor) subtitleStyle.color = section.data.subtitleColor
  if (Number(section?.data?.eyebrowFontSize) > 0) {
    eyebrowStyle.fontSize = `${section.data.eyebrowFontSize}px`
  }
  if (section?.data?.eyebrowColor) eyebrowStyle.color = section.data.eyebrowColor

  return (
    <LpSectionHead $center={center}>
      {eyebrow ? <LpEyebrow style={eyebrowStyle}>{eyebrow}</LpEyebrow> : null}
      {title ? <LpTitle style={titleStyle}>{title}</LpTitle> : null}
      {subtitle ? <LpSubtitle $center={center} style={subtitleStyle}>{subtitle}</LpSubtitle> : null}
    </LpSectionHead>
  )
}

export const SectionHeader = ({ landing, section }) => {
  const data = section?.data || {}
  const brand = landing?.brand || {}
  const logo = imageUrl(data.logo || brand.logo, UPLOAD_ROUTES.landings.logos)
  const brandName = data.logoText || brand.name || landing?.name || ''
  const minimal = section?.settings?.variant === 'minimal'
  const links = Array.isArray(data.menuLinks) ? data.menuLinks.filter(item => item.label && item.href) : []
  const whatsapp = whatsappLink(data.whatsapp || brand.whatsapp)

  return (
    <header
      style={{
        position: section?.settings?.sticky ? 'sticky' : 'relative',
        top: 0,
        zIndex: 50,
        borderBottom: '1px solid color-mix(in srgb, var(--lp-text) 8%, transparent)',
        background: 'color-mix(in srgb, var(--lp-bg) 86%, transparent)',
        backdropFilter: 'blur(14px)',
      }}
    >
      <LpContainer
        style={{
          minHeight: minimal ? 58 : 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
        }}
      >
        <a href="#inicio" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
          {logo ? (
            <img src={logo} alt={brandName} style={{ maxHeight: 40, maxWidth: 150, objectFit: 'contain' }} />
          ) : (
            <strong style={{ fontSize: '1.15rem', whiteSpace: 'nowrap' }}>{brandName || 'Tu marca'}</strong>
          )}
        </a>

        {!minimal && links.length > 0 && (
          <nav style={{ display: 'flex', gap: 22, flexWrap: 'wrap', color: 'var(--lp-muted)', fontSize: '0.95rem' }}>
            {links.map((link, index) => (
              <a key={`${link.label}-${index}`} href={link.href} style={{ fontWeight: 700 }}>
                {link.label}
              </a>
            ))}
          </nav>
        )}

        <div style={{ display: 'inline-flex', gap: 10 }}>
          {whatsapp ? (
            <a
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', fontWeight: 800, color: 'var(--lp-text)' }}
            >
              WhatsApp
            </a>
          ) : null}
          {data.showCta && data.ctaLabel ? (
            <LpButton href="#conversion" style={{ minHeight: 40, padding: '0 18px' }}>
              {data.ctaLabel}
            </LpButton>
          ) : null}
        </div>
      </LpContainer>
    </header>
  )
}

export const SectionHero = ({ landing: _landing, section }) => {
  const data = section?.data || {}
  const variant = section?.settings?.variant || 'split'
  const align = section?.settings?.align || 'left'
  const src = imageUrl(data.image)
  const centered = variant === 'centered' || align === 'center'
  const titleStyle = {}
  const eyebrowStyle = {}
  const subtitleStyle = {}

  if (Number(data.titleFontSize) > 0) titleStyle.fontSize = `${data.titleFontSize}px`
  if (data.titleColor) titleStyle.color = data.titleColor
  if (Number(data.eyebrowFontSize) > 0) eyebrowStyle.fontSize = `${data.eyebrowFontSize}px`
  if (data.eyebrowColor) eyebrowStyle.color = data.eyebrowColor
  if (Number(data.subtitleFontSize) > 0) subtitleStyle.fontSize = `${data.subtitleFontSize}px`
  if (data.subtitleColor) subtitleStyle.color = data.subtitleColor

  const content = (
    <div style={{ maxWidth: variant === 'centered' ? 760 : 620, textAlign: centered ? 'center' : 'left', minWidth: 0 }}>
      {data.eyebrow ? <LpEyebrow style={eyebrowStyle}>{data.eyebrow}</LpEyebrow> : null}
      <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 4.8rem)', marginTop: 12, ...titleStyle }}>
        {data.title || 'Título principal'}
      </h1>
      {data.subtitle ? (
        <p style={{ color: 'var(--lp-muted)', fontSize: '1.16rem', lineHeight: 1.7, margin: '20px auto 0', maxWidth: 620, ...subtitleStyle }}>
          {data.subtitle}
        </p>
      ) : null}
      {data.badge ? (
        <span
          style={{
            display: 'inline-block',
            marginTop: 18,
            padding: '7px 14px',
            borderRadius: 999,
            background: 'var(--lp-accent)',
            color: '#111',
            fontWeight: 800,
            fontSize: '0.85rem',
          }}
        >
          {data.badge}
        </span>
      ) : null}
      {(data.primaryLabel || data.secondaryLabel) && (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginTop: 28, justifyContent: centered ? 'center' : 'flex-start' }}>
          {data.primaryLabel ? (
            <LpButton href="#conversion">{data.primaryLabel}</LpButton>
          ) : null}
          {data.secondaryLabel ? (
            <LpButton href="#conversion" $variant="ghost">
              {data.secondaryLabel}
            </LpButton>
          ) : null}
        </div>
      )}
    </div>
  )

  if (variant === 'centered') {
    return (
      <LpSection id="inicio">
        <LpContainer style={{ display: 'grid', justifyItems: 'center', textAlign: 'center' }}>
          {content}
          {src ? <LpMediaFrame style={{ marginTop: 44, maxWidth: 920, width: '100%' }}><LpImage src={src} alt={data.imageAlt || data.title} /></LpMediaFrame> : null}
        </LpContainer>
      </LpSection>
    )
  }

  if (variant === 'fullImage') {
    return (
      <LpSection id="inicio" $flush style={{ position: 'relative', display: 'flex', alignItems: 'center', minHeight: 'min(760px, 92vh)' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: src ? `url(${src})` : `linear-gradient(135deg, var(--lp-primary) 0%, color-mix(in srgb, var(--lp-primary) 55%, var(--lp-accent)) 100%)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.25) 100%)' }} />
        <LpContainer style={{ position: 'relative', padding: 'clamp(60px, 12vw, 120px) 0', color: '#fff' }}>
          <div style={{ maxWidth: 680, color: '#fff' }}>
            {data.eyebrow ? (
              <span style={{ color: 'var(--lp-accent)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', ...eyebrowStyle }}>{data.eyebrow}</span>
            ) : null}
            <h1 style={{ color: '#fff', fontSize: 'clamp(2.5rem, 7vw, 4.8rem)', marginTop: 14, ...titleStyle }}>{data.title || 'Título principal'}</h1>
            {data.subtitle ? <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '1.15rem', marginTop: 18, ...subtitleStyle }}>{data.subtitle}</p> : null}
            <div style={{ marginTop: 28 }}>
              <LpButton href="#conversion" style={{ color: '#111', background: '#fff', borderColor: '#fff' }}>
                {data.primaryLabel || 'Comenzar'}
              </LpButton>
            </div>
          </div>
        </LpContainer>
      </LpSection>
    )
  }

  const hasMedia = Boolean(src)
  const gridColumns =
    variant === 'imageLeft'
      ? hasMedia
        ? 'minmax(0, 0.9fr) minmax(0, 1fr)'
        : '1fr'
      : hasMedia
        ? 'minmax(0, 1fr) minmax(0, 0.85fr)'
        : '1fr'

  return (
    <LpSection id="inicio">
      <LpContainer
        style={{
          display: 'grid',
          gridTemplateColumns: gridColumns,
          gap: 'clamp(28px, 6vw, 80px)',
          alignItems: 'center',
        }}
      >
        {variant === 'imageLeft' && src ? (
          <LpMediaFrame style={{ order: 1 }} $ratio="4 / 5"><LpImage src={src} alt={data.imageAlt || data.title} /></LpMediaFrame>
        ) : null}
        {content}
        {variant !== 'imageLeft' && src ? (
          <LpMediaFrame $ratio="4 / 5"><LpImage src={src} alt={data.imageAlt || data.title} /></LpMediaFrame>
        ) : null}
      </LpContainer>
    </LpSection>
  )
}

export const SectionContent = ({ section }) => {
  const data = section?.data || {}
  const variant = section?.settings?.variant || 'twoColumn'
  const src = imageUrl(data.image)

  if (variant === 'imageOnly') {
    return src ? (
      <LpSection>
        <LpContainer><LpMediaFrame $ratio="16 / 9"><LpImage src={src} alt={data.imageAlt || data.title} /></LpMediaFrame></LpContainer>
      </LpSection>
    ) : null
  }

  if (variant === 'textOnly') {
    return (
      <LpSection>
        <LpContainer style={{ maxWidth: 780 }}>
          {heading(section, false)}
          {data.body ? <p style={{ color: 'var(--lp-muted)', fontSize: '1.08rem', whiteSpace: 'pre-line' }}>{data.body}</p> : null}
          {data.primaryLabel ? <LpButton href={data.primaryHref || '#conversion'} style={{ marginTop: 22 }}>{data.primaryLabel}</LpButton> : null}
        </LpContainer>
      </LpSection>
    )
  }

  const left = section?.settings?.imageSide === 'left'
  const textColumn = (
    <div>
      {heading(section, false)}
      {data.body ? <p style={{ color: 'var(--lp-muted)', fontSize: '1.08rem', whiteSpace: 'pre-line' }}>{data.body}</p> : null}
      {data.primaryLabel ? <LpButton href={data.primaryHref || '#conversion'} style={{ marginTop: 22 }}>{data.primaryLabel}</LpButton> : null}
    </div>
  )
  const mediaColumn = src ? <LpMediaFrame><LpImage src={src} alt={data.imageAlt || data.title} /></LpMediaFrame> : null

  return (
    <LpSection>
      <LpContainer style={{ display: 'grid', gridTemplateColumns: mediaColumn ? 'minmax(0, 1fr) minmax(0, 1fr)' : '1fr', gap: 'clamp(28px, 6vw, 72px)', alignItems: 'center' }}>
        {left ? mediaColumn : textColumn}
        {left ? textColumn : mediaColumn}
      </LpContainer>
    </LpSection>
  )
}

const videoEmbed = url => {
  const value = String(url || '').trim()
  if (!value) return null

  const youtubeMatch =
    value.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/) ||
    value.match(/^https:\/\/www\.youtube\.com\/embed\/([A-Za-z0-9_-]{6,})/)
  const vimeoMatch = value.match(/vimeo\.com\/(?:video\/)?(\d+)/)

  if (youtubeMatch?.[1]) {
    return {
      kind: 'youtube',
      id: youtubeMatch[1],
      embedUrl: `https://www.youtube.com/embed/${youtubeMatch[1]}`,
    }
  }

  if (vimeoMatch?.[1]) {
    return {
      kind: 'vimeo',
      id: vimeoMatch[1],
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
    }
  }

  if (/\.(mp4|webm|ogv)(\?|$)/i.test(value)) {
    return { kind: 'file', src: value }
  }

  return null
}

const buildEmbedQuery = (video, data) => {
  const params = new URLSearchParams()
  if (video.kind === 'youtube') {
    params.set('rel', '0')
    params.set('autoplay', data.autoplay ? '1' : '0')
    params.set('loop', data.loop ? '1' : '0')
    params.set('controls', data.showControls === false ? '0' : '1')
  } else if (video.kind === 'vimeo') {
    params.set('autoplay', data.autoplay ? '1' : '0')
    params.set('loop', data.loop ? '1' : '0')
    params.set('controls', data.showControls === false ? '0' : '1')
  }

  const query = params.toString()
  return query ? `?${query}` : ''
}

const VideoPlayer = ({ section, data }) => {
  const video = videoEmbed(data.videoUrl)
  const poster = imageUrl(data.poster)
  const sharedStyle = {
    width: '100%',
    aspectRatio: section?.settings?.aspectRatio || '16 / 9',
    border: 0,
    borderRadius: 18,
    background: '#0f172a',
    display: 'block',
    boxShadow: '0 24px 64px rgba(15, 23, 42, 0.16)',
  }

  if (!video) {
    return (
      <div
        style={{
          width: '100%',
          aspectRatio: section?.settings?.aspectRatio || '16 / 9',
          borderRadius: 18,
          display: 'grid',
          placeItems: 'center',
          background: 'color-mix(in srgb, var(--lp-primary) 9%, transparent)',
          color: 'var(--lp-muted)',
          textAlign: 'center',
          padding: 24,
        }}
      >
        {poster ? (
          <img src={poster} alt="Poster del video" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 18 }} />
        ) : (
          <div>
            <div style={{ fontSize: 44, marginBottom: 8 }}>🎬</div>
            Pega una URL de YouTube, Vimeo o un video .mp4
          </div>
        )}
      </div>
    )
  }

  if (video.kind === 'file') {
    return (
      <video
        src={video.src}
        poster={poster}
        autoPlay={data.autoplay}
        loop={data.loop}
        controls={data.showControls !== false}
        playsInline
        style={sharedStyle}
      />
    )
  }

  const iframeSrc = `${video.embedUrl}${buildEmbedQuery(video, data)}`

  return (
    <iframe
      src={iframeSrc}
      title="Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
      style={sharedStyle}
    />
  )
}

export const SectionVideo = ({ section }) => {
  const data = section?.data || {}
  const variant = section?.settings?.variant || 'contained'

  if (variant === 'fullWidth') {
    return (
      <LpSection>
        <LpContainer style={{ maxWidth: 1200, textAlign: 'center' }}>
          {heading(section)}
        </LpContainer>
        <div style={{ width: '100%' }}>
          <VideoPlayer section={section} data={data} />
        </div>
      </LpSection>
    )
  }

  if (variant === 'split') {
    return (
      <LpSection>
        <LpContainer style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)', gap: 'clamp(24px, 5vw, 64px)', alignItems: 'center' }}>
          <div>{heading(section, false)}</div>
          <VideoPlayer section={section} data={data} />
        </LpContainer>
      </LpSection>
    )
  }

  return (
    <LpSection>
      <LpContainer style={{ maxWidth: 920, textAlign: 'center' }}>
        {heading(section)}
        <VideoPlayer section={section} data={data} />
      </LpContainer>
    </LpSection>
  )
}

export const SectionFeatures = ({ section }) => {
  const data = section?.data || {}
  const items = data.items || []
  const variant = section?.settings?.variant || 'grid'
  const columns = Number(section?.settings?.columns) || 3
  const cardStyle = section?.settings?.cardStyle || 'bordered'

  return (
    <LpSection>
      <LpContainer>
        {heading(section)}
        <div
          style={{
            display: variant === 'grid' ? 'grid' : 'flex',
            flexDirection: variant === 'list' ? 'column' : undefined,
            gridTemplateColumns: `repeat(auto-fit, minmax(${Math.round(1020 / Math.min(columns, 4))}px, 1fr))`,
            gap: 18,
          }}
        >
          {items.filter(item => item.title || item.description || item.image).map((item, index) => (
            <LpCard key={`${item.title}-${index}`} $cardStyle={cardStyle} style={{ padding: 26 }}>
              {item.image ? (
                <LpMediaFrame style={{ marginBottom: 18 }}><LpImage src={imageUrl(item.image)} alt={item.title} /></LpMediaFrame>
              ) : item.icon ? (
                <div
                  style={{
                    width: 52,
                    height: 52,
                    marginBottom: 18,
                    display: 'grid',
                    placeItems: 'center',
                    borderRadius: 16,
                    background: 'color-mix(in srgb, var(--lp-primary) 10%, transparent)',
                    fontSize: 24,
                  }}
                >
                  {item.icon}
                </div>
              ) : null}
              {item.title ? <h3 style={{ fontSize: '1.18rem', marginBottom: 8 }}>{item.title}</h3> : null}
              {item.description ? <p style={{ color: 'var(--lp-muted)', fontSize: '0.96rem', margin: 0 }}>{item.description}</p> : null}
            </LpCard>
          ))}
        </div>
      </LpContainer>
    </LpSection>
  )
}

export const SectionGallery = ({ section }) => {
  const data = section?.data || {}
  const items = data.items || []
  const variant = section?.settings?.variant || 'grid'
  const cardStyle = section?.settings?.cardStyle || 'rounded'
  const columns = Number(section?.settings?.columns) || 3
  const backgroundType = data.backgroundType || 'none'
  const backgroundUrl = imageUrl(data.backgroundImage)
  const frameEnabled = data.frameEnabled === true
  const framePadding = Number(data.contentPadding) || 0
  const overlayColor = data.overlayColor || 'rgba(2, 6, 23, 0.55)'
  const frameColor = data.frameColor || 'rgba(15, 23, 42, 0.16)'
  const frameWidth = Number(data.frameWidth) || 1

  const visibleItems = items.filter(item => item.image || item.title)
  const body = visibleItems.length ? (
    variant === 'slider' ? (
      <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 8 }}>
        {visibleItems.map((item, index) => (
          <LpCard
            key={`${item.title}-${index}`}
            $cardStyle={cardStyle}
            style={{ minWidth: 'min(340px, 84vw)', scrollSnapAlign: 'start', padding: item.title || item.description ? 14 : 0 }}
          >
            <div style={{ aspectRatio: '4 / 5', overflow: 'hidden', borderRadius: cardStyle === 'bordered' ? 'var(--lp-radius)' : 12, position: 'relative' }}>
              {item.image ? (
                <LpImage src={imageUrl(item.image)} alt={item.title} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--lp-primary) 8%, transparent)', color: 'var(--lp-muted)' }}>
                  Sube una imagen
                </div>
              )}
            </div>
            {item.title ? <h3 style={{ fontSize: '1.02rem', margin: '12px 2px 4px' }}>{item.title}</h3> : null}
            {item.description ? <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem', margin: 0 }}>{item.description}</p> : null}
          </LpCard>
        ))}
      </div>
    ) : (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(${Math.round(1040 / Math.min(columns, 4))}px, 1fr))`, gap: 18 }}>
        {visibleItems.map((item, index) => (
          <LpCard key={`${item.title}-${index}`} $cardStyle={cardStyle} style={{ padding: item.title || item.description ? 12 : 0 }}>
            <div style={{ aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 10, position: 'relative' }}>
              {item.image ? (
                <LpImage src={imageUrl(item.image)} alt={item.title} />
              ) : (
                <div style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', background: 'color-mix(in srgb, var(--lp-primary) 8%, transparent)', color: 'var(--lp-muted)' }}>
                  Sube una imagen
                </div>
              )}
            </div>
            {item.title ? <h3 style={{ fontSize: '1rem', margin: '12px 4px 4px' }}>{item.title}</h3> : null}
            {item.description ? <p style={{ color: 'var(--lp-muted)', fontSize: '0.9rem', margin: '0 4px 4px' }}>{item.description}</p> : null}
          </LpCard>
        ))}
      </div>
    )
  ) : null

  const containerStyle = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: data.frameRadius ? `${Number(data.frameRadius)}px` : undefined,
    border: frameEnabled ? `${frameWidth}px solid ${frameColor}` : undefined,
    padding: frameEnabled || backgroundType !== 'none' ? framePadding : 0,
    background: backgroundType === 'color' ? data.backgroundColor || 'var(--lp-surface)' : undefined,
  }

  return (
    <LpSection>
      <LpContainer>
        <div style={containerStyle}>
          {backgroundType === 'image' && backgroundUrl ? (
            <>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${backgroundUrl})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
              <div style={{ position: 'absolute', inset: 0, background: overlayColor }} />
            </>
          ) : null}
          <div style={{ position: 'relative' }}>
            {heading(section)}
            {body}
          </div>
        </div>
      </LpContainer>
    </LpSection>
  )
}

export const SectionTestimonials = ({ section }) => {
  const data = section?.data || {}
  const items = (data.items || []).filter(item => item.quote || item.author)
  const variant = section?.settings?.variant || 'grid'
  const cardStyle = section?.settings?.cardStyle || 'rounded'

  if (!items.length) return null

  const card = (item, index) => (
    <LpCard key={`${item.author}-${index}`} $cardStyle={cardStyle} style={{ padding: 26, height: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <span aria-label={`${item.rating} de 5 estrellas`} style={{ color: '#f59e0b', letterSpacing: 3 }}>
        {'★'.repeat(Math.max(0, Math.min(Number(item.rating) || 0, 5)))}
      </span>
      <blockquote style={{ margin: 0, color: 'var(--lp-text)', fontSize: '1rem', lineHeight: 1.65, flex: 1 }}>
        “{item.quote}”
      </blockquote>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {item.avatar ? (
          <img src={imageUrl(item.avatar)} alt={item.author} style={{ width: 40, height: 40, borderRadius: 999, objectFit: 'cover' }} />
        ) : (
          <div style={{ width: 40, height: 40, borderRadius: 999, display: 'grid', placeItems: 'center', background: 'var(--lp-primary)', color: '#fff', fontWeight: 800 }}>
            {(item.author || '?').slice(0, 1)}
          </div>
        )}
        <div>
          <strong style={{ display: 'block', fontSize: '0.95rem' }}>{item.author}</strong>
          {item.role ? <span style={{ color: 'var(--lp-muted)', fontSize: '0.85rem' }}>{item.role}</span> : null}
        </div>
      </div>
    </LpCard>
  )

  return (
    <LpSection>
      <LpContainer>
        {heading(section)}
        {variant === 'slider' ? (
          <div style={{ display: 'flex', gap: 16, overflowX: 'auto', scrollSnapType: 'x mandatory', paddingBottom: 8 }}>
            {items.map((item, index) => (
              <div key={`${item.author}-${index}`} style={{ minWidth: 'min(360px, 84vw)', scrollSnapAlign: 'start' }}>
                {card(item, index)}
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 18 }}>
            {items.map((item, index) => card(item, index))}
          </div>
        )}
      </LpContainer>
    </LpSection>
  )
}

export const SectionFaq = ({ section }) => {
  const data = section?.data || {}
  const items = (data.items || []).filter(item => item.question)
  const variant = section?.settings?.variant || 'single'

  if (!items.length) return null

  const middle = Math.ceil(items.length / 2)
  const columns = variant === 'twoColumns' ? [items.slice(0, middle), items.slice(middle)] : [items]

  return (
    <LpSection>
      <LpContainer>
        {heading(section)}
        <div style={{ display: 'grid', gridTemplateColumns: columns.length > 1 ? 'repeat(2, minmax(0, 1fr))' : '1fr', gap: '0 22px', alignItems: 'start' }}>
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} style={{ display: 'grid', gap: 12 }}>
              {column.map((item, index) => (
                <LpCard key={`${item.question}-${index}`} $cardStyle="bordered" style={{ background: 'transparent' }}>
                  <Collapse
                    ghost
                    expandIconPosition="end"
                    items={[
                      {
                        key: String(index),
                        label: <strong>{item.question}</strong>,
                        children: <div style={{ color: 'var(--lp-muted)' }}>{item.answer}</div>,
                      },
                    ]}
                  />
                </LpCard>
              ))}
            </div>
          ))}
        </div>
      </LpContainer>
    </LpSection>
  )
}

export const SectionGuarantee = ({ landing: _landing, section }) => {
  const data = section?.data || {}
  const variant = section?.settings?.variant || 'compact'
  const src = imageUrl(data.image)

  return (
    <LpSection>
      <LpContainer>
        <LpCard
          $cardStyle="bordered"
          style={{
            display: 'grid',
            gridTemplateColumns: src && variant === 'full' ? 'minmax(0, 0.8fr) minmax(0, 1fr)' : '1fr',
            gap: 28,
            alignItems: 'center',
            padding: 'clamp(24px, 5vw, 52px)',
            background: 'color-mix(in srgb, var(--lp-primary) 4%, var(--lp-bg))',
          }}
        >
          {src && variant === 'full' ? <LpMediaFrame><LpImage src={src} alt={data.title} /></LpMediaFrame> : null}
          <div style={{ textAlign: src && variant === 'full' ? 'left' : 'center' }}>
            <div style={{ fontSize: 54, marginBottom: 10 }}>{data.icon || '🛡️'}</div>
            <h3 style={{ fontSize: '1.5rem' }}>{data.title}</h3>
            <p style={{ color: 'var(--lp-muted)', margin: '8px 0 0' }}>{data.description}</p>
            {data.badge ? (
              <span style={{ display: 'inline-block', marginTop: 16, padding: '8px 16px', borderRadius: 999, background: 'var(--lp-accent)', color: '#111', fontWeight: 800, fontSize: '0.85rem' }}>
                {data.badge}
              </span>
            ) : null}
          </div>
        </LpCard>
      </LpContainer>
    </LpSection>
  )
}

export const SectionCta = ({ section }) => {
  const data = section?.data || {}
  const variant = section?.settings?.variant || 'centered'
  const src = imageUrl(data.image)

  return (
    <LpSection>
      <LpContainer style={{ textAlign: 'center' }}>
        <LpCard
          $cardStyle={variant === 'banner' ? 'shadow' : 'plain'}
          style={{
            padding: 'clamp(36px, 8vw, 90px)',
            position: 'relative',
            overflow: 'hidden',
            background: variant === 'banner'
              ? src
                ? `url(${src}) center / cover no-repeat`
                : 'linear-gradient(135deg, var(--lp-primary), color-mix(in srgb, var(--lp-primary) 45%, var(--lp-accent)))'
              : 'color-mix(in srgb, var(--lp-primary) 5%, var(--lp-bg))',
          }}
        >
          {variant === 'banner' ? <div style={{ position: 'absolute', inset: 0, background: 'rgba(2, 6, 23, 0.65)' }} /> : null}
          <div style={{ position: 'relative' }}>
            {data.eyebrow ? <LpEyebrow style={{ color: variant === 'banner' ? 'var(--lp-accent)' : undefined }}>{data.eyebrow}</LpEyebrow> : null}
            <LpTitle as="h2" style={{ color: variant === 'banner' ? '#fff' : undefined, margin: '0 auto' }}>{data.title || '¿Listo para empezar?'}</LpTitle>
            {data.subtitle ? <LpSubtitle $center style={{ color: variant === 'banner' ? 'rgba(255,255,255,0.8)' : undefined }}>{data.subtitle}</LpSubtitle> : null}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginTop: 28 }}>
              <LpButton href="#conversion" style={variant === 'banner' ? { background: '#fff', color: '#111', borderColor: '#fff' } : undefined}>
                {data.primaryLabel || 'Comenzar'}
              </LpButton>
              {data.secondaryLabel ? <LpButton href="#conversion" $variant="ghost">{data.secondaryLabel}</LpButton> : null}
            </div>
          </div>
        </LpCard>
      </LpContainer>
    </LpSection>
  )
}

export const SectionFooter = ({ landing, section }) => {
  const data = section?.data || {}
  const brand = landing?.brand || {}
  const whatsapp = whatsappLink(data.showWhatsapp ? brand.whatsapp : '')
  const email = data.showEmail ? brand.email : ''
  const instagram = data.showInstagram ? brand.instagram : ''
  const logo = imageUrl(brand.logo, UPLOAD_ROUTES.landings.logos)

  return (
    <LpFooter>
      <LpContainer>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <div style={{ display: 'inline-flex', gap: 10, alignItems: 'center', minWidth: 0 }}>
            {data.showBrand && (logo ? (
              <img src={logo} alt={brand.name} style={{ maxHeight: 32, objectFit: 'contain' }} />
            ) : brand.name ? (
              <strong style={{ color: 'var(--lp-text)' }}>{brand.name}</strong>
            ) : null)}
            <span>{data.text || ''}</span>
          </div>
          <div style={{ display: 'inline-flex', gap: 16 }}>
            {whatsapp ? <a href={whatsapp} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>WhatsApp</a> : null}
            {email ? <a href={`mailto:${email}`} style={{ fontWeight: 700 }}>Email</a> : null}
            {instagram ? (
              <a href={instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram.replace('@', '')}`} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>
                Instagram
              </a>
            ) : null}
          </div>
        </div>
        <div style={{ marginTop: 22, fontSize: '0.82rem', opacity: 0.75 }}>
          © {new Date().getFullYear()} {brand.name || landing?.name || 'Landing'} · Creado con Cooqys
        </div>
      </LpContainer>
    </LpFooter>
  )
}

export default {
  SectionHeader,
  SectionHero,
  SectionContent,
  SectionVideo,
  SectionFeatures,
  SectionGallery,
  SectionTestimonials,
  SectionFaq,
  SectionGuarantee,
  SectionCta,
  SectionFooter,
}
