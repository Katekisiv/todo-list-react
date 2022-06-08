import {
  actionTypes,
  FetchLoginAction,
  FetchLogoutAction,
  FetchRefreshTokenAction,
  FetchRegisterAction,
  LoginAction,
  LogoutAction,
  RefreshTokenAction,
  RegisterAction,
} from '../../constants/actionTypes'

export const fetchRegisterAction = (payload: {
  email: string
  password: string
}): FetchRegisterAction => {
  return {
    type: actionTypes.FETCH_REGISTER,
    payload,
  }
}

export const registerAction = (payload: {
  token: string
  refreshToken: string
}): RegisterAction => {
  return {
    type: actionTypes.REGISTER,
    payload,
  }
}

export const fetchLoginAction = (payload: {
  email: string
  password: string
}): FetchLoginAction => {
  return {
    type: actionTypes.FETCH_LOGIN,
    payload,
  }
}

export const loginAction = (payload: {
  token: string
  refreshToken: string
}): LoginAction => {
  return {
    type: actionTypes.LOGIN,
    payload,
  }
}

export const fetchLogoutAction = (): FetchLogoutAction => {
  return {
    type: actionTypes.FETCH_LOGOUT,
  }
}

export const logoutAction = (): LogoutAction => {
  return {
    type: actionTypes.LOGOUT,
  }
}

export const fetchRefreshTokenAction = (payload: {
  refreshToken: string
}): FetchRefreshTokenAction => {
  return {
    type: actionTypes.FETCH_REFRESH_TOKEN,
    payload,
  }
}

export const refreshTokenAction = (payload: {
  token: string
  refreshToken: string
}): RefreshTokenAction => {
  return {
    type: actionTypes.REFRESH_TOKEN,
    payload,
  }
}
