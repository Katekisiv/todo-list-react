import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Todo from './Todo'
import TodosInfo from './TodosInfo'
import NewTodo from './NewTodo'
import { StyledTodoList, StyledTodos } from './TodoList.style'
import { useDispatch } from 'react-redux'
import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { getTodosRequestAction } from '../../store/actions/todoActions'

interface TodoItem {
  id: number
  userId: number
  value: string
  completed: boolean
}

const TodoList: React.FC = (): JSX.Element => {
  const { todos } = useTypedSelectors((state) => state.todos)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const getTodos = useCallback(async (): Promise<void> => {
    dispatch(getTodosRequestAction())
  }, [dispatch])

  useEffect(() => {
    getTodos()
  }, [getTodos])

  const filteredTodos: TodoItem[] = useMemo((): TodoItem[] => {
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

  return (
    <>
      <NewTodo />

      <StyledTodos>
        <StyledTodoList>
          {filteredTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </StyledTodoList>

        <TodosInfo
          filteredTodosLength={filteredTodos.length}
          activeFilter={filter}
          setFilter={setFilter}
        />
      </StyledTodos>
    </>
  )
}

export default TodoList
