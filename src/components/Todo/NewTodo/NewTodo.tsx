import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { AddIcon } from '../../Icons'
import styles from './NewTodo.module.css'

interface Todo {
  value: string
  completed: boolean
}

interface Props {
  addTodoProps: (newTodo: Todo) => void
}

type ChangeEvent = React.ChangeEvent<HTMLInputElement>

type KeyEvent = React.KeyboardEvent<HTMLInputElement>

const NewTodo: React.FC<Props> = ({ addTodoProps }): JSX.Element => {
  const [newTodoValue, setNewTodoValue] = useState<string>('')
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false)

  const addTodo = useCallback(async (): Promise<void> => {
    if (!newTodoValue) {
      return
    }
    const newTodo = {
      value: newTodoValue,
      completed: newTodoCompleted,
    }
    await addTodoProps(newTodo)
    setNewTodoValue('')
    setNewTodoCompleted(false)
  }, [addTodoProps, newTodoCompleted, newTodoValue])

  const setTodoValue = (event: ChangeEvent): void => {
    setNewTodoValue(event.target.value)
  }

  const setTodoComplete = (event: ChangeEvent): void => {
    setNewTodoCompleted(event.target.checked)
  }

  const checkEnter = async (event: KeyEvent): Promise<void> => {
    if (event.key === 'Enter') {
      await addTodo()
    }
  }
  return (
    <section className={classNames(styles.section, styles.newTodo)}>
      <label
        className={
          newTodoCompleted
            ? classNames(styles.todoComplete, styles.todoCompleteChecked)
            : styles.todoComplete
        }
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
        value={newTodoValue}
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
