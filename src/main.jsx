import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './app/App'
import { store } from './store/store'
import 'antd/dist/reset.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
