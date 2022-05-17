import React from 'react';
import '../../declarations.d'
import styles from './LoginPage.module.css'
import Header from "../../components/Header/Header";
import Auth from "../../components/Auth/Auth";

const LoginPage = () => {
    return (
        <>
            <Header titleNavBar='Registration'/>
            <main className={styles.main}>
                <Auth page='login'/>
            </main>
        </>
    );
};

export default LoginPage;
