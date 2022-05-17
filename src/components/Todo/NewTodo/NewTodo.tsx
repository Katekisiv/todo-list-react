import React from 'react'
import classNames from "classnames"
import '../../../declarations.d'
import styles from './NewTodo.module.css'
import {AddIcon} from '../../Icons/Icons'

const NewTodo: React.FC<{}> = () => {
  return (
    <section className={classNames(styles.section, styles.newTodo)}>
      <label className={styles.todoComplete}>
        <input type='checkbox' className={styles.newTodoCheckbox}/>
      </label>
      <input type='text' className={classNames(styles.inputField, styles.newTodoInput)}/>
      <button className={styles.newTodoButton}>
        <AddIcon className={styles.newTodoIcon} viewBox="0 0 48 48" height={22} width={22}/>
      </button>
    </section>
  );
};

export default NewTodo;
