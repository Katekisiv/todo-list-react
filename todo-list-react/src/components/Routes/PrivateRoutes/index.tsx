import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/AuthProvider'

interface Props {
  children?: React.ReactNode
}

function PrivateRoutes({ children }: Props): JSX.Element {
  const location = useLocation()
  const { state } = useAuth()

  return state.auth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoutes
