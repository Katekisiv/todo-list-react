import React, { useCallback, useEffect, useState } from 'react'
import Todo from './Todo'
import TodosInfo from './TodosInfo'
import NewTodo from './NewTodo'
import { StyledTodoList, StyledTodos } from './TodoList.style'
import { useDispatch } from 'react-redux'
import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { getTodosRequestAction } from '../../store/actions/todoActions'
import Pagination from '../Pagination'

const TodoList: React.FC = (): JSX.Element => {
  const { todos } = useTypedSelectors((state) => state.todos)
  const dispatch = useDispatch()
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [todosPerPage] = useState<number>(4)

  const lastTodoIndex = currentPage * todosPerPage
  const firstTodoIndex = lastTodoIndex - todosPerPage
  const currentTodos = todos.slice(firstTodoIndex, lastTodoIndex)

  const paginate = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
  }, [])

  const getTodos = useCallback(async (): Promise<void> => {
    dispatch(getTodosRequestAction({ filter: 'all' }))
  }, [dispatch])

  useEffect(() => {
    getTodos()
  }, [getTodos])

  return (
    <>
      <NewTodo />

      <StyledTodos>
        <StyledTodoList>
          {currentTodos.map((todo) => (
            <Todo key={todo.id} todo={todo} />
          ))}
        </StyledTodoList>

        <Pagination
          itemsPerPage={todosPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />

        <TodosInfo
          filteredTodosLength={currentTodos.length}
          activeFilter={filter}
          setFilter={setFilter}
        />
      </StyledTodos>
    </>
  )
}

export default TodoList
