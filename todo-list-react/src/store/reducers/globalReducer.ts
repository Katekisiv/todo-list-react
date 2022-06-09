import { actionTypes, LoadingAction } from '../../constants/actionTypes'

export interface GlobalState {
  isLoading: boolean
}

const initialState: GlobalState = {
  isLoading: false,
}

export const globalReducer = (
  state = initialState,
  action: LoadingAction
): GlobalState => {
  switch (action.type) {
    case actionTypes.LOADING:
      return { isLoading: action.payload.isLoading }
    default:
      return state
  }
}
