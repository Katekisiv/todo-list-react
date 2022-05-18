import React from 'react';
import styles from './LoginPage.module.css'
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";

const RegisterPage = () => {
    return (
        <>
            <Header titleNavBar='Login'/>
            <main className={styles.main}>
                <Auth page='registration'/>
            </main>
        </>
    );
};

export default RegisterPage;
