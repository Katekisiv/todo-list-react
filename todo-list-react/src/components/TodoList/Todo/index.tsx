import React, { useCallback, useState } from 'react'
import { CloseIcon } from '../../Icons'
import {
  StyledTodoComplete,
  StyledTodoInput,
  StyledTodoItem,
} from './Todo.style'
import { ListItemButton, ListItemIcon } from '@mui/material'
import { useDispatch } from 'react-redux'
import {
  completeTodoRequestAction,
  deleteTodoRequestAction,
  updateTodoRequestAction,
} from '../../../store/actions/todoActions'
import { TodoItem } from '../../../constants/todoTypes'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>
type KeyEvent = React.KeyboardEvent<HTMLInputElement>

const Todo: React.FC<{
  todo: TodoItem
}> = ({ todo }): JSX.Element => {
  const { id, value, completed } = todo
  const dispatch = useDispatch()
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [todoValue, setTodoValue] = useState<string>(value)
  const [onEnter, setOnEnter] = useState<boolean>(false)

  const completeTodoValue = useCallback(async (): Promise<void> => {
    dispatch(completeTodoRequestAction({ id, completed: !completed }))
  }, [completed, dispatch, id])

  const deleteTodoItem = useCallback(async (): Promise<void> => {
    dispatch(deleteTodoRequestAction({ id }))
  }, [dispatch, id])

  const updateTodoValue = useCallback((event: ChangeEvent): void => {
    setTodoValue(event.target.value)
  }, [])

  const updateTodoItem = useCallback(async (): Promise<void> => {
    setReadOnly(true)
    dispatch(updateTodoRequestAction({ id, value: todoValue }))
  }, [dispatch, id, todoValue])

  const makeEditable = useCallback((): void => {
    setReadOnly(false)
  }, [])

  const onBlur = useCallback(async (): Promise<void> => {
    if (onEnter) {
      setOnEnter(false)
      return
    }
    await updateTodoItem()
  }, [onEnter, updateTodoItem])

  const checkEnterEvent = useCallback(
    async (event: KeyEvent): Promise<void> => {
      if (event.key === 'Enter') {
        setOnEnter(true)
        await updateTodoItem()
      }
    },
    [updateTodoItem]
  )

  return (
    <StyledTodoItem>
      <StyledTodoComplete completed={completed} onClick={completeTodoValue} />
      <StyledTodoInput
        type="text"
        completed={completed}
        readOnly={readOnly}
        value={todoValue}
        onChange={updateTodoValue}
        onDoubleClick={makeEditable}
        onKeyDown={checkEnterEvent}
        onBlur={onBlur}
      />
      <ListItemButton onClick={deleteTodoItem}>
        <ListItemIcon>
          <CloseIcon height={22} width={22} viewBox="0 0 48 48" />
        </ListItemIcon>
      </ListItemButton>
    </StyledTodoItem>
  )
}

export default Todo
