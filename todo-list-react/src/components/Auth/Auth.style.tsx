import { styled } from '@mui/material/styles'
import { Button, InputBase, InputBaseProps } from '@mui/material'

import {
  DivProps,
  FormProps,
  HeadingProps,
  LabelProps,
  MuiButtonProps,
} from '../../constants/types'

export const StyledLoginPage = styled((props: DivProps) => <div {...props} />)`
  position: absolute;
  top: -100px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 460px;
  margin-top: 50px;
  margin-bottom: 20px;
  padding: 30px 50px;
  background-color: ${(props) => props.theme.palette.common.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const StyledLoginPageTopic = styled((props: HeadingProps) => (
  <h1 {...props} />
))`
  margin-bottom: 50px;
  text-align: center;
  text-transform: capitalize;
`

export const StyledLoginForm = styled((props: FormProps) => (
  <form {...props} />
))`
  display: flex;
  flex-wrap: wrap;
`

export const StyledLoginUserInput = styled((props: InputBaseProps) => (
  <InputBase {...props} />
))`
  flex: 100%;
  outline: none;
  border-top: none;
  border-right: none;
  border-left: none;
  background-color: inherit;
  font-family: inherit;
  border-bottom: 2px solid rgb(118, 118, 118);

  :not(:first-of-type) {
    margin-top: 40px;
  }
`

export const StyledLoginButton = styled((props: MuiButtonProps) => (
  <Button {...props} />
))`
  display: block;
  padding: 15px 30px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 40px;
  border-radius: 10px;
  font-family: inherit;
  color: ${(props) => props.theme.palette.common.white};
  background-image: linear-gradient(
    90deg,
    rgba(32, 110, 250, 1) 28%,
    rgba(84, 32, 205, 1) 70%,
    rgba(84, 44, 153, 1) 100%
  );
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-transform: capitalize;
  text-decoration: none;
  width: fit-content;

  :hover {
    cursor: pointer;
    box-shadow: 0 4px 8px 4px rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`

export const StyledUserSex = styled((props: DivProps) => <div {...props} />)`
  display: flex;
  flex: 100%;
  justify-content: space-between;
  margin-top: 40px;
`

export const StyledUserSexOption = styled((props: LabelProps) => (
  <label {...props} />
))`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`

export const StyledUserBirthday = styled((props: LabelProps) => (
  <label {...props} />
))`
  display: flex;
  flex: 100%;
  margin-top: 40px;
  justify-content: flex-start;
  align-items: center;
  gap: 15px;
`

export const StyledUserDataError = styled((props: DivProps) => (
  <div {...props} />
))`
  flex: 100%;
  color: ${(props) => props.theme.palette.common.red};
`
