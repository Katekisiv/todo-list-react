import React, { useCallback, useState } from 'react'
import { AddIcon } from '../../Icons'
import {
  StyledNewTodo,
  StyledNewTodoButton,
  StyledNewTodoInput,
  StyledNewTodoLabel,
} from './NewTodo.style'
import { InputBase } from '@mui/material'
import { useDispatch } from 'react-redux'
import { createTodoRequestAction } from '../../../store/actions/todoActions'

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type KeyEvent = React.KeyboardEvent<HTMLInputElement>

const NewTodo: React.FC = (): JSX.Element => {
  const dispatch = useDispatch()
  const [value, setValue] = useState<string>('')
  const [completed, setCompleted] = useState<boolean>(false)

  const addTodo = useCallback(async (): Promise<void> => {
    if (!value) {
      return
    }
    const newTodo = {
      value,
      completed,
    }
    dispatch(createTodoRequestAction(newTodo))
    setValue('')
    setCompleted(false)
  }, [completed, dispatch, value])

  const setTodoValue = useCallback((event: ChangeEvent): void => {
    setValue(event.target.value)
  }, [])

  const setTodoComplete = useCallback((event: ChangeEvent): void => {
    setCompleted(event.target.checked)
  }, [])

  const checkEnter = useCallback(
    async (event: KeyEvent): Promise<void> => {
      if (event.key === 'Enter') {
        await addTodo()
      }
    },
    [addTodo]
  )

  return (
    <StyledNewTodo>
      <StyledNewTodoLabel completed={completed}>
        <InputBase type="checkbox" onChange={setTodoComplete} />
      </StyledNewTodoLabel>
      <StyledNewTodoInput
        type="text"
        value={value}
        onChange={setTodoValue}
        onKeyDown={checkEnter}
      />
      <StyledNewTodoButton type="button" onClick={addTodo}>
        <AddIcon viewBox="0 0 48 48" height={22} width={22} />
      </StyledNewTodoButton>
    </StyledNewTodo>
  )
}

export default NewTodo
