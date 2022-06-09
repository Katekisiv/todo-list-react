import { Dispatch, SetStateAction, useCallback } from 'react'
import TodoFilter from './TodoFilter'
import {
  StyledDeleteCompletedTodos,
  StyledTodosInfo,
  StyledTodosInfoStatus,
} from './TodosInfo.style'
import { loadingAction } from '../../../store/actions/globalActions'
import { fetchDeleteCompletedTodosAction } from '../../../store/actions/todoActions'
import { useDispatch } from 'react-redux'

interface Props {
  filteredTodosLength: number
  activeFilter: 'all' | 'active' | 'completed'
  setFilter: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
}

type Filter = 'all' | 'active' | 'completed'

const filters: Filter[] = ['all', 'active', 'completed']

const TodosInfo = ({
  filteredTodosLength,
  activeFilter,
  setFilter,
}: Props): JSX.Element => {
  const dispatch = useDispatch()
  const deleteCompletedTodos = useCallback(async (): Promise<void> => {
    dispatch(loadingAction({ isLoading: true }))
    await dispatch(fetchDeleteCompletedTodosAction())
    dispatch(loadingAction({ isLoading: false }))
  }, [dispatch])

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
