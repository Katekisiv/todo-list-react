import React from 'react';
import Header from "../../components/Header/Header";
import styles from "./TodoPage.module.css";
import classNames from "classnames";
import Todo from "../../components/Todo/Todo";

const TodoPage = () => {
  return (
    <>
      <Header titleNavBar='Exit'/>
      <main className={styles.main}>
        <div className={classNames(styles.mainContainer, styles.container)}>
          <Todo/>
        </div>
      </main>
    </>
  );
};

export default TodoPage;
