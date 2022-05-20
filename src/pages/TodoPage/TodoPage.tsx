import React from 'react'
import classNames from 'classnames'
import { Header } from '../../components/Header'
import styles from './TodoPage.module.css'
import { Todo } from '../../components/Todo'

const TodoPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Header titleNavBar="Exit" />
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <Todo />
        </div>
      </main>
    </>
  )
}

export default TodoPage
