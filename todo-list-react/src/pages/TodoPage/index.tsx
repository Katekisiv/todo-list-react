import React, { useCallback, useEffect, useState } from 'react'
import classNames from 'classnames'
import { useLocation, Navigate } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './TodoPage.module.css'
import TodoList from '../../components/TodoList'
import { callApi } from '../../Api/callApi'

const TodoPage: React.FC = (): JSX.Element => {
  const [error, setError] = useState<string>('')
  const location = useLocation()
  const [intervalId, setIntervalId] = useState<NodeJS.Timer | undefined>()

  const removeRefreshToken = useCallback((): void => {
    clearInterval(intervalId)
  }, [intervalId])

  const refreshToken = useCallback(async (): Promise<boolean> => {
    const refreshResult = await callApi({
      method: 'POST',
      path: 'refresh',
      payload: { refreshToken: localStorage.getItem('refreshToken') },
    })
    if (
      typeof refreshResult === 'string' &&
      refreshResult.startsWith('error')
    ) {
      removeRefreshToken()
      localStorage.removeItem('token')
      localStorage.removeItem('refreshToken')
      setError(refreshResult)
      return false
    }
    localStorage.setItem('token', refreshResult.accessToken)
    localStorage.setItem('refreshToken', refreshResult.refreshToken)
    return true
  }, [removeRefreshToken])

  const setRefreshToken = useCallback(async (): Promise<void> => {
    removeRefreshToken()
    if (await refreshToken()) {
      setIntervalId(setInterval(refreshToken, 1800000))
    }
  }, [refreshToken, removeRefreshToken])

  useEffect(() => {
    setRefreshToken()
  }, [])

  return error ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <>
      <Header titleNavBar="exit" removeRefreshToken={removeRefreshToken} />
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <TodoList />
        </div>
      </main>
    </>
  )
}

export default TodoPage
