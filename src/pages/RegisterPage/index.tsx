import React from 'react'
import styles from './RegisterPage.module.css'
import Header from '../../components/Header'
import Auth from '../../components/Auth'

const RegisterPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Header titleNavBar="login" />
      <main className={styles.main}>
        <Auth page="registration" />
      </main>
    </>
  )
}

export default RegisterPage
