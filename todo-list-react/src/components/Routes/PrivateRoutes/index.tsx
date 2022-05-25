import React from 'react'
import { useLocation, Navigate } from 'react-router-dom'
import { Route } from 'react-router-dom'

interface Props {
  children?: React.ReactNode
}

function PrivateRoutes({ children }: Props): JSX.Element {
  const location = useLocation()
  const isAuth = localStorage.getItem('token')

  return (
    <Route path="/">
      {isAuth} ? {children} :{' '}
      <Navigate to="/login" state={{ from: location }} />
    </Route>
  )
}

export default PrivateRoutes
