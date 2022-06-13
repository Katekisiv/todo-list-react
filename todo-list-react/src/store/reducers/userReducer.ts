import { actionTypes, UserAction } from '../../constants/actionTypes'

export interface UserState {
  isAuth: boolean
  token: string | null
  refreshToken: string | null
  error: { errorType: string | null; errorMessage: string | null }
}

const initialState: UserState = {
  isAuth: Boolean(localStorage.getItem('token')),
  token: localStorage.getItem('token'),
  refreshToken: localStorage.getItem('refreshToken'),
  error: {
    errorType: null,
    errorMessage: null,
  },
}

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: {
          errorType: null,
          errorMessage: null,
        },
      }

    case actionTypes.REGISTER_FAILED:
      return {
        isAuth: false,
        token: null,
        refreshToken: null,
        error: {
          errorType: action.payload.errorType,
          errorMessage: action.payload.errorMessage,
        },
      }

    case actionTypes.LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: {
          errorType: null,
          errorMessage: null,
        },
      })

    case actionTypes.LOGIN_FAILED:
      return Object.assign({}, state, {
        isAuth: false,
        token: null,
        refreshToken: null,
        error: {
          errorType: action.payload.errorType,
          errorMessage: action.payload.errorMessage,
        },
      })

    case actionTypes.LOGOUT_SUCCESS:
      return {
        isAuth: false,
        token: null,
        refreshToken: null,
        error: {
          errorType: null,
          errorMessage: null,
        },
      }

    case actionTypes.REFRESH_TOKEN_SUCCESS:
      return {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        error: {
          errorType: null,
          errorMessage: null,
        },
      }

    default:
      return state
  }
}
