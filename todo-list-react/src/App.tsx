import './normalize.css'
import './App.css'
import React from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TodoPage from './pages/TodoPage'
import PrivateRoutes from './components/Routes/PrivateRoutes'
import PublicRoutes from './components/Routes/PublicRoutes'

const App: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoutes>
            <Outlet />
          </PrivateRoutes>
        }
      >
        <Route index element={<TodoPage />} />
      </Route>

      <Route
        path="/login"
        element={
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        }
      />
      <Route
        path="/registration"
        element={
          <PublicRoutes>
            <RegisterPage />
          </PublicRoutes>
        }
      />
      <Route
        path="*"
        element={
          <PublicRoutes>
            <LoginPage />
          </PublicRoutes>
        }
      />
    </Routes>
  )
}

export default App
