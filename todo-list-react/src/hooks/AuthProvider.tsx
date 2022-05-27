import { createContext, useContext } from 'react'
import { actionTypes, ActionType } from '../constants/actionTypes'
import { deepCloning } from '../helpers/deepCloning'

interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

type Action = { type: ActionType; payload?: Record<any, any> }
type Dispatch = (action: Action) => void
type State = { auth: string | null | undefined; todos: TodoItem[] }
type ContextProps = {
  state: State
  dispatch: Dispatch
}

export function userReducer(state: State, action: Action): State {
  const payload = action.payload
  switch (action.type) {
    case actionTypes.LOGIN: {
      return {
        auth: payload?.token,
        todos: state.todos,
      }
    }
    case actionTypes.LOGOUT: {
      return {
        auth: null,
        todos: state.todos,
      }
    }
    case actionTypes.GET_TODO: {
      return {
        auth: state.auth,
        todos: payload?.todos,
      }
    }
    case actionTypes.CREATE_TODO: {
      const newTodos = deepCloning(state.todos)
      newTodos.push(payload?.todo)
      return {
        auth: state.auth,
        todos: newTodos,
      }
    }
    case actionTypes.UPDATE_TODO: {
      return {
        auth: state.auth,
        todos: state.todos.map((todo) => {
          if (todo.id === payload?.todoId) {
            todo.value = payload?.value
          }
          return { ...todo }
        }),
      }
    }
    case actionTypes.COMPLETE_TODO: {
      return {
        auth: state.auth,
        todos: state.todos.map((todo) => {
          if (todo.id === payload?.todoId) {
            todo.completed = payload?.completed
          }
          return { ...todo }
        }),
      }
    }
    case actionTypes.DELETE_TODO: {
      return {
        auth: state.auth,
        todos: state.todos.filter((todo) => todo.id !== payload?.todoId),
      }
    }
    case actionTypes.DELETE_COMPLETED_TODOS: {
      return {
        auth: state.auth,
        todos: state.todos.filter((todo) => !todo.completed),
      }
    }
    default: {
      throw new Error(`Unhandled action: ${action}`)
    }
  }
}

const token = localStorage.getItem('token')

export const AuthContext = createContext<ContextProps>({
  state: {
    auth: token,
    todos: [],
  },
  dispatch: () => null,
})

export function useStore() {
  return useContext(AuthContext)
}
