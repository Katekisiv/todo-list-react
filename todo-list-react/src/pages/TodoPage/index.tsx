import React, {useCallback, useEffect, useState} from 'react'
import classNames from 'classnames'
import {useLocation, Navigate} from 'react-router-dom'
import Header from '../../components/Header'
import styles from './TodoPage.module.css'
import TodoList from '../../components/TodoList'
import {useDispatch} from 'react-redux'
import {useTypedSelectors} from '../../hooks/useTypedSelectors'
import {refreshTokenRequestAction} from '../../store/actions/userActions'
import {createAsyncAction} from '../../helpers/dispatch'

const TodoPage: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const {error, refreshToken} = useTypedSelectors((state) => state.user)
  const location = useLocation()
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>()

  const removeRefreshToken = useCallback((): void => {
    clearInterval(intervalId)
  }, [intervalId])

  const refresh = useCallback(async (): Promise<boolean> => {
    try {
      await createAsyncAction(
        dispatch,
        refreshTokenRequestAction({refreshToken})
      )
      return true
    } catch (error: any) {
      removeRefreshToken()
      return false
    }
  }, [dispatch, refreshToken, removeRefreshToken])

  const setRefreshToken = useCallback(async (): Promise<void> => {
    removeRefreshToken()
    if (await refresh()) {
      setIntervalId(setInterval(refresh, 5000))
    }
  }, [refresh, removeRefreshToken])

  useEffect(() => {
    setRefreshToken()
  }, [])

  return error.errorMessage ? (
    <Navigate to="/login" state={{from: location}}/>
  ) : (
    <>
      <Header titleNavBar="exit" removeRefreshToken={removeRefreshToken}/>
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <TodoList/>
        </div>
      </main>
    </>
  )
}

export default TodoPage
