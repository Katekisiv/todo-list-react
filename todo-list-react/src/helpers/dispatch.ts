import { UserAction } from '../constants/actionTypes'

export const createAsyncAction = async (
  dispatch: Function,
  action: UserAction
): Promise<any> =>
  await new Promise((resolve, reject) =>
    dispatch({
      ...action,
      next: (data: any, err?: string | null) => {
        if (err) {
          reject(err)
        }

        resolve(data as any)
      },
    })
  )
