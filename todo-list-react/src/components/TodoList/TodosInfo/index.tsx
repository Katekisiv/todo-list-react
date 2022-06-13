import { Dispatch, SetStateAction, useCallback } from 'react'
import TodoFilter from './TodoFilter'
import {
  StyledDeleteCompletedTodos,
  StyledTodosInfo,
  StyledTodosInfoStatus,
} from './TodosInfo.style'
import { deleteCompletedTodosRequestAction } from '../../../store/actions/todoActions'
import { useDispatch } from 'react-redux'

interface Props {
  filteredTodosLength: number
  activeFilter: 'all' | 'active' | 'completed'
  setFilter: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
  paginate: Function
}

type Filter = 'all' | 'active' | 'completed'

const filters: Filter[] = ['all', 'active', 'completed']

const TodosInfo = ({
  filteredTodosLength,
  activeFilter,
  setFilter,
  paginate,
}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const deleteCompletedTodos = useCallback(async (): Promise<void> => {
    dispatch(deleteCompletedTodosRequestAction())
    paginate(1)
  }, [dispatch, paginate])

  return (
    <StyledTodosInfo>
      <span>{filteredTodosLength} items left</span>
      <StyledTodosInfoStatus>
        {filters.map((filter) => (
          <TodoFilter
            key={filter}
            filter={filter}
            setFilterProps={setFilter}
            isSelected={filter === activeFilter}
          />
        ))}
      </StyledTodosInfoStatus>
      <StyledDeleteCompletedTodos type="button" onClick={deleteCompletedTodos}>
        Clear Completed
      </StyledDeleteCompletedTodos>
    </StyledTodosInfo>
  )
}

export default TodosInfo
