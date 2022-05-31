import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import ThemeConfig from './theme'

ReactDOM.render(
  <BrowserRouter>
    <ThemeConfig>
      <App />
    </ThemeConfig>
  </BrowserRouter>,
  document.getElementById('root')
)
