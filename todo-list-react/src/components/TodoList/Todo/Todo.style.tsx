import { styled } from '@mui/material/styles'
import { ListItem, InputBase } from '@mui/material'
import CompletedTodo from '../../Images/done.svg'
import {
  DivProps,
  MuiBaseInputProps,
  MuiListItemProps,
} from '../../../constants/types'

export const StyledTodoItem = styled((props: MuiListItemProps) => (
  <ListItem {...props} />
))`
  padding: 5px 20px;
  display: flex;
  flex: 100%;
  border-bottom: 1px solid ${(props) => props.theme.palette.secondary.line};
  align-items: center;
  overflow-x: auto;

  :hover {
    & .MuiListItemButton-root {
      display: flex;
    }
  }

  & .MuiListItemButton-root {
    flex-grow: 0;
    display: none;
    padding: 0;
    justify-content: flex-end;

    :hover {
      padding: 0;
      justify-content: flex-end;
      cursor: pointer;
      background-color: inherit;
      fill: ${(props) => props.theme.palette.common.red};
    }
  }

  & .MuiListItemIcon-root {
    justify-content: flex-end;
  }
`

export const StyledTodoComplete = styled(
  (props: DivProps & { completed: boolean }) => <div {...props} />
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
`

export const StyledTodoInput = styled(
  (props: MuiBaseInputProps & { completed: boolean }) => (
    <InputBase {...props} />
  )
)`
  flex-grow: 1;
  background-color: inherit;
  border: none;
  outline: none;
  cursor: pointer;
  padding: 15px 20px;
  color: ${(props) =>
    props.completed
      ? props.theme.palette.secondary.accentLine
      : props.theme.palette.common.black};
  text-decoration: ${(props) => (props.completed ? 'line-through' : 'none')};
  text-decoration-thickness: ${(props) => (props.completed ? '1px' : '0')};
  user-select: ${(props) => (props.completed ? 'none' : 'text')};
  font-family: inherit;

  & .MuiInputBase-input {
    padding: 0;
  }
`
