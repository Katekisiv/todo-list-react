import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { CloseIcon } from '../../Icons'
import styles from './Todo.module.css'

interface Todo {
  id: number
  userId: number
  value: string
  completed: boolean
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type KeyEvent = React.KeyboardEvent<HTMLInputElement>

const Todo: React.FC<{
  todo: Todo
  completeTodo: (id: number, completed: boolean) => Promise<void>
  updateTodo: (id: number, value: string) => Promise<void>
  deleteTodo: (id: number) => Promise<void>
}> = ({ todo, completeTodo, updateTodo, deleteTodo }): JSX.Element => {
  const [readOnly, setReadOnly] = useState<boolean>(true)
  const [todoValue, setTodoValue] = useState<string>(todo.value)
  const [onEnter, setOnEnter] = useState<boolean>(false)

  const completeTodoValue = useCallback(async (): Promise<void> => {
    await completeTodo(todo.id, !todo.completed)
  }, [completeTodo, todo.completed, todo.id])

  const deleteTodoItem = useCallback(async (): Promise<void> => {
    await deleteTodo(todo.id)
  }, [deleteTodo, todo.id])

  const updateTodoValue = useCallback((event: ChangeEvent): void => {
    setTodoValue(event.target.value)
  }, [])

  const updateTodoItem = useCallback(async (): Promise<void> => {
    setReadOnly(true)
    await updateTodo(todo.id, todoValue)
  }, [todo.id, todoValue, updateTodo])

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
    <li className={styles.todo}>
      <div
        className={classNames(
          styles.todoComplete,
          todo.completed ? styles.todoCompleteChecked : null
        )}
        onClick={completeTodoValue}
      />
      <input
        type="text"
        className={classNames(
          styles.todoInput,
          styles.inputField,
          todo.completed ? styles.todoValueCompleted : null
        )}
        readOnly={readOnly}
        value={todoValue}
        onChange={updateTodoValue}
        onDoubleClick={makeEditable}
        onKeyDown={checkEnterEvent}
        onBlur={onBlur}
      />
      <button
        type="button"
        className={classNames(styles.todoButton, styles.todoButtonDelete)}
        onClick={deleteTodoItem}
      >
        <CloseIcon height={22} width={22} viewBox="0 0 48 48" />
      </button>
    </li>
  )
}

export default Todo
