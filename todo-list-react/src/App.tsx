import './normalize.css'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TodoPage from './pages/TodoPage'
import { useTypedSelectors } from './hooks/useTypedSelectors'

const App: React.FC = () => {
  const { isAuth } = useTypedSelectors((state) => state.user)
  console.log(isAuth)
  return (
    <Routes>
      {isAuth ? (
        <Route path="/" element={<TodoPage />} />
      ) : (
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/registration" element={<RegisterPage />} />
          <Route path="*" element={<LoginPage />} />
        </>
      )}
    </Routes>
  )
}

export default App
