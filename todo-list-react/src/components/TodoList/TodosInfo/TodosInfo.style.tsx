import { styled } from '@mui/material/styles'
import { DivProps, MuiButtonProps } from '../../../constants/types'
import { Button } from '@mui/material'

export const StyledTodosInfo = styled((props: DivProps) => <div {...props} />)`
  padding: 20px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: baseline;
`

export const StyledTodosInfoStatus = styled((props: DivProps) => (
  <div {...props} />
))`
  display: flex;
  gap: 15px;

  span:hover {
    color: ${(props) => props.theme.palette.common.black};
    cursor: pointer;
  }
`

export const StyledDeleteCompletedTodos = styled((props: MuiButtonProps) => (
  <Button {...props} />
))`
  color: ${(props) => props.theme.palette.secondary.accentLine};
  font-family: inherit;
  text-transform: capitalize;
  padding: 0;

  :hover {
    color: ${(props) => props.theme.palette.common.black};
    cursor: pointer;
    background-color: inherit;
  }
`
