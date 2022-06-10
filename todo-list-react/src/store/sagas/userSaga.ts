import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import {
  RegisterAction,
  LoginAction,
  RefreshTokenAction,
  actionTypes,
} from '../../constants/actionTypes'
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

function* registerWorker({ payload }: RegisterAction) {
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
    yield put(
      registerSuccessAction({
        token: registerResult.token,
        refreshToken: registerResult.refreshToken,
      })
    )
    yield put(loadingAction({ isLoading: false }))
  } catch (error) {
    yield put(
      registerFailedAction({
        errorType: 'email',
        errorMessage: getErrorMessage(error),
      })
    )
    yield put(loadingAction({ isLoading: false }))
  }
}

function* loginWorker({ payload }: LoginAction) {
  yield put(loadingAction({ isLoading: true }))
  const loginResult:
    | { token: string; refreshToken: string }
    | string = yield call(callApi, {
    method: 'POST',
    path: 'auth/login',
    payload,
  })
  if (typeof loginResult !== 'string') {
    yield put(
      loginSuccessAction({
        token: loginResult.token,
        refreshToken: loginResult.refreshToken,
      })
    )
  } else {
    if (loginResult === 'User not found') {
      yield put(
        loginFailedAction({
          errorType: 'email',
          errorMessage: loginResult,
        })
      )
    } else {
      yield put(
        loginFailedAction({
          errorType: 'password',
          errorMessage: loginResult,
        })
      )
    }
  }
  yield put(loadingAction({ isLoading: false }))
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

function* refreshTokenWorker({ payload }: RefreshTokenAction) {
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
