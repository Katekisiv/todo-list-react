import { Filter, TodoItem } from '../../constants/todoTypes'
import {
  actionTypes,
  CompleteTodoAction,
  CreateTodoAction,
  DeleteCompletedTodosAction,
  DeleteTodoAction,
  GetTodosAction,
  UpdateTodoAction,
} from '../../constants/actionTypes'

export const getTodosRequestAction = (payload: {
  filter: Filter
}): GetTodosAction => {
  return {
    type: actionTypes.GET_TODO_REQUEST,
    payload,
  }
}

export const getTodosSuccessAction = (todos: TodoItem[]): GetTodosAction => {
  return {
    type: actionTypes.GET_TODO_SUCCESS,
    payload: todos,
  }
}

export const createTodoRequestAction = (todo: {
  value: string
  completed: boolean
}): CreateTodoAction => {
  return {
    type: actionTypes.CREATE_TODO_REQUEST,
    payload: todo,
  }
}

export const createTodoSuccessAction = (todo: TodoItem): CreateTodoAction => {
  return {
    type: actionTypes.CREATE_TODO_SUCCESS,
    payload: todo,
  }
}

export const updateTodoRequestAction = (todo: {
  id: number
  value: string
}): UpdateTodoAction => {
  return {
    type: actionTypes.UPDATE_TODO_REQUEST,
    payload: todo,
  }
}

export const updateTodoSuccessAction = (todo: {
  id: number
  value: string
}): UpdateTodoAction => {
  return {
    type: actionTypes.UPDATE_TODO_SUCCESS,
    payload: todo,
  }
}

export const completeTodoRequestAction = (todo: {
  id: number
  completed: boolean
}): CompleteTodoAction => {
  return {
    type: actionTypes.COMPLETE_TODO_REQUEST,
    payload: todo,
  }
}

export const completeTodoSuccessAction = (todo: {
  id: number
  completed: boolean
}): CompleteTodoAction => {
  return {
    type: actionTypes.COMPLETE_TODO_SUCCESS,
    payload: todo,
  }
}

export const deleteTodoRequestAction = (payload: {
  id: number
}): DeleteTodoAction => {
  return {
    type: actionTypes.DELETE_TODO_REQUEST,
    payload,
  }
}

export const deleteTodoSuccessAction = (payload: {
  id: number
}): DeleteTodoAction => {
  return {
    type: actionTypes.DELETE_TODO_SUCCESS,
    payload,
  }
}

export const deleteCompletedTodosRequestAction = (): DeleteCompletedTodosAction => {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS_REQUEST,
  }
}

export const deleteCompletedTodosSuccessAction = (): DeleteCompletedTodosAction => {
  return {
    type: actionTypes.DELETE_COMPLETED_TODOS_SUCCESS,
  }
}
