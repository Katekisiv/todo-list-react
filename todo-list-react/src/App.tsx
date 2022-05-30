import './normalize.css'
import React, { useReducer } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TodoPage from './pages/TodoPage'
import { AuthContext, userReducer } from './hooks/userReducer'

const App: React.FC = () => {
  const token = localStorage.getItem('token')
  const [state, dispatch] = useReducer(userReducer, { auth: token, todos: [] })
  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <Routes>
        {state.auth ? (
          <Route path="/" element={<TodoPage />} />
        ) : (
          <>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegisterPage />} />
            <Route path="*" element={<LoginPage />} />
          </>
        )}
      </Routes>
    </AuthContext.Provider>
  )
}

export default App
