import React, {useCallback, useEffect, useState} from 'react'
import Todo from './Todo'
import TodosInfo from './TodosInfo'
import NewTodo from './NewTodo'
import {
  StyledTodoList,
  StyledTodos,
} from './TodoList.style'
import {useDispatch} from 'react-redux'
import {useTypedSelectors} from '../../hooks/useTypedSelectors'
import {getTodosRequestAction} from '../../store/actions/todoActions'
import Pagination from '../Pagination'
import {Filter, todosPerPage} from '../../constants/todoTypes'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const TodoList: React.FC = (): JSX.Element => {
  const {todos} = useTypedSelectors((state) => state.todos)
  const {todosLength, todoItems} = todos
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [filter, setFilter] = useState<Filter>('all')

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
      <NewTodo/>


      <StyledTodos>
        <StyledTodoList>
          {todoItems.map((todo) => (
            <Todo key={todo.id} todo={todo}/>
          ))}
        </StyledTodoList>

        <Pagination paginate={paginate} currentPage={currentPage} filter={filter}/>

        <TodosInfo
          filteredTodosLength={todosLength}
          activeFilter={filter}
          setFilter={setFilter}
          paginate={paginate}
        />
      </StyledTodos>
    </>
  )
}

export default TodoList
