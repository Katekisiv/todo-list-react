import { combineReducers } from 'redux'
import { todosReducer } from './todosReducer'
import { userReducer } from './userReducer'
import { globalReducer } from './globalReducer'

export const rootReducer = combineReducers({
  todos: todosReducer,
  user: userReducer,
  global: globalReducer,
})

export type RootState = ReturnType<typeof rootReducer>
