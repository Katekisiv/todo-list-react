import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { callApi } from '../../Api/callApi'
import { useStore } from '../../hooks/AuthProvider'

const Header: React.FC<{
  titleNavBar: string
  removeRefreshToken?: () => void
}> = ({ titleNavBar, removeRefreshToken }): JSX.Element => {
  const { dispatch } = useStore()

  const navigate = useNavigate()

  const logoutUser = useCallback(async () => {
    await callApi({
      method: 'POST',
      path: 'auth/logout',
    })

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate('/login', { replace: true })
    if (dispatch) {
      dispatch({ type: 'logout' })
    }
  }, [dispatch, navigate])

  const navigateToPage = useCallback(() => {
    if (titleNavBar === 'exit') {
      if (removeRefreshToken) {
        removeRefreshToken()
      }
      logoutUser()
    } else {
      navigate(`/${titleNavBar}`)
    }
  }, [logoutUser, navigate, removeRefreshToken, titleNavBar])

  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <button
          type="button"
          className={styles.navigation__button}
          onClick={navigateToPage}
        >
          {titleNavBar}
        </button>
      </nav>
      <div className={styles.container}>
        <h1 className={styles.header__title}>Todo</h1>
      </div>
    </header>
  )
}

export default Header
