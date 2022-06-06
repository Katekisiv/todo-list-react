import { TodoItem } from '../../constants/todoTypes'
import { actionTypes } from '../../constants/actionTypes'

export const fetchGetTodosAction = () => {
  return {
    type: actionTypes.FETCH_GET_TODO,
  }
}

export const getTodosAction = (todos: TodoItem[]) => {
  return {
    type: actionTypes.GET_TODO,
    payload: todos,
  }
}

export const fetchCreateTodoAction = (todo: TodoItem) => {
  return {
    type: actionTypes.FETCH_CREATE_TODO,
    payload: todo,
  }
}

export const createTodoAction = (todo: TodoItem) => {
  return {
    type: actionTypes.CREATE_TODO,
    payload: todo,
  }
}

export const fetchUpdateTodoAction = (todo: { id: number; value: string }) => {
  return {
    type: actionTypes.FETCH_UPDATE_TODO,
    payload: todo,
  }
}

export const updateTodoAction = (todo: { id: number; value: string }) => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload: todo,
  }
}

export const fetchCompleteTodoAction = (todo: {
  id: number
  completed: string
}) => {
  return {
    type: actionTypes.FETCH_COMPLETE_TODO,
    payload: todo,
  }
}

export const completeTodoAction = (todo: { id: number; completed: string }) => {
  return {
    type: actionTypes.COMPLETE_TODO,
    payload: todo,
  }
}

export const fetchDeleteTodoAction = (id: number) => {
  return {
    type: actionTypes.FETCH_DELETE_TODO,
    payload: id,
  }
}

export const deleteTodoAction = (id: number) => {
  return {
    type: actionTypes.DELETE_TODO,
    payload: id,
  }
}

export const fetchDeleteCompletedTodosAction = () => {
  return {
    type: actionTypes.FETCH_DELETE_COMPLETED_TODOS,
  }
}

export const deleteCompletedTodosAction = () => {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS,
  }
}
