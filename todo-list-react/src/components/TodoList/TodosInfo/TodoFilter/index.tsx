import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { StyledTodoFilter } from './TodoFilter.style'
import { Filter } from '../../../../constants/todoTypes'

interface Props {
  filter: Filter
  setFilterProps: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
  paginate: Function
  isSelected: boolean
}

const TodoFilter: React.FC<Props> = ({
  filter,
  setFilterProps,
  paginate,
  isSelected,
}): JSX.Element => {
  const filterTodos = useCallback((): void => {
    setFilterProps(filter)
    paginate(1)
  }, [filter, paginate, setFilterProps])

  return (
    <StyledTodoFilter selected={isSelected} onClick={filterTodos}>
      {filter}
    </StyledTodoFilter>
  )
}

export default TodoFilter
