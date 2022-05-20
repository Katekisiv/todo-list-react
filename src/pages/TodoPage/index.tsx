import React from 'react'
import classNames from 'classnames'
import Header from '../../components/Header'
import styles from './TodoPage.module.css'
import TodoList from '../../components/TodoList'

const TodoPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Header titleNavBar="Exit" />
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <TodoList />
        </div>
      </main>
    </>
  )
}

export default TodoPage
