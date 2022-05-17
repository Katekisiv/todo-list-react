import React, {useEffect, useState} from 'react';
import classNames from "classnames";
import styles from './TodoList.module.css'
import fetchTodos from "./ApiService";

const TodoList = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetchTodos().then(
      todos => setTodos(todos)
    )
  }, [])
  return (
    <section className={styles.section}>
      <ul className={styles.todos}>
        {todos.map(todo => (
          <li key={todo} className={styles.todo}>
            <div>{todo}</div>
          </li>
        ))}
      </ul>
      <div className={styles.todosInfo}>
        <span>? items left</span>
        <div className={styles.todosInfoStatus}>
          <span className={classNames(styles.todosInfoOption, styles.todosInfoStatusActive)}>All</span>
          <span className={classNames(styles.todosInfoOption)}>Active</span>
          <span className={classNames(styles.todosInfoOption)}>Completed</span>
        </div>
        <button className={styles.todosInfoDelete}>Clear Completed</button>
      </div>
    </section>
  );
};

export default TodoList;
