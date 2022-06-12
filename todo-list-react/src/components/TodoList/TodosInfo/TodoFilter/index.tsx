import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { StyledTodoFilter } from './TodoFilter.style'
import { getTodosRequestAction } from '../../../../store/actions/todoActions'
import { Filter } from '../../../../constants/todoTypes'
import { useDispatch } from 'react-redux'

interface Props {
  filter: Filter
  setFilterProps: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
  isSelected: boolean
}

const TodoFilter: React.FC<Props> = ({
  filter,
  setFilterProps,
  isSelected,
}): JSX.Element => {
  const dispatch = useDispatch()

  const filterTodos = useCallback((): void => {
    setFilterProps(filter)
    switch (filter) {
      case 'all':
        dispatch(getTodosRequestAction({ filter: 'all' }))
        break
      case 'active':
        dispatch(getTodosRequestAction({ filter: 'active' }))
        break
      case 'completed':
        dispatch(getTodosRequestAction({ filter: 'completed' }))
        break
      default:
        dispatch(getTodosRequestAction({ filter: 'all' }))
    }
  }, [dispatch, filter, setFilterProps])

  return (
    <StyledTodoFilter selected={isSelected} onClick={filterTodos}>
      {filter}
    </StyledTodoFilter>
  )
}

export default TodoFilter
