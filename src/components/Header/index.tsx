import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Header.module.css'
import { callApi } from '../../Api/callApi'

const Header: React.FC<{
  titleNavBar: string
}> = ({ titleNavBar }): JSX.Element => {
  const navigate = useNavigate()
  const logout = useCallback(async () => {
    await callApi({
      method: 'POST',
      path: 'auth/logout',
    })
    localStorage.removeItem('token')
    localStorage.removeItem('refreshToken')
    navigate('/login', { replace: true })
  }, [navigate])
  const navigateToPage = useCallback(() => {
    if (titleNavBar === 'exit') {
      logout()
    } else {
      navigate(`/${titleNavBar}`)
    }
  }, [logout, navigate, titleNavBar])
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
