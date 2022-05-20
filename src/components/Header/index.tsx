import React from 'react'
import styles from './Header.module.css'

const Header: React.FC<{ titleNavBar: string }> = ({
  titleNavBar,
}): JSX.Element => {
  return (
    <header className={styles.header}>
      <nav className={styles.navigation}>
        <button type="button" className={styles.navigation__button}>
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
