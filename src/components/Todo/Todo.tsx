import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './Todo.module.css'
import { callApi } from '../../Api/callApi'
import { TodoItem } from './TodoItem'
import { TodosInfo } from './TodosInfo'
import { NewTodo } from './NewTodo'

interface Todo {
  id: number
  userId: number
  value: string
  completed: boolean
}

const Todo: React.FC = (): JSX.Element => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    const getTodos = async (): Promise<void> => {
      const receivedTodos = await callApi({
        method: 'GET',
        path: 'todo',
      })
      if (typeof receivedTodos === 'string') {
        setTodos([])
      } else {
        setTodos(receivedTodos)
      }
    }
    getTodos()
  }, [])

  const filteredTodos: Todo[] = useMemo((): Todo[] => {
    switch (filter) {
      case 'all':
        return todos
      case 'active':
        return todos.filter((todo) => !todo.completed)
      case 'completed':
        return todos.filter((todo) => todo.completed)
      default:
        return todos
    }
  }, [filter, todos])

  const addTodo = useCallback(async (newTodo): Promise<void> => {
    const createdTodo: Todo = await callApi({
      method: 'POST',
      path: 'todo',
      payload: newTodo,
    })
    setTodos((prevTodos) => [...prevTodos, createdTodo])
  }, [])

  const deleteTodo = useCallback(async (id: number): Promise<void> => {
    await callApi({
      method: 'DELETE',
      path: `todo/${id}`,
    })
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id))
  }, [])

  const completeTodo = useCallback(
    async (id: number, completed: boolean): Promise<void> => {
      await callApi({
        method: 'PATCH',
        path: `todo/${id}`,
        payload: { completed },
      })
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            todo.completed = completed
          }
          return todo
        })
      )
    },
    []
  )

  const updateTodo = useCallback(
    async (id: number, value: string): Promise<void> => {
      await callApi({
        method: 'PATCH',
        path: `todo/${id}`,
        payload: { value },
      })
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.id === id) {
            todo.value = value
          }
          return { ...todo }
        })
      )
    },
    []
  )

  const deleteCompletedTodos = useCallback(async (): Promise<void> => {
    await callApi({
      method: 'DELETE',
      path: `todo?completed=true`,
    })
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed))
  }, [])

  return (
    <>
      <NewTodo addTodoProps={addTodo} />

      <section className={styles.section}>
        <ul className={styles.todos}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              completeTodo={completeTodo}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          ))}
        </ul>

        <TodosInfo
          filteredTodosLength={filteredTodos.length}
          activeFilter={filter}
          setFilter={setFilter}
          deleteCompletedTodos={deleteCompletedTodos}
        />
      </section>
    </>
  )
}

export default Todo
