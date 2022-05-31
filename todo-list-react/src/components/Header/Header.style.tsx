import { styled } from '@mui/material/styles'
import BackgroundImage from '../Images/background.jpg'
import { Button } from '@mui/material'
import {
  DivProps,
  HeaderProps,
  HeadingProps,
  MuiButtonProps,
  NavProps,
} from '../../constants/types'

export const StyledHeader = styled((props: HeaderProps) => (
  <header {...props} />
))`
  height: 200px;
  text-align: center;
  background-image: url(${BackgroundImage});
  background-size: cover;
`

export const StyledNavigation = styled((props: NavProps) => <nav {...props} />)`
  max-width: 500px;
  margin-right: auto;
  margin-left: auto;
  padding-top: 20px;
  padding-right: 20px;
  display: flex;
  justify-content: flex-end;
  font-size: 20px;
`

export const StyledNavigationButton = styled((props: MuiButtonProps) => (
  <Button {...props} />
))`
  padding: 0 10px;
  color: ${(props) => props.theme.palette.common.white};
  cursor: pointer;
  text-transform: capitalize;
  text-decoration: none;
  font-family: inherit;
  font-size: inherit;

  :not(:last-child) {
    border-right: 1px solid ${(props) => props.theme.palette.common.white};
  }
`

export const StyledContainer = styled((props: DivProps) => <div {...props} />)`
  width: 500px;
  padding: 20px;
  margin-right: auto;
  margin-left: auto;
`

export const StyledHeaderTitle = styled((props: HeadingProps) => (
  <h1 {...props} />
))`
  margin-top: 20px;
  text-align: left;
  text-transform: uppercase;
  letter-spacing: 10px;
  color: ${(props) => props.theme.palette.common.white};
`
