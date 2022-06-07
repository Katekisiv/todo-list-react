import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import { createTodoAction, getTodosAction } from '../actions/todoActions'
import { TodoItem } from '../../constants/todoTypes'
import { actionTypes } from '../../constants/actionTypes'

function* getTodoWorker() {
  const todos: TodoItem[] | string = yield call(callApi,{
    method: 'GET',
    path: 'todo',
  })
  if (typeof todos === 'string') {
    yield put(getTodosAction([]))
  } else {
    yield put(getTodosAction(todos))
  }
}

function* createTodoWorker(newTodo: TodoItem) {
  const receivedNewTodo: TodoItem = await callApi({
    method: 'POST',
    path: 'todo',
    payload: newTodo,
  })
  yield put(createTodoAction(receivedNewTodo))
}

function* updateTodoWorker () {

}

function* completeTodoWorker

= () => {

}

function* deleteTodoWorker

= () => {

}

function* deleteCompletedTodosWorker

= () => {

}

export function* todoWatcher(): Generator<StrictEffect> {
  yield takeEvery(actionTypes.FETCH_GET_TODO, getTodoWorker)
  yield takeEvery(actionTypes.FETCH_CREATE_TODO, createTodoWorker)
  yield takeEvery(actionTypes.FETCH_UPDATE_TODO, updateTodoWorker)
  yield takeEvery(actionTypes.FETCH_COMPLETE_TODO, completeTodoWorker)
  yield takeEvery(actionTypes.FETCH_DELETE_TODO, deleteTodoWorker)
  yield takeEvery(actionTypes.FETCH_DELETE_COMPLETED_TODOS, deleteCompletedTodosWorker)
}
