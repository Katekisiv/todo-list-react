import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'

interface Props {
  children?: React.ReactNode
}

function PublicRoute({ children }: Props): JSX.Element {
  const { auth } = useAuth()

  return auth ? <Navigate to="/" /> : <>{children}</>
}

export default PublicRoute
