import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeConfig from './theme'
import { Provider } from 'react-redux'
import { store } from './store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeConfig>
        <App />
      </ThemeConfig>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
