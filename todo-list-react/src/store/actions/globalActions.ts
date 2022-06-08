import { actionTypes, LoadingAction } from '../../constants/actionTypes'

export const loadingAction = (payload: {
  isLoading: boolean
}): LoadingAction => {
  return {
    type: actionTypes.LOADING,
    payload,
  }
}
