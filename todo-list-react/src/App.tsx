import './normalize.css'
import './App.css'
import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TodoPage from './pages/TodoPage'
import { AuthContext, AuthProvider } from './hooks/AuthProvider'

const App: React.FC = () => {
  const { auth } = useContext(AuthContext)
  return (
    <AuthProvider>
      <Routes>
        {auth ? (
          <Route path="/" element={<TodoPage />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </AuthProvider>
  )
}

export default App
