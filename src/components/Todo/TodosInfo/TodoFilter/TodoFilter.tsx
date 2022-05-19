import React, { Dispatch, SetStateAction, useCallback } from 'react'
import classNames from 'classnames'
import styles from './TodoFilter.module.css'

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
    <span
      className={
        isSelected
          ? classNames(styles.todosInfoOption, styles.todosInfoStatusActive)
          : styles.todosInfoOption
      }
      onClick={setFilter}
    >
      {filter}
    </span>
  )
}

export default TodoFilter
