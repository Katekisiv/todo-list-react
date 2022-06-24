import { Filter, TodoItem, Todos } from './todoTypes'

export enum actionTypes {
  REGISTER_REQUEST = 'registerRequest',
  REGISTER_SUCCESS = 'registerSuccess',
  REGISTER_FAILED = 'registerFailed',
  LOGIN_REQUEST = 'loginRequest',
  LOGIN_SUCCESS = 'loginSuccess',
  LOGIN_FAILED = 'loginFailed',
  LOGOUT_REQUEST = 'logoutRequest',
  LOGOUT_SUCCESS = 'logoutSuccess',
  LOGOUT_FAILED = 'logoutFailed',
  REFRESH_TOKEN_REQUEST = 'refreshTokenRequest',
  REFRESH_TOKEN_SUCCESS = 'refreshTokenSuccess',
  REFRESH_TOKEN_FAILED = 'refreshTokenFailed',
  GET_TODO_REQUEST = 'getTodoRequest',
  GET_TODO_SUCCESS = 'getTodoSuccess',
  GET_TODO_FAILED = 'getTodoFailed',
  CREATE_TODO_REQUEST = 'createTodoRequest',
  CREATE_TODO_SUCCESS = 'createTodoSuccess',
  CREATE_TODO_FAILED = 'createTodoFailed',
  UPDATE_TODO_REQUEST = 'updateTodoRequest',
  UPDATE_TODO_SUCCESS = 'updateTodoSuccess',
  UPDATE_TODO_FAILED = 'updateTodoFailed',
  COMPLETE_TODO_REQUEST = 'completeTodoRequest',
  COMPLETE_TODO_SUCCESS = 'completeTodoSuccess',
  COMPLETE_TODO_FAILED = 'completeTodoFailed',
  DELETE_TODO_REQUEST = 'deleteTodoRequest',
  DELETE_TODO_SUCCESS = 'deleteTodoSuccess',
  DELETE_TODO_FAILED = 'deleteTodoFailed',
  DELETE_COMPLETED_TODOS_REQUEST = 'deleteCompletedTodoRequest',
  DELETE_COMPLETED_TODOS_SUCCESS = 'deleteCompletedTodoSuccess',
  DELETE_COMPLETED_TODOS_FAILED = 'deleteCompletedTodoFailed',
  LOADING = 'loading',
}

export type RegisterAction =
  | {
      type: actionTypes.REGISTER_SUCCESS
      payload: { token: string; refreshToken: string }
    }
  | {
      type: actionTypes.REGISTER_REQUEST
      payload: { email: string; password: string }
    }
  | {
      type: actionTypes.REGISTER_FAILED
      payload: { errorType: string; errorMessage: string }
    }

export type LoginAction =
  | {
      type: actionTypes.LOGIN_SUCCESS
      payload: { token: string; refreshToken: string }
    }
  | {
      type: actionTypes.LOGIN_REQUEST
      payload: { email: string; password: string }
    }
  | {
      type: actionTypes.LOGIN_FAILED
      payload: { errorType: string; errorMessage: string }
    }

export type LogoutAction =
  | {
      type: actionTypes.LOGOUT_SUCCESS
    }
  | {
      type: actionTypes.LOGOUT_REQUEST
    }

export type RefreshTokenAction =
  | {
      type: actionTypes.REFRESH_TOKEN_SUCCESS
      payload: { token: string; refreshToken: string | null }
    }
  | {
      type: actionTypes.REFRESH_TOKEN_REQUEST
      payload: { refreshToken: string | null }
    }

export type UserAction =
  | RegisterAction
  | LoginAction
  | LogoutAction
  | RefreshTokenAction

export type GetTodosSuccessAction = {
  type: actionTypes.GET_TODO_SUCCESS
  payload: Todos
}

export type GetTodosRequestAction = {
  type: actionTypes.GET_TODO_REQUEST
  payload: { filter: Filter; todosPerPage?: number; pageNumber?: number }
}

export type CreateTodoAction =
  | {
      type: actionTypes.CREATE_TODO_SUCCESS
      payload: TodoItem
    }
  | {
      type: actionTypes.CREATE_TODO_REQUEST
      payload: { value: string; completed: boolean }
    }

export type UpdateTodoAction =
  | {
      type: actionTypes.UPDATE_TODO_SUCCESS
      payload: { id: number; value: string }
    }
  | {
      type: actionTypes.UPDATE_TODO_REQUEST
      payload: { id: number; value: string }
    }

export type CompleteTodoAction =
  | {
      type: actionTypes.COMPLETE_TODO_SUCCESS
      payload: { id: number; completed: boolean }
    }
  | {
      type: actionTypes.COMPLETE_TODO_REQUEST
      payload: { id: number; completed: boolean }
    }

export type DeleteTodoAction =
  | {
      type: actionTypes.DELETE_TODO_SUCCESS
      payload: { id: number }
    }
  | {
      type: actionTypes.DELETE_TODO_REQUEST
      payload: { id: number }
    }

export type DeleteCompletedTodosAction =
  | {
      type: actionTypes.DELETE_COMPLETED_TODOS_SUCCESS
    }
  | {
      type: actionTypes.DELETE_COMPLETED_TODOS_REQUEST
    }

export type TodoAction =
  | GetTodosSuccessAction
  | CreateTodoAction
  | UpdateTodoAction
  | CompleteTodoAction
  | DeleteTodoAction
  | DeleteCompletedTodosAction

export interface LoadingAction {
  type: actionTypes.LOADING
  payload: { isLoading: boolean }
}
