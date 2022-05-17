import React from 'react';
import Header from "../../components/Header/Header";
import styles from "../TodoPage/TodoPage.module.css";
import NewTodo from "../../components/Todo/NewTodo/NewTodo";
import classNames from "classnames";
import TodoList from "../../components/Todo/TodoList/TodoList";

const TodoPage = () => {
  return (
    <>
      <Header titleNavBar='Registration'/>
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <NewTodo/>
          <TodoList/>
        </div>
      </main>
    </>
  );
};

export default TodoPage;
