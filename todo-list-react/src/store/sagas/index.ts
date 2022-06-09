import { all } from 'redux-saga/effects'
import { todoWatcher } from './todoSaga'
import { userWatcher } from './userSaga'

export function* rootWatcher() {
  yield all([todoWatcher(), userWatcher()])
}
