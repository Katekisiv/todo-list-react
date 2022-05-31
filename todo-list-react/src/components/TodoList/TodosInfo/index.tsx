import React, { Dispatch, SetStateAction } from 'react'
import TodoFilter from './TodoFilter'
import {
  StyledDeleteCompletedTodos,
  StyledTodosInfo,
  StyledTodosInfoStatus,
} from './TodosInfo.style'

interface Props {
  filteredTodosLength: number
  activeFilter: 'all' | 'active' | 'completed'
  setFilter: Dispatch<SetStateAction<'all' | 'active' | 'completed'>>
  deleteCompletedTodos: () => void
}

type Filter = 'all' | 'active' | 'completed'

const filters: Filter[] = ['all', 'active', 'completed']

const TodosInfo: React.FC<Props> = ({
  filteredTodosLength,
  activeFilter,
  setFilter,
  deleteCompletedTodos,
}): JSX.Element => {
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
