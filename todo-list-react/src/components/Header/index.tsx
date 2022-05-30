import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { callApi } from '../../Api/callApi'
import { useStore } from '../../hooks/userReducer'
import { actionTypes } from '../../constants/actionTypes'
import {
  StyledContainer,
  StyledHeader,
  StyledHeaderTitle,
  StyledNavigation,
  StyledNavigationButton,
} from './Header.style'

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
      dispatch({ type: actionTypes.LOGOUT })
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
    <StyledHeader>
      <StyledNavigation>
        <StyledNavigationButton type="button" onClick={navigateToPage}>
          {titleNavBar}
        </StyledNavigationButton>
      </StyledNavigation>
      <StyledContainer>
        <StyledHeaderTitle>Todo</StyledHeaderTitle>
      </StyledContainer>
    </StyledHeader>
  )
}

export default Header
