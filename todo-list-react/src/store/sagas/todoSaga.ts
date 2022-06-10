import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import {
  completeTodoSuccessAction,
  createTodoSuccessAction,
  deleteCompletedTodosSuccessAction,
  deleteTodoSuccessAction,
  getTodosSuccessAction,
  updateTodoSuccessAction,
} from '../actions/todoActions'
import {
  CompleteTodoAction,
  CreateTodoAction,
  DeleteTodoAction,
  UpdateTodoAction,
  actionTypes,
} from '../../constants/actionTypes'
import { TodoItem } from '../../constants/todoTypes'
import { loadingAction } from '../actions/globalActions'

function* getTodoWorker() {
  yield put(loadingAction({ isLoading: true }))
  const todos: TodoItem[] | string = yield call(callApi, {
    method: 'GET',
    path: 'todo',
  })
  if (typeof todos === 'string') {
    yield put(getTodosSuccessAction([]))
  } else {
    yield put(getTodosSuccessAction(todos))
  }
  yield put(loadingAction({ isLoading: false }))
}

function* createTodoWorker({ payload }: CreateTodoAction) {
  yield put(loadingAction({ isLoading: true }))
  const receivedNewTodo: TodoItem = yield call(callApi, {
    method: 'POST',
    path: 'todo',
    payload: payload,
  })
  yield put(createTodoSuccessAction(receivedNewTodo))
  yield put(loadingAction({ isLoading: false }))
}

function* updateTodoWorker({ payload }: UpdateTodoAction) {
  yield put(loadingAction({ isLoading: true }))
  const { id, value } = payload
  yield call(callApi, {
    method: 'PATCH',
    path: `todo/${id}`,
    payload: { value },
  })
  yield put(updateTodoSuccessAction({ id, value }))
  yield put(loadingAction({ isLoading: false }))
}

function* completeTodoWorker({ payload }: CompleteTodoAction) {
  yield put(loadingAction({ isLoading: true }))
  const { id, completed } = payload
  yield call(callApi, {
    method: 'PATCH',
    path: `todo/${id}`,
    payload: { completed },
  })
  yield put(completeTodoSuccessAction({ id, completed }))
  yield put(loadingAction({ isLoading: false }))
}

function* deleteTodoWorker({ payload }: DeleteTodoAction) {
  yield put(loadingAction({ isLoading: true }))
  yield call(callApi, {
    method: 'DELETE',
    path: `todo/${payload.id}`,
  })
  yield put(deleteTodoSuccessAction(payload))
  yield put(loadingAction({ isLoading: false }))
}

function* deleteCompletedTodosWorker() {
  yield put(loadingAction({ isLoading: true }))
  yield call(callApi, {
    method: 'DELETE',
    path: `todo?completed=true`,
  })
  yield put(deleteCompletedTodosSuccessAction())
  yield put(loadingAction({ isLoading: false }))
}

export function* todoWatcher(): Generator<StrictEffect> {
  yield takeEvery(actionTypes.GET_TODO_REQUEST, getTodoWorker)
  yield takeEvery(actionTypes.CREATE_TODO_REQUEST, createTodoWorker)
  yield takeEvery(actionTypes.UPDATE_TODO_REQUEST, updateTodoWorker)
  yield takeEvery(actionTypes.COMPLETE_TODO_REQUEST, completeTodoWorker)
  yield takeEvery(actionTypes.DELETE_TODO_REQUEST, deleteTodoWorker)
  yield takeEvery(
    actionTypes.DELETE_COMPLETED_TODOS_REQUEST,
    deleteCompletedTodosWorker
  )
}
