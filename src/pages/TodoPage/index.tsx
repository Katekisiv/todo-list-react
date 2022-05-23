import React, { useEffect, useState } from 'react'
import classNames from 'classnames'
import { useLocation, Navigate } from 'react-router-dom'
import Header from '../../components/Header'
import styles from './TodoPage.module.css'
import TodoList from '../../components/TodoList'
import { callApi } from '../../Api/callApi'

const TodoPage: React.FC = (): JSX.Element => {
  const [error, setError] = useState<string>('')
  const location = useLocation()
  useEffect(() => {
    let intervalId: NodeJS.Timer | undefined
    const removeRefreshToken = (): void => {
      clearInterval(intervalId)
    }
    const refreshToken = async (): Promise<boolean> => {
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
    }
    const setRefreshToken = async (): Promise<void> => {
      removeRefreshToken()
      if (await refreshToken()) {
        intervalId = setInterval(refreshToken, 3000)
      }
    }
    setRefreshToken()
  }, [])
  return error ? (
    <Navigate to="/login" state={{ from: location }} />
  ) : (
    <>
      <Header titleNavBar="exit" />
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <TodoList />
        </div>
      </main>
    </>
  )
}

export default TodoPage
