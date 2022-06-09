import { TodoItem } from '../../constants/todoTypes'
import {
  actionTypes,
  CompleteTodoAction,
  CreateTodoAction,
  DeleteCompletedTodoAction,
  DeleteTodoAction,
  FetchCompleteTodoAction,
  FetchCreateTodoAction,
  FetchDeleteCompletedTodoAction,
  FetchDeleteTodoAction,
  FetchGetTodoAction,
  FetchUpdateTodoAction,
  GetTodosAction,
  UpdateTodoAction,
} from '../../constants/actionTypes'

export const fetchGetTodosAction = (): FetchGetTodoAction => {
  return {
    type: actionTypes.FETCH_GET_TODO,
  }
}

export const getTodosAction = (todos: TodoItem[]): GetTodosAction => {
  return {
    type: actionTypes.GET_TODO,
    payload: todos,
  }
}

export const fetchCreateTodoAction = (todo: {
  value: string
  completed: boolean
}): FetchCreateTodoAction => {
  return {
    type: actionTypes.FETCH_CREATE_TODO,
    payload: todo,
  }
}

export const createTodoAction = (todo: TodoItem): CreateTodoAction => {
  return {
    type: actionTypes.CREATE_TODO,
    payload: todo,
  }
}

export const fetchUpdateTodoAction = (todo: {
  id: number
  value: string
}): FetchUpdateTodoAction => {
  return {
    type: actionTypes.FETCH_UPDATE_TODO,
    payload: todo,
  }
}

export const updateTodoAction = (todo: {
  id: number
  value: string
}): UpdateTodoAction => {
  return {
    type: actionTypes.UPDATE_TODO,
    payload: todo,
  }
}

export const fetchCompleteTodoAction = (todo: {
  id: number
  completed: boolean
}): FetchCompleteTodoAction => {
  return {
    type: actionTypes.FETCH_COMPLETE_TODO,
    payload: todo,
  }
}

export const completeTodoAction = (todo: {
  id: number
  completed: boolean
}): CompleteTodoAction => {
  return {
    type: actionTypes.COMPLETE_TODO,
    payload: todo,
  }
}

export const fetchDeleteTodoAction = (payload: {
  id: number
}): FetchDeleteTodoAction => {
  return {
    type: actionTypes.FETCH_DELETE_TODO,
    payload,
  }
}

export const deleteTodoAction = (payload: { id: number }): DeleteTodoAction => {
  return {
    type: actionTypes.DELETE_TODO,
    payload,
  }
}

export const fetchDeleteCompletedTodosAction = (): FetchDeleteCompletedTodoAction => {
  return {
    type: actionTypes.FETCH_DELETE_COMPLETED_TODOS,
  }
}

export const deleteCompletedTodosAction = (): DeleteCompletedTodoAction => {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS,
  }
}
