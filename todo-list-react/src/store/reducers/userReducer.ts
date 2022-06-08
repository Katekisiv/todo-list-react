import { actionTypes, UserAction } from '../../constants/actionTypes'

export interface UserState {
  isAuth: boolean
  token: string | null
  refreshToken: string | null
}

const initialState: UserState = {
  isAuth: false,
  token: null,
  refreshToken: null,
}

export const userReducer = (
  state = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case actionTypes.REGISTER:
      return {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }

    case actionTypes.LOGIN:
      return {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }

    case actionTypes.LOGOUT:
      return {
        isAuth: false,
        token: null,
        refreshToken: null,
      }

    case actionTypes.REFRESH_TOKEN:
      return {
        isAuth: true,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
      }

    default:
      return state
  }
}
