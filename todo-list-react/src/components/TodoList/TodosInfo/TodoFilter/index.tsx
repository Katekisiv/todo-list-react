import React, { Dispatch, SetStateAction, useCallback } from 'react'
import { StyledTodoFilter } from './TodoFilter.style'

interface Props {
  filter: 'all' | 'active' | 'completed'
  setFilterProps: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
  isSelected: boolean
}

const TodoFilter: React.FC<Props> = ({
  filter,
  setFilterProps,
  isSelected,
}): JSX.Element => {
  const setFilter = useCallback(() => {
    setFilterProps(filter)
  }, [filter, setFilterProps])

  return (
    <StyledTodoFilter selected={isSelected} onClick={setFilter}>
      {filter}
    </StyledTodoFilter>
  )
}

export default TodoFilter
