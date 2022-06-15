import { TodoState } from '../../constants/todoTypes'
import { TodoAction } from '../../constants/actionTypes'
import { actionTypes } from '../../constants/actionTypes'

const initialState: TodoState = {
  todos: {
    todosLength: 0,
    todoItems: [],
  },
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
        todos: {
          todosLength: action.payload.todosLength,
          todoItems: [...action.payload.todoItems],
        },
      }

    case actionTypes.CREATE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength + 1,
          todoItems: [...state.todos.todoItems, action.payload],
        },
      }

    case actionTypes.UPDATE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength,
          todoItems: state.todos.todoItems.map((todo) => {
            if (todo.id === action.payload.id) {
              todo.value = action.payload.value
            }
            return { ...todo }
          }),
        },
      }

    case actionTypes.COMPLETE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength,
          todoItems: state.todos.todoItems.map((todo) => {
            if (todo.id === action.payload.id) {
              todo.completed = action.payload.completed
            }
            return { ...todo }
          }),
        },
      }

    case actionTypes.DELETE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength - 1,
          todoItems: state.todos.todoItems.filter(
            (todo) => todo.id !== action.payload.id
          ),
        },
      }

    case actionTypes.DELETE_COMPLETED_TODOS_SUCCESS:
      const activeTodos = state.todos.todoItems.filter(
        (todo) => !todo.completed
      )
      return {
        error: null,
        todos: {
          todosLength: activeTodos.length,
          todoItems: activeTodos,
        },
      }

    default:
      return state
  }
}
