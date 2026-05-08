import { ConfigProvider } from 'antd'
import { useSelector } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { router } from '../routes/router'
import { GlobalStyles } from '../styles/GlobalStyles'
import { createAntdTheme } from '../styles/antdTheme'

const App = () => {
  const appTheme = useSelector(state => state.theme.appTheme)

  return (
    <ConfigProvider theme={createAntdTheme(appTheme)}>
      <GlobalStyles />
      <RouterProvider router={router} />
    </ConfigProvider>
  )
}

export default App
