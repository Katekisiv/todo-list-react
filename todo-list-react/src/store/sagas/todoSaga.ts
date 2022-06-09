import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import {
  completeTodoAction,
  createTodoAction,
  deleteCompletedTodosAction,
  deleteTodoAction,
  getTodosAction,
  updateTodoAction,
} from '../actions/todoActions'
import {
  FetchCompleteTodoAction,
  FetchCreateTodoAction,
  FetchDeleteTodoAction,
  FetchUpdateTodoAction,
  actionTypes,
} from '../../constants/actionTypes'
import { TodoItem } from '../../constants/todoTypes'

function* getTodoWorker() {
  const todos: TodoItem[] | string = yield call(callApi, {
    method: 'GET',
    path: 'todo',
  })
  if (typeof todos === 'string') {
    yield put(getTodosAction([]))
  } else {
    yield put(getTodosAction(todos))
  }
}

function* createTodoWorker({ payload }: FetchCreateTodoAction) {
  const receivedNewTodo: TodoItem = yield call(callApi, {
    method: 'POST',
    path: 'todo',
    payload: payload,
  })
  yield put(createTodoAction(receivedNewTodo))
}

function* updateTodoWorker({ payload }: FetchUpdateTodoAction) {
  const { id, value } = payload
  yield call(callApi, {
    method: 'PATCH',
    path: `todo/${id}`,
    payload: { value },
  })
  yield put(updateTodoAction({ id, value }))
}

function* completeTodoWorker({ payload }: FetchCompleteTodoAction) {
  const { id, completed } = payload
  yield call(callApi, {
    method: 'PATCH',
    path: `todo/${id}`,
    payload: { completed },
  })
  yield put(completeTodoAction({ id, completed }))
}

function* deleteTodoWorker({ payload }: FetchDeleteTodoAction) {
  yield call(callApi, {
    method: 'DELETE',
    path: `todo/${payload.id}`,
  })
  yield put(deleteTodoAction(payload))
}

function* deleteCompletedTodosWorker() {
  yield call(callApi, {
    method: 'DELETE',
    path: `todo?completed=true`,
  })
  yield put(deleteCompletedTodosAction())
}

export function* todoWatcher(): Generator<StrictEffect> {
  yield takeEvery(actionTypes.FETCH_GET_TODO, getTodoWorker)
  yield takeEvery(actionTypes.FETCH_CREATE_TODO, createTodoWorker)
  yield takeEvery(actionTypes.FETCH_UPDATE_TODO, updateTodoWorker)
  yield takeEvery(actionTypes.FETCH_COMPLETE_TODO, completeTodoWorker)
  yield takeEvery(actionTypes.FETCH_DELETE_TODO, deleteTodoWorker)
  yield takeEvery(
    actionTypes.FETCH_DELETE_COMPLETED_TODOS,
    deleteCompletedTodosWorker
  )
}
