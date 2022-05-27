import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './TodoList.module.css'
import { callApi } from '../../Api/callApi'
import Todo from './Todo'
import TodosInfo from './TodosInfo'
import NewTodo from './NewTodo'
import { useStore } from '../../hooks/userReducer'
import { actionTypes } from '../../constants/actionTypes'

interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

interface NewTodoItem {
  value: string
  completed: boolean
}

const TodoList: React.FC = (): JSX.Element => {
  const { state, dispatch } = useStore()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const getTodos = useCallback(async (): Promise<void> => {
    const receivedTodos = await callApi({
      method: 'GET',
      path: 'todo',
    })

    if (typeof receivedTodos === 'string') {
      dispatch({
        type: actionTypes.GET_TODO,
        payload: { todos: [] },
      })
    } else {
      dispatch({
        type: actionTypes.GET_TODO,
        payload: { todos: receivedTodos },
      })
    }
  }, [dispatch])

  useEffect(() => {
    getTodos()
  }, [getTodos])

  const filteredTodos: TodoItem[] = useMemo((): TodoItem[] => {
    switch (filter) {
      case 'all':
        return state.todos
      case 'active':
        return state.todos.filter((todo) => !todo.completed)
      case 'completed':
        return state.todos.filter((todo) => todo.completed)
      default:
        return state.todos
    }
  }, [filter, state.todos])

  const addTodo = useCallback(
    async (newTodo: NewTodoItem): Promise<void> => {
      const createdTodo: TodoItem = await callApi({
        method: 'POST',
        path: 'todo',
        payload: newTodo,
      })
      dispatch({
        type: actionTypes.CREATE_TODO,
        payload: { todo: createdTodo },
      })
    },
    [dispatch]
  )

  const deleteTodo = useCallback(
    async (id: number): Promise<void> => {
      await callApi({
        method: 'DELETE',
        path: `todo/${id}`,
      })
      dispatch({
        type: actionTypes.DELETE_TODO,
        payload: { todoId: id },
      })
    },
    [dispatch]
  )

  const completeTodo = useCallback(
    async (id: number, completed: boolean): Promise<void> => {
      await callApi({
        method: 'PATCH',
        path: `todo/${id}`,
        payload: { completed },
      })
      dispatch({
        type: actionTypes.COMPLETE_TODO,
        payload: { todoId: id, completed },
      })
    },
    [dispatch]
  )

  const updateTodo = useCallback(
    async (id: number, value: string): Promise<void> => {
      await callApi({
        method: 'PATCH',
        path: `todo/${id}`,
        payload: { value },
      })
      dispatch({
        type: actionTypes.UPDATE_TODO,
        payload: { todoId: id, value },
      })
    },
    [dispatch]
  )

  const deleteCompletedTodos = useCallback(async (): Promise<void> => {
    await callApi({
      method: 'DELETE',
      path: `todo?completed=true`,
    })
    dispatch({
      type: actionTypes.DELETE_COMPLETED_TODOS,
    })
  }, [dispatch])

  return (
    <>
      <NewTodo addTodoProps={addTodo} />

      <section className={styles.section}>
        <ul className={styles.todos}>
          {filteredTodos.map((todo) => (
            <Todo
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

export default TodoList
