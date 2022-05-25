import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

interface Props {
  children?: React.ReactNode
}

function PrivateRoutes({ children }: Props): JSX.Element {
  const location = useLocation()
  const { auth } = useAuth()

  return auth ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  )
}

export default PrivateRoutes
