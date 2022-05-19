import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import styles from './Todo.module.css'
import { callApi } from "../../Api/callApi";
import { AddIcon, CloseIcon } from "../Icons/Icons";

interface tTodo {
  id: number,
  userId: number,
  value: string,
  completed: boolean
}

interface tChangeEvent extends React.ChangeEvent<HTMLInputElement>{}
interface tKeyEvent extends React.KeyboardEvent<HTMLInputElement>{}
interface tClickEvent extends React.MouseEvent<HTMLInputElement>{}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<tTodo[]>([])
  const [newTodoValue, setNewTodoValue] = useState<string>("")
  const [newTodoCompleted, setNewTodoCompleted] = useState<boolean>(false)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [readOnly, setReadOnly] = useState<boolean>(true)

  useEffect(() => {
    (async () => {
      setTodos(await callApi({method: 'GET', path: 'todo'}))
    })();
  }, [])

  const filteredTodos: tTodo[] = useMemo(() => {
      switch (filter) {
        case "all":
          return todos.filter(todo => todo)
        case "active":
          return todos.filter(todo => !todo.completed)
        case "completed":
          return todos.filter(todo => todo.completed)
      }
  }, [filter, todos])

  const addTodo = async () => {
    if(!newTodoValue) {
      return
    }
    const newTodo = {
      value: newTodoValue,
      completed: newTodoCompleted
    }
    const createdTodo: tTodo = await callApi({method: 'POST', path: 'todo', payload: newTodo})
    setTodos(prevTodos => [...prevTodos, createdTodo])
    setNewTodoValue('')
    setNewTodoCompleted(false)
  }

  const deleteTodo = async (id: number) => {
    await callApi({method: 'DELETE', path: `todo/${id}`})
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const completeTodo = async (id: number, completed: boolean) => {
    await callApi({method: 'PATCH', path: `todo/${id}`, payload: {completed}})
    setTodos(prevTodos =>
      prevTodos.map(todo => {
        if(todo.id === id) {
          todo.completed = completed
        }
        return todo
      })
    )
  }

  const updateTodo = async (id: number, value: string) => {
    await callApi({method: 'PATCH', path: `todo/${id}`, payload: {value}})
  }

  const updateTodoValue = (event: tChangeEvent, id: number) => setTodos(prevTodos =>
    prevTodos.map(todo => {
      if(todo.id === id) {
        todo.value = event.target.value
      }
      return todo
    }))

  const deleteCompletedTodos = async () => {
    await callApi({method: 'DELETE', path: `todo?completed=true`})
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }


  return (
    <>
      <section className={classNames(styles.section, styles.newTodo)}>
        <label
          className={newTodoCompleted ?
          classNames(styles.todoComplete, styles.todoCompleteChecked): styles.todoComplete}
        >
          <input
            type="checkbox"
            className={styles.newTodoCheckbox}
            onChange={(event: tChangeEvent) => setNewTodoCompleted(event.target.checked)}
          />
        </label>
        <input
          type="text"
          className={classNames(styles.inputField, styles.newTodoInput)}
          value={newTodoValue}
          onChange={(event: tChangeEvent) => setNewTodoValue(event.target.value)}
          onKeyDown={(event: tKeyEvent) => event.key === 'Enter' ? addTodo() : null}
        />
        <button className={styles.newTodoButton} onClick={addTodo}>
          <AddIcon className={styles.newTodoIcon} viewBox="0 0 48 48"
                   height={22} width={22} />
        </button>
      </section>

      <section className={styles.section}>
        <ul className={styles.todos}>
          {filteredTodos.map(todo => (
            <li key={todo.id} className={styles.todo}>
              <div
                className={todo.completed ?
                  classNames(styles.todoComplete, styles.todoCompleteChecked) : styles.todoComplete}
                onClick={() => completeTodo(todo.id, !todo.completed)}
              />
              <input
                type="text"
                className={todo.completed?
                  classNames(styles.todoInput, styles.inputField, styles.todoValueCompleted)
                  : classNames(styles.todoInput, styles.inputField)}
                readOnly={readOnly}
                value={todo.value}
                onChange={(event: tChangeEvent) => updateTodoValue(event, todo.id)}
                onClick={(event: tClickEvent) => {
                  if(event.detail === 2) {
                    return setReadOnly(false)
                  }
                }}
                onKeyDown={(event: tKeyEvent) => {
                  if(event.key === 'Enter') {
                    setReadOnly(true)
                    updateTodo(todo.id, todo.value)
                  }
                }}
                onBlur={() => {
                  setReadOnly(true)
                  updateTodo(todo.id, todo.value)
                }}
              />
              <button
                className={classNames(styles.todoButton, styles.todoButtonDelete)}
                onClick={() => deleteTodo(todo.id)}
              >
                <CloseIcon height={22} width={22} viewBox="0 0 48 48" />
              </button>
            </li>
          ))}
        </ul>

        <div className={styles.todosInfo}>
          <span>{filteredTodos.length} items left</span>
          <div className={styles.todosInfoStatus}>
            <span
              className={filter === 'all' ?
                classNames(styles.todosInfoOption, styles.todosInfoStatusActive) : styles.todosInfoOption}
              onClick={() => setFilter( 'all')}
            >
              All
            </span>
            <span
              className={filter === 'active' ?
                classNames(styles.todosInfoOption, styles.todosInfoStatusActive) : styles.todosInfoOption}
              onClick={() => setFilter('active')}
            >
              Active
            </span>
            <span
              className={filter === 'completed' ?
                classNames(styles.todosInfoOption, styles.todosInfoStatusActive) : styles.todosInfoOption}
              onClick={() => setFilter('completed')}
            >
              Completed
            </span>
          </div>
          <button className={styles.todosInfoDelete} onClick={deleteCompletedTodos}>Clear Completed</button>
        </div>
      </section>
    </>
  );
};

export default Todo;
