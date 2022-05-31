import { styled } from '@mui/material/styles'
import { Button, InputBase, InputLabel } from '@mui/material'
import CompletedTodo from '../../Images/done.svg'
import {
  MuiBaseInputProps,
  MuiButtonProps,
  MuiInputLabelProps,
  SectionProps,
} from '../../../constants/types'

export const StyledNewTodo = styled((props: SectionProps) => (
  <section {...props} />
))`
  margin-top: 10px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.palette.common.white};
  border-radius: 10px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  padding: 5px 20px;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
`

export const StyledNewTodoLabel = styled(
  (props: MuiInputLabelProps & { completed: boolean }) => (
    <InputLabel {...props} />
  )
)`
  width: 22px;
  height: 22px;
  border: 1px solid ${(props) => props.theme.palette.secondary.accentLine};
  border-radius: 50%;
  cursor: pointer;
  background-image: ${(props) =>
    props.completed
      ? `url(${CompletedTodo}), linear-gradient(90deg, rgba(32,110,250,1) 28%, rgba(84,32,205,1) 70%, rgba(84,44,153,1) 100%)`
      : 'none'};
  background-size: ${(props) => (props.completed ? 'cover' : 'none')};
  border-color: ${(props) =>
    props.completed ? props.theme.palette.accent.main : 'none'};
  border-right-color: ${(props) =>
    props.completed ? props.theme.palette.accent.darker : 'none'};

  & .MuiInputBase-root {
    display: none;
  }
`

export const StyledNewTodoInput = styled((props: MuiBaseInputProps) => (
  <InputBase {...props} />
))`
  display: block;
  background-color: inherit;
  border: none;
  outline: none;
  padding: 13px 35px 13px 20px;
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  border-radius: 10px;
  font-family: inherit;

  & .MuiInputBase-input {
    padding: 0;
  }
`

export const StyledNewTodoButton = styled((props: MuiButtonProps) => (
  <Button {...props} />
))`
  position: absolute;
  top: 50%;
  left: 88%;
  transform: translate(0, -50%);
  z-index: 9;

  :hover {
    cursor: pointer;
    fill: ${(props) => props.theme.palette.common.green};
    background-color: transparent;
  }
`
