import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './Auth.module.css'
import { callApi } from '../../Api/callApi'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type Error = {
  errorType: string
  error: string
}

interface LocationState {
  state: {
    from: {
      page: string
    }
  }
}

const Auth: React.FC<{ page: 'login' | 'registration' }> = ({
  page,
}): JSX.Element => {
  const navigate = useNavigate()
  const location = useLocation() as LocationState
  const fromPage = location.state?.from.page || '/'

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<Error>({
    errorType: '',
    error: '',
  })

  const saveAuthData = useCallback(
    (token: string, refreshToken: string): void => {
      localStorage.setItem('token', token)
      localStorage.setItem('refreshToken', refreshToken)
      navigate(fromPage)
    },
    [fromPage, navigate]
  )

  const checkInputData = useCallback((): boolean => {
    if (
      !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email.toLowerCase()
      )
    ) {
      setError({
        errorType: 'email',
        error: 'Wrong email',
      })
      return false
    }
    if (!/^[a-zA-Zа-яА-Я0-9]{8,}$/.test(password.trim())) {
      setError({
        errorType: 'password',
        error: 'Password must have at least 8 symbols',
      })
      return false
    }
    if (page === 'registration' && password !== confirmPassword) {
      setError({
        errorType: 'password',
        error: 'Passwords are not similar',
      })
      return false
    }
    return true
  }, [confirmPassword, email, page, password])

  const setUsersData = (event: ChangeEvent): void => {
    // eslint-disable-next-line default-case
    switch (event.target.type) {
      case 'email':
        setEmail(event.target.value)
        break
      case 'password':
        if (event.target.placeholder === 'Password') {
          setPassword(event.target.value)
          break
        } else {
          setConfirmPassword(event.target.value)
          break
        }
    }
  }

  const loginUser = useCallback(async () => {
    if (!checkInputData()) {
      return
    }
    const loginResult = await callApi({
      method: 'POST',
      path: 'auth/login',
      payload: {
        email,
        password,
      },
    })
    if (typeof loginResult === 'string' && loginResult.startsWith('error')) {
      if (loginResult === 'error:User not found') {
        setError({
          errorType: 'email',
          error: 'User not found',
        })
      } else {
        setError({
          errorType: 'password',
          error: 'Wrong password',
        })
      }
      return
    }
    saveAuthData(loginResult.token, loginResult.refreshToken)
  }, [checkInputData, email, password, saveAuthData])

  const registerUser = useCallback(async () => {
    if (!checkInputData()) {
      return
    }
    const registerResult = await callApi({
      method: 'POST',
      path: 'auth/registration',
      payload: {
        email,
        password,
      },
    })
    if (
      typeof registerResult === 'string' &&
      registerResult.startsWith('error')
    ) {
      setError({
        errorType: 'email',
        error: registerResult.substr(registerResult.indexOf(':') + 1),
      })
      return
    }
    saveAuthData(registerResult.token, registerResult.refreshToken)
  }, [checkInputData, email, password, saveAuthData])

  const auth = useCallback(
    async (event): Promise<void> => {
      event.preventDefault()
      if (page === 'login') {
        await loginUser()
      } else {
        await registerUser()
      }
    },
    [loginUser, page, registerUser]
  )

  return (
    <div className={classNames(styles.mainContainer, styles.loginPage)}>
      <h1 className={styles.loginPageTopic}>{page}</h1>
      <section className={styles.userData}>
        <input
          type="email"
          value={email}
          onChange={setUsersData}
          className={styles.userDataInput}
          placeholder="Email"
        />
        {error.errorType === 'email' ? (
          <div className={styles.userDataError}>{error.error}</div>
        ) : null}
        <input
          type="password"
          value={password}
          onChange={setUsersData}
          className={styles.userDataInput}
          placeholder="Password"
        />
        {error.errorType === 'password' ? (
          <div className={styles.userDataError}>{error.error}</div>
        ) : null}
        {page === 'registration' ? (
          <input
            type="password"
            value={confirmPassword}
            onChange={setUsersData}
            className={styles.userDataInput}
            placeholder="Confirm password"
          />
        ) : null}
      </section>
      <button type="submit" className={styles.loginButton} onClick={auth}>
        {page}
      </button>
    </div>
  )
}

export default Auth
