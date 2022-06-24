import { TodoState } from '../../constants/todoTypes'
import { TodoAction } from '../../constants/actionTypes'
import { actionTypes } from '../../constants/actionTypes'

const initialState: TodoState = {
  todos: {
    todosLength: 0,
    completedTodosLength: 0,
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
          completedTodosLength: action.payload.completedTodosLength,
          todoItems: [...action.payload.todoItems],
        },
      }

    case actionTypes.CREATE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength + 1,
          completedTodosLength: action.payload.completed ? state.todos.completedTodosLength + 1 : state.todos.completedTodosLength,
          todoItems: [...state.todos.todoItems, action.payload],
        },
      }

    case actionTypes.UPDATE_TODO_SUCCESS:
      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength,
          completedTodosLength: state.todos.completedTodosLength,
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
          completedTodosLength: state.todos.completedTodosLength,
          todoItems: state.todos.todoItems.map((todo) => {
            if (todo.id === action.payload.id) {
              todo.completed = action.payload.completed
            }
            return { ...todo }
          }),
        },
      }

    case actionTypes.DELETE_TODO_SUCCESS:
      const isCompleted = state.todos.todoItems.find(
          (todo) => todo.id === action.payload.id
        )?.completed

      return {
        error: null,
        todos: {
          todosLength: state.todos.todosLength - 1,
          completedTodosLength: isCompleted? state.todos.completedTodosLength - 1 : state.todos.completedTodosLength,
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
          completedTodosLength: 0,
          todoItems: activeTodos,
        },
      }

    default:
      return state
  }
}
