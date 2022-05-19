import React from 'react'
import styles from './Header.module.css'

const Header = (props: { titleNavBar: string }) => {
    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <button className={styles.navigation__button}>{props.titleNavBar}</button>
            </nav>
            <div className={styles.container}>
                <h1 className={styles.header__title}>Todo</h1>
            </div>
        </header>
    );
};

export default Header;
