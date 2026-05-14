import { lazy, Suspense } from 'react'
import { Spin } from 'antd'

export const createLazyPage = importer => {
  const Component = lazy(importer)

  const LazyPage = props => {
    return (
      <Suspense fallback={<Spin fullscreen />}>
        <Component {...props} />
      </Suspense>
    )
  }

  return LazyPage
}