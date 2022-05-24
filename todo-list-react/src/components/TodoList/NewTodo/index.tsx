import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { AddIcon } from '../../Icons'
import styles from './NewTodo.module.css'

interface Todo {
  value: string
  completed: boolean
}

interface Props {
  addTodoProps: (newTodo: Todo) => Promise<void>
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type KeyEvent = React.KeyboardEvent<HTMLInputElement>

const NewTodo: React.FC<Props> = ({ addTodoProps }): JSX.Element => {
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
    await addTodoProps(newTodo)
    setValue('')
    setCompleted(false)
  }, [addTodoProps, completed, value])

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
    <section className={classNames(styles.section, styles.newTodo)}>
      <label
        className={classNames(
          styles.todoComplete,
          completed ? styles.todoCompleteChecked : null
        )}
      >
        <input
          type="checkbox"
          className={styles.newTodoCheckbox}
          onChange={setTodoComplete}
        />
      </label>
      <input
        type="text"
        className={classNames(styles.inputField, styles.newTodoInput)}
        value={value}
        onChange={setTodoValue}
        onKeyDown={checkEnter}
      />
      <button type="button" className={styles.newTodoButton} onClick={addTodo}>
        <AddIcon
          className={styles.newTodoIcon}
          viewBox="0 0 48 48"
          height={22}
          width={22}
        />
      </button>
    </section>
  )
}

export default NewTodo
