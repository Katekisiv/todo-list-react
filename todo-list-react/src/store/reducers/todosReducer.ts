import { TodoAction, TodoState } from '../../constants/todoTypes'
import { actionTypes } from '../../constants/actionTypes'
import { deepCloning } from '../../helpers/deepCloning'

const initialState: TodoState = {
  todos: [],
  error: null,
}

export const todosReducer = (
  state = initialState,
  action: TodoAction
): TodoState => {
  switch (action.type) {
    case actionTypes.GET_TODO:
      return {
        error: null,
        todos: [...action.payload],
      }

    case actionTypes.CREATE_TODO:
      const newTodos = deepCloning(state.todos)
      newTodos.push(action.payload)
      return {
        error: null,
        todos: newTodos,
      }

    case actionTypes.UPDATE_TODO:
      return {
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.value = action.payload.value
          }
          return { ...todo }
        }),
      }

    case actionTypes.COMPLETE_TODO:
      return {
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed
          }
          return { ...todo }
        }),
      }

    case actionTypes.DELETE_TODO:
      return {
        error: null,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }

    case actionTypes.DELETE_COMPLETED_TODOS:
      return {
        error: null,
        todos: state.todos.filter((todo) => !todo.completed),
      }

    default:
      return state
  }
}
