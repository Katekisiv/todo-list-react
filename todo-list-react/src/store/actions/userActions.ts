import {
  actionTypes,
  LoginAction,
  LogoutAction,
  RefreshTokenAction,
  RegisterAction,
} from '../../constants/actionTypes'

export const registerRequestAction = (payload: {
  email: string
  password: string
}): RegisterAction => {
  return {
    type: actionTypes.REGISTER_REQUEST,
    payload,
  }
}

export const registerSuccessAction = (payload: {
  token: string
  refreshToken: string
}): RegisterAction => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload,
  }
}

export const registerFailedAction = (payload: {
  errorType: string
  errorMessage: string
}): RegisterAction => {
  return {
    type: actionTypes.REGISTER_FAILED,
    payload,
  }
}

export const loginRequestAction = (payload: {
  email: string
  password: string
}): LoginAction => {
  return {
    type: actionTypes.LOGIN_REQUEST,
    payload,
  }
}

export const loginSuccessAction = (payload: {
  token: string
  refreshToken: string
}): LoginAction => {
  return {
    type: actionTypes.LOGIN_SUCCESS,
    payload,
  }
}

export const loginFailedAction = (payload: {
  errorType: string
  errorMessage: string
}): RegisterAction => {
  return {
    type: actionTypes.REGISTER_FAILED,
    payload,
  }
}

export const logoutRequestAction = (): LogoutAction => {
  return {
    type: actionTypes.LOGOUT_REQUEST,
  }
}

export const logoutSuccessAction = (): LogoutAction => {
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  }
}

export const refreshTokenRequestAction = (payload: {
  refreshToken: string
}): RefreshTokenAction => {
  return {
    type: actionTypes.REFRESH_TOKEN_REQUEST,
    payload,
  }
}

export const refreshTokenSuccessAction = (payload: {
  token: string
  refreshToken: string
}): RefreshTokenAction => {
  return {
    type: actionTypes.REFRESH_TOKEN_SUCCESS,
    payload,
  }
}
