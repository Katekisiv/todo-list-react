import React, { useCallback, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { callApi } from '../../Api/callApi'
import { CHECK_EMAIL, CHECK_PASSWORD } from '../../constants/regularExpressions'
import { useStore } from '../../hooks/userReducer'
import { actionTypes } from '../../constants/actionTypes'
import {
  StyledLoginButton,
  StyledLoginPage,
  StyledLoginPageTopic,
  StyledLoginUserData,
  StyledLoginUserInput,
  StyledUserDataError,
} from './Auth.style'

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
  const { dispatch } = useStore()

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
      navigate(fromPage, { replace: true })
      if (dispatch) {
        dispatch({
          type: actionTypes.LOGIN,
          payload: { token },
        })
      }
    },
    [dispatch, fromPage, navigate]
  )

  const checkInputData = useCallback((): boolean => {
    if (!CHECK_EMAIL.test(email.toLowerCase())) {
      setError({
        errorType: 'email',
        error: 'Wrong email',
      })
      return false
    }

    if (!CHECK_PASSWORD.test(password.trim())) {
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

  const setUserEmail = useCallback((event: ChangeEvent): void => {
    setEmail(event.target.value)
  }, [])

  const setUserPassword = useCallback((event: ChangeEvent): void => {
    setPassword(event.target.value)
  }, [])

  const setUserConfirmPassword = useCallback((event: ChangeEvent): void => {
    setConfirmPassword(event.target.value)
  }, [])

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

  const auth = useCallback(async (): Promise<void> => {
    if (page === 'login') {
      await loginUser()
    } else {
      await registerUser()
    }
  }, [loginUser, page, registerUser])

  return (
    <StyledLoginPage>
      <StyledLoginPageTopic>{page}</StyledLoginPageTopic>
      <StyledLoginUserData>
        <StyledLoginUserInput
          type="email"
          value={email}
          onChange={setUserEmail}
          placeholder="Email"
        />
        {error.errorType === 'email' ? (
          <StyledUserDataError>{error.error}</StyledUserDataError>
        ) : null}
        <StyledLoginUserInput
          type="password"
          value={password}
          onChange={setUserPassword}
          placeholder="Password"
        />
        {error.errorType === 'password' ? (
          <StyledUserDataError>{error.error}</StyledUserDataError>
        ) : null}
        {page === 'registration' ? (
          <StyledLoginUserInput
            type="password"
            value={confirmPassword}
            onChange={setUserConfirmPassword}
            placeholder="Confirm password"
          />
        ) : null}
      </StyledLoginUserData>
      <StyledLoginButton type="submit" onClick={auth}>
        {page}
      </StyledLoginButton>
    </StyledLoginPage>
  )
}

export default Auth
