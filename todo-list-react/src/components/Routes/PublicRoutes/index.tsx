import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/AuthProvider'

interface Props {
  children?: React.ReactNode
}

function PublicRoute({ children }: Props): JSX.Element {
  const { state } = useAuth()

  return state.auth ? <Navigate to="/" /> : <>{children}</>
}

export default PublicRoute
