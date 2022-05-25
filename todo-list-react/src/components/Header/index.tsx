import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { callApi } from '../../Api/callApi'
import { useAuth } from '../../hooks/useAuth'

const Header: React.FC<{
  titleNavBar: string
  removeRefreshToken?: () => void
}> = ({ titleNavBar, removeRefreshToken }): JSX.Element => {
  const { logout } = useAuth()

  const navigate = useNavigate()

  const logoutUser = useCallback(async () => {
    await callApi({
      method: 'POST',
      path: 'auth/logout',
    })

    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    logout(() => navigate('/login', { replace: true }))
  }, [logout, navigate])

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
