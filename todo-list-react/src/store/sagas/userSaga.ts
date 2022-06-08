import { takeEvery, put, call, StrictEffect } from 'redux-saga/effects'
import { callApi } from '../../Api/callApi'
import {
  FetchRegisterAction,
  FetchLoginAction,
  FetchRefreshTokenAction,
  actionTypes,
} from '../../constants/actionTypes'
import {
  loginAction,
  logoutAction,
  refreshTokenAction,
} from '../actions/userActions'

function* registerWorker({ payload }: FetchRegisterAction) {
  const registerResult:
    | { token: string; refreshToken: string }
    | string = yield call(callApi, {
    method: 'POST',
    path: 'auth/registration',
    payload,
  })

  if (typeof registerResult === 'string') {
    return {
      //error email: registerResult.substr(registerResult.indexOf(':') + 1)
    }
  } else {
    yield put(
      loginAction({
        token: registerResult.token,
        refreshToken: registerResult.refreshToken,
      })
    )
  }
}

function* loginWorker({ payload }: FetchLoginAction) {
  const loginResult:
    | { token: string; refreshToken: string }
    | string = yield call(callApi, {
    method: 'POST',
    path: 'auth/login',
    payload,
  })
  if (typeof loginResult === 'string') {
    if (loginResult === 'error:User not found') {
      return {
        // error email: 'User not found',
      }
    } else {
      return {
        /// error password: 'Wrong password',
      }
    }
  } else {
    yield put(
      loginAction({
        token: loginResult.token,
        refreshToken: loginResult.refreshToken,
      })
    )
  }
}

function* logoutWorker() {
  yield call(callApi, {
    method: 'POST',
    path: 'auth/logout',
  })
  yield put(logoutAction())
}

function* refreshTokenWorker({ payload }: FetchRefreshTokenAction) {
  const refreshResult:
    | { token: string; refreshToken: string }
    | string = yield call(callApi, {
    method: 'POST',
    path: 'refresh',
    payload,
  })
  if (typeof refreshResult === 'string') {
    yield put(logoutAction())
  } else {
    yield put(refreshTokenAction(refreshResult))
  }
}

export function* userWatcher(): Generator<StrictEffect> {
  yield takeEvery(actionTypes.FETCH_REGISTER, registerWorker)
  yield takeEvery(actionTypes.FETCH_LOGIN, loginWorker)
  yield takeEvery(actionTypes.FETCH_LOGOUT, logoutWorker)
  yield takeEvery(actionTypes.FETCH_REFRESH_TOKEN, refreshTokenWorker)
}
