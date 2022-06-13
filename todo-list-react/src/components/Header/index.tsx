import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  StyledContainer,
  StyledHeader,
  StyledHeaderTitle,
  StyledNavigation,
  StyledNavigationButton,
} from './Header.style'
import { useDispatch } from 'react-redux'
import { logoutRequestAction } from '../../store/actions/userActions'

const Header: React.FC<{
  titleNavBar: string
  removeRefreshToken?: () => void
}> = ({ titleNavBar, removeRefreshToken }): JSX.Element => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutUser = useCallback(async () => {
    dispatch(logoutRequestAction())
    navigate('/login', { replace: true })
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
