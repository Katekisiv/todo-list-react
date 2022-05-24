import React from 'react'
import { Navigate } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

const PublicRoute = ({ children }: Props): JSX.Element => {
  const isAuth = localStorage.getItem('token')

  return isAuth ? <Navigate to="/" /> : <>{children}</>
}

export default PublicRoute
