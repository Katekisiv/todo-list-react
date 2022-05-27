import { createContext, useContext } from 'react'

type Action =
  | { type: 'login'; payload?: { token: string } }
  | { type: 'logout' }
type Dispatch = (action: Action) => void
type State = { auth: string | null | undefined }
type ContextProps = {
  state: State
  dispatch: Dispatch | undefined
}

export function userReducer(state: State, action: Action) {
  switch (action.type) {
    case 'login': {
      return { auth: (state.auth = action.payload?.token) }
    }
    case 'logout': {
      return { auth: (state.auth = null) }
    }
    default: {
      throw new Error(`Unhandled action: ${action}`)
    }
  }
}

const token = localStorage.getItem('token')

export const AuthContext = createContext<ContextProps>({
  state: { auth: token },
  dispatch: undefined,
})

export function useAuth() {
  return useContext(AuthContext)
}
