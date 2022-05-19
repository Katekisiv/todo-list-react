import React from 'react'
import classNames from 'classnames'
import styles from './Auth.module.css'

const Auth: React.FC<{ page: 'login' | 'registration' }> = ({
  page,
}): JSX.Element => {
  return (
    <div className={classNames(styles.mainContainer, styles.loginPage)}>
      <h1 className={styles.loginPageTopic}>Login</h1>
      <section className={styles.userData}>
        <input
          type="email"
          className={styles.userDataInput}
          placeholder="Email"
        />
        <input
          type="password"
          className={styles.userDataInput}
          placeholder="Password"
        />
        {page === 'registration' ? (
          <input
            type="password"
            className={styles.userDataInput}
            placeholder="Confirm password"
          />
        ) : null}
      </section>
      <button type="button" className={styles.loginButton}>
        {page}
      </button>
    </div>
  )
}

export default Auth
