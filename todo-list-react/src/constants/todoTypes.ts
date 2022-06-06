import { actionTypes } from './actionTypes'

export interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

export interface TodoState {
  todos: TodoItem[]
  error: null | string
}

interface GetTodosAction {
  type: actionTypes.GET_TODO
  payload: TodoItem[]
}

interface CreateTodoAction {
  type: actionTypes.CREATE_TODO
  payload: TodoItem
}

interface UpdateTodoAction {
  type: actionTypes.UPDATE_TODO
  payload: { id: number; value: string }
}

interface CompleteTodoAction {
  type: actionTypes.COMPLETE_TODO
  payload: { id: number; completed: boolean }
}

interface DeleteTodoAction {
  type: actionTypes.DELETE_TODO
  payload: { id: number }
}

interface DeleteCompletedTodosAction {
  type: actionTypes.DELETE_COMPLETED_TODOS
}

export type TodoAction =
  | GetTodosAction
  | CreateTodoAction
  | UpdateTodoAction
  | CompleteTodoAction
  | DeleteTodoAction
  | DeleteCompletedTodosAction
