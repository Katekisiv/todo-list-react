import { hot } from 'react-hot-loader'
import './normalize.css'
import './App.css'
// import LoginPage from "./pages/LoginPage/LoginPage";
import React from 'react'
import { TodoPage } from './pages/TodoPage'

const App: React.FC = () => {
  return <TodoPage />
}

export default hot(module)(App)
