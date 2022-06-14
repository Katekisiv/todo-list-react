import React, { useCallback, useEffect, useState } from 'react'
import Todo from './Todo'
import TodosInfo from './TodosInfo'
import NewTodo from './NewTodo'
import {
  StyledLoadingSpinner,
  StyledTodoList,
  StyledTodos,
} from './TodoList.style'
import { useDispatch } from 'react-redux'
import { useTypedSelectors } from '../../hooks/useTypedSelectors'
import { getTodosRequestAction } from '../../store/actions/todoActions'
import Pagination from '../Pagination'
import { todosPerPage } from '../../constants/todoTypes'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import { Oval } from 'react-loader-spinner'

const TodoList: React.FC = (): JSX.Element => {
  const { todos } = useTypedSelectors((state) => state.todos)
  const { isLoading } = useTypedSelectors((state) => state.global)
  const { todosLength, todoItems } = todos
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const dispatch = useDispatch()

  const paginate = useCallback(
    (pageNumber: number) => {
      setCurrentPage(pageNumber)
      dispatch(
        getTodosRequestAction({
          filter: filter,
          todosPerPage,
          pageNumber,
        })
      )
    },
    [dispatch, filter]
  )

  useEffect(() => {
    paginate(currentPage)
  }, [currentPage, paginate, todosLength])

  return (
    <>
      <NewTodo />

      {isLoading ? (
        <StyledLoadingSpinner>
          <Oval color="#00BFFF" height={20} width={20} />
        </StyledLoadingSpinner>
      ) : (
        <StyledTodos>
          <StyledTodoList>
            {todoItems.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
          </StyledTodoList>

          <Pagination paginate={paginate} currentPage={currentPage} />

          <TodosInfo
            filteredTodosLength={todosLength}
            activeFilter={filter}
            setFilter={setFilter}
            paginate={paginate}
          />
        </StyledTodos>
      )}
    </>
  )
}

export default TodoList
