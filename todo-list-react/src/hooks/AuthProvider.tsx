import React, { createContext, useState } from 'react'

interface Props {
  children?: React.ReactNode
}

type ContextProps = {
  auth: string | null
  login: (token: string, navigate: any) => void
  logout: (navigate: any) => void
}

const token = localStorage.getItem('token')

export const AuthContext = createContext<ContextProps>({
  auth: token,
  login: () => null,
  logout: () => null,
})

export function AuthProvider({ children }: Props): JSX.Element {
  const [auth, setAuth] = useState<string | null>(token)

  const login = (token: string, navigate: any): void => {
    setAuth(token)
    navigate()
  }

  const logout = (navigate: any): void => {
    setAuth(null)
    navigate()
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
