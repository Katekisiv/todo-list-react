import { TodoState } from '../../constants/todoTypes'
import { TodoAction } from '../../constants/actionTypes'
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
    case actionTypes.GET_TODO_SUCCESS:
      return {
        error: null,
        todos: [...action.payload],
      }

    case actionTypes.CREATE_TODO_SUCCESS:
      const newTodos = deepCloning(state.todos)
      newTodos.push(action.payload)
      return {
        error: null,
        todos: newTodos,
      }

    case actionTypes.UPDATE_TODO_SUCCESS:
      return {
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.value = action.payload.value
          }
          return { ...todo }
        }),
      }

    case actionTypes.COMPLETE_TODO_SUCCESS:
      return {
        error: null,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload.id) {
            todo.completed = action.payload.completed
          }
          return { ...todo }
        }),
      }

    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        error: null,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      }

    case actionTypes.DELETE_COMPLETED_TODOS_SUCCESS:
      return {
        error: null,
        todos: state.todos.filter((todo) => !todo.completed),
      }

    default:
      return state
  }
}
