import React, { Dispatch, SetStateAction } from 'react'
import styles from './TodosInfo.module.css'
import TodoFilter from './TodoFilter'

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
    <div className={styles.todosInfo}>
      <span>{filteredTodosLength} items left</span>
      <div className={styles.todosInfoStatus}>
        {filters.map((filter) => (
          <TodoFilter
            key={filter}
            filter={filter}
            setFilterProps={setFilter}
            isSelected={filter === activeFilter}
          />
        ))}
      </div>
      <button
        type="button"
        className={styles.todosInfoDelete}
        onClick={deleteCompletedTodos}
      >
        Clear Completed
      </button>
    </div>
  )
}

export default TodosInfo
