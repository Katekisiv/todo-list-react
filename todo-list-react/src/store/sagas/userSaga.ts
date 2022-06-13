import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import { actionTypes } from '../../constants/actionTypes'
import {
  registerSuccessAction,
  loginSuccessAction,
  logoutSuccessAction,
  refreshTokenSuccessAction,
  registerFailedAction,
  loginFailedAction,
} from '../actions/userActions'
import { loadingAction } from '../actions/globalActions'
import { getErrorMessage } from '../../helpers/getErrorMessage'

function* registerWorker(params: any) {
  const { next, payload } = params
  try {
    yield put(loadingAction({ isLoading: true }))
    const registerResult: { token: string; refreshToken: string } = yield call(
      callApi,
      {
        method: 'POST',
        path: 'auth/registration',
        payload,
      }
    )
    yield put(registerSuccessAction(registerResult))
    next(registerResult, null)
    yield put(loadingAction({ isLoading: false }))
  } catch (error) {
    yield put(
      registerFailedAction({
        errorType: 'email',
        errorMessage: getErrorMessage(error),
      })
    )
    next(null, {
      errorType: 'email',
      errorMessage: getErrorMessage(error),
    })

    yield put(loadingAction({ isLoading: false }))
  }
}

function* loginWorker(params: any) {
  const { next, payload } = params
  try {
    yield put(loadingAction({ isLoading: true }))
    const loginResult: { token: string; refreshToken: string } = yield call(
      callApi,
      {
        method: 'POST',
        path: 'auth/login',
        payload,
      }
    )
    yield put(loginSuccessAction(loginResult))
    next(loginResult, null)
    yield put(loadingAction({ isLoading: false }))
  } catch (error) {
    const errorMessage = getErrorMessage(error)
    if (errorMessage === 'User not found') {
      yield put(
        loginFailedAction({
          errorType: 'email',
          errorMessage,
        })
      )
      next(null, {
        errorType: 'email',
        errorMessage,
      })
    } else {
      yield put(
        loginFailedAction({
          errorType: 'password',
          errorMessage,
        })
      )
      next(null, {
        errorType: 'password',
        errorMessage,
      })
    }
    yield put(loadingAction({ isLoading: false }))
  }
}

function* logoutWorker() {
  yield put(loadingAction({ isLoading: true }))
  yield call(callApi, {
    method: 'POST',
    path: 'auth/logout',
  })
  yield put(logoutSuccessAction())
  yield put(loadingAction({ isLoading: false }))
}

function* refreshTokenWorker(params: any) {
  const { next, payload } = params
  try {
    yield put(loadingAction({ isLoading: true }))
    const refreshResult: { token: string; refreshToken: string } = yield call(
      callApi,
      {
        method: 'POST',
        path: 'refresh',
        payload,
      }
    )
    yield put(refreshTokenSuccessAction(refreshResult))
    next(refreshResult, null)
    yield put(loadingAction({ isLoading: false }))
  } catch (error) {
    yield put(logoutSuccessAction())
    yield put(loadingAction({ isLoading: false }))
  }
}

export function* userWatcher(): Generator<StrictEffect> {
  yield takeEvery(actionTypes.REGISTER_REQUEST, registerWorker)
  yield takeEvery(actionTypes.LOGIN_REQUEST, loginWorker)
  yield takeEvery(actionTypes.LOGOUT_REQUEST, logoutWorker)
  yield takeEvery(actionTypes.REFRESH_TOKEN_REQUEST, refreshTokenWorker)
}
