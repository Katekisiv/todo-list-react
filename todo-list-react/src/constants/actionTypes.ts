const REGISTER = 'register'
const LOGIN = 'login'
const LOGOUT = 'logout'
const REFRESH_TOKEN = 'refreshToken'
const GET_TODO = 'getTodo'
const CREATE_TODO = 'createTodo'
const UPDATE_TODO = 'updateTodo'
const COMPLETE_TODO = 'completeTodo'
const DELETE_TODO = 'deleteTodo'
const DELETE_COMPLETED_TODOS = 'deleteCompletedTodo'

export const actionTypes = {
  REGISTER,
  LOGIN,
  LOGOUT,
  REFRESH_TOKEN,
  GET_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  COMPLETE_TODO,
  DELETE_TODO,
  DELETE_COMPLETED_TODOS,
}

export type ActionType =
  | 'register'
  | 'login'
  | 'logout'
  | 'refreshToken'
  | 'getTodo'
  | 'createTodo'
  | 'updateTodo'
  | 'completeTodo'
  | 'deleteTodo'
  | 'deleteCompletedTodo'
