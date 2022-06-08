import { TodoItem } from './todoTypes'

export enum actionTypes {
  FETCH_REGISTER = 'fetchRegister',
  REGISTER = 'register',
  FETCH_LOGIN = 'fetchLogin',
  LOGIN = 'login',
  FETCH_LOGOUT = 'fetchLogout',
  LOGOUT = 'logout',
  FETCH_REFRESH_TOKEN = 'fetchRefreshToken',
  REFRESH_TOKEN = 'refreshToken',
  FETCH_GET_TODO = 'fetchGetTodo',
  GET_TODO = 'getTodo',
  FETCH_CREATE_TODO = 'fetchCreateTodo',
  CREATE_TODO = 'createTodo',
  FETCH_UPDATE_TODO = 'fetchUpdateTodo',
  UPDATE_TODO = 'updateTodo',
  FETCH_COMPLETE_TODO = 'fetchCompleteTodo',
  COMPLETE_TODO = 'completeTodo',
  FETCH_DELETE_TODO = 'fetchDeleteTodo',
  DELETE_TODO = 'deleteTodo',
  FETCH_DELETE_COMPLETED_TODOS = 'fetchDeleteCompletedTodo',
  DELETE_COMPLETED_TODOS = 'deleteCompletedTodo',
  LOADING = 'loading',
}

export interface RegisterAction {
  type: actionTypes.REGISTER
  payload: { token: string; refreshToken: string }
}

export interface LoginAction {
  type: actionTypes.LOGIN
  payload: { token: string; refreshToken: string }
}

export interface LogoutAction {
  type: actionTypes.LOGOUT
}

export interface RefreshTokenAction {
  type: actionTypes.REFRESH_TOKEN
  payload: { token: string; refreshToken: string }
}

export type UserAction =
  | RegisterAction
  | LoginAction
  | LogoutAction
  | RefreshTokenAction

export interface FetchRegisterAction {
  type: actionTypes.FETCH_REGISTER
  payload: { email: string; password: string }
}

export interface FetchLoginAction {
  type: actionTypes.FETCH_LOGIN
  payload: { email: string; password: string }
}

export interface FetchLogoutAction {
  type: actionTypes.FETCH_LOGOUT
}

export interface FetchRefreshTokenAction {
  type: actionTypes.FETCH_REFRESH_TOKEN
  payload: { refreshToken: string }
}

export interface GetTodosAction {
  type: actionTypes.GET_TODO
  payload: TodoItem[]
}

export interface CreateTodoAction {
  type: actionTypes.CREATE_TODO
  payload: TodoItem
}

export interface UpdateTodoAction {
  type: actionTypes.UPDATE_TODO
  payload: { id: number; value: string }
}

export interface CompleteTodoAction {
  type: actionTypes.COMPLETE_TODO
  payload: { id: number; completed: boolean }
}

export interface DeleteTodoAction {
  type: actionTypes.DELETE_TODO
  payload: { id: number }
}

export interface DeleteCompletedTodoAction {
  type: actionTypes.DELETE_COMPLETED_TODOS
}

export interface DeleteCompletedTodosAction {
  type: actionTypes.DELETE_COMPLETED_TODOS
}

export type TodoAction =
  | GetTodosAction
  | CreateTodoAction
  | UpdateTodoAction
  | CompleteTodoAction
  | DeleteTodoAction
  | DeleteCompletedTodosAction

export interface FetchGetTodoAction {
  type: actionTypes.FETCH_GET_TODO
}

export interface FetchCreateTodoAction {
  type: actionTypes.FETCH_CREATE_TODO
  payload: { value: string; completed: boolean }
}

export interface FetchUpdateTodoAction {
  type: actionTypes.FETCH_UPDATE_TODO
  payload: { id: number; value: string }
}

export interface FetchCompleteTodoAction {
  type: actionTypes.FETCH_COMPLETE_TODO
  payload: { id: number; completed: boolean }
}

export interface FetchDeleteTodoAction {
  type: actionTypes.FETCH_DELETE_TODO
  payload: { id: number }
}

export interface FetchDeleteCompletedTodoAction {
  type: actionTypes.FETCH_DELETE_COMPLETED_TODOS
}

export interface LoadingAction {
  type: actionTypes.LOADING
  payload: { isLoading: boolean }
}
