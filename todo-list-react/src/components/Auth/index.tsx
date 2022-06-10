import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { Form, Field, FieldMetaState } from 'react-final-form'
import { useDispatch } from 'react-redux'
import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import {
  loginValidationSchema,
  registrationValidationSchema,
} from '../../constants/validationSchema'
import {
  StyledLoginButton,
  StyledLoginPage,
  StyledLoginPageTopic,
  StyledLoginForm,
  StyledLoginUserInput,
  StyledUserDataError,
  StyledUserSex,
  StyledUserSexOption,
  StyledUserBirthday,
} from './Auth.style'
import { reach } from 'yup'
import {
  loginRequestAction,
  registerRequestAction,
} from '../../store/actions/userActions'

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
  const dispatch = useDispatch()
  const { token, refreshToken, error } = useTypedSelectors(
    (state) => state.user
  )
  const navigate = useNavigate()
  const location = useLocation() as LocationState
  const fromPage = location.state?.from.page || '/'

  const saveAuthData = useCallback((): void => {
    if (typeof token === 'string') {
      localStorage.setItem('token', token)
    }

    if (typeof refreshToken === 'string') {
      localStorage.setItem('refreshToken', refreshToken)
    }
    navigate(fromPage, { replace: true })
  }, [fromPage, navigate, refreshToken, token])

  const loginUser = useCallback(
    async (payload: { email: string; password: string }) => {
      dispatch(loginRequestAction(payload))
      if (error && error.errorType) {
        return {
          [error.errorType]: error.errorMessage,
        }
      }
      saveAuthData()
    },
    [dispatch, error, saveAuthData]
  )

  const registerUser = useCallback(
    async (payload: { email: string; password: string }) => {
      dispatch(registerRequestAction(payload))
      if (error && error.errorType) {
        return {
          [error.errorType]: error.errorMessage,
        }
      }
      saveAuthData()
    },
    [dispatch, error, saveAuthData]
  )

  const auth = async (values: any) => {
    if (page === 'login') {
      await loginUser({
        email: values.email,
        password: values.password,
      })
      return throwError()
    } else {
      await registerUser({
        email: values.email,
        password: values.password,
      })
      return throwError()
    }
  }

  const validate = (name: string, schema: any, context = {}) => (
    value: any,
    allValues: any,
    meta: FieldMetaState<any> | undefined
  ) => {
    return reach(schema, name)
      .validate(value, {
        context: {
          allValues,
          meta,
          ...context,
        },
      })
      .then(() => {})
      .catch((err: any) => {
        return err.errors && err.errors[0]
      })
  }

  const validateAll = useCallback(
    async (values: any) => {
      if (page === 'login') {
        return loginValidationSchema
          .validate(values)
          .then(() => {})
          .catch((err) => {
            return { [err.path]: err.errors[0] }
          })
      } else if (page === 'registration') {
        return registrationValidationSchema
          .validate(values)
          .then(() => {})
          .catch((err) => {
            return { [err.path]: err.errors[0] }
          })
      }
    },
    [page]
  )

  const throwError = useCallback(() => {
    if (error.errorType) {
      console.log(error)
      return {
        [error.errorType]: error.errorMessage,
      }
    }
  }, [error])

  return (
    <StyledLoginPage>
      <StyledLoginPageTopic>{page}</StyledLoginPageTopic>
      <Form
        onSubmit={auth}
        validate={validateAll}
        render={({ handleSubmit, submitError }) => (
          <StyledLoginForm onSubmit={handleSubmit}>
            {page === 'registration' ? (
              <>
                <Field
                  name="firstName"
                  type="text"
                  validate={validate('firstName', registrationValidationSchema)}
                >
                  {({ input, meta }) => (
                    <>
                      <StyledLoginUserInput
                        name={input.name}
                        type={input.type}
                        value={input.value}
                        onChange={input.onChange}
                        placeholder="First name"
                      />
                      {meta.touched && (meta.error || meta.submitError) && (
                        <StyledUserDataError>
                          {meta.error || meta.submitError}
                        </StyledUserDataError>
                      )}
                    </>
                  )}
                </Field>
                <Field
                  name="lastName"
                  type="text"
                  validate={validate('lastName', registrationValidationSchema)}
                >
                  {({ input, meta }) => (
                    <>
                      <StyledLoginUserInput
                        name={input.name}
                        type={input.type}
                        value={input.value}
                        onChange={input.onChange}
                        placeholder="Last name"
                      />
                      {meta.touched && (meta.error || meta.submitError) && (
                        <StyledUserDataError>
                          {meta.error || meta.submitError}
                        </StyledUserDataError>
                      )}
                    </>
                  )}
                </Field>
              </>
            ) : null}
            <Field
              name="email"
              type="email"
              validate={validate('email', registrationValidationSchema)}
            >
              {({ input, meta }) => (
                <>
                  <StyledLoginUserInput
                    name={input.name}
                    type={input.type}
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="Email"
                  />
                  {meta.touched && (meta.error || meta.submitError) && (
                    <StyledUserDataError>
                      {meta.error || meta.submitError}
                    </StyledUserDataError>
                  )}
                </>
              )}
            </Field>
            <Field
              name="password"
              type="password"
              validate={validate('password', registrationValidationSchema)}
            >
              {({ input, meta }) => (
                <>
                  <StyledLoginUserInput
                    name={input.name}
                    type={input.type}
                    value={input.value}
                    onChange={input.onChange}
                    placeholder="Password"
                  />
                  {meta.touched && (meta.error || meta.submitError) && (
                    <StyledUserDataError>
                      {meta.error || meta.submitError}
                    </StyledUserDataError>
                  )}
                </>
              )}
            </Field>
            {page === 'registration' ? (
              <>
                <Field
                  name="confirmPassword"
                  type="password"
                  validate={validate(
                    'confirmPassword',
                    registrationValidationSchema
                  )}
                >
                  {({ input, meta }) => (
                    <>
                      <StyledLoginUserInput
                        name={input.name}
                        type={input.type}
                        value={input.value}
                        onChange={input.onChange}
                        placeholder="Confirm password"
                      />
                      {meta.touched && (meta.error || meta.submitError) && (
                        <StyledUserDataError>
                          {meta.error || meta.submitError}
                        </StyledUserDataError>
                      )}
                    </>
                  )}
                </Field>
                <StyledUserSex>
                  Sex:
                  <StyledUserSexOption>
                    Male
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="male"
                    />
                  </StyledUserSexOption>
                  <StyledUserSexOption>
                    Female
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="female"
                    />
                  </StyledUserSexOption>
                  <StyledUserSexOption>
                    Others
                    <Field
                      name="sex"
                      component="input"
                      type="radio"
                      value="others"
                    />
                  </StyledUserSexOption>
                </StyledUserSex>
                <StyledUserBirthday>
                  Birthday:
                  <Field
                    name="date"
                    type="date"
                    validate={validate(
                      'birthday',
                      registrationValidationSchema
                    )}
                  >
                    {({ input, meta }) => (
                      <>
                        <input
                          name={input.name}
                          type={input.type}
                          value={input.value}
                          onChange={input.onChange}
                        />
                        {meta.touched && (meta.error || meta.submitError) && (
                          <StyledUserDataError>
                            {meta.error || meta.submitError}
                          </StyledUserDataError>
                        )}
                      </>
                    )}
                  </Field>
                </StyledUserBirthday>
              </>
            ) : null}
            {submitError && <div>{submitError}</div>}
            <StyledLoginButton type="submit">{page}</StyledLoginButton>
          </StyledLoginForm>
        )}
      />
    </StyledLoginPage>
  )
}

export default Auth
