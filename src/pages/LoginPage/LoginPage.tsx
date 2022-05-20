import React from 'react'
import styles from './LoginPage.module.css'
import { Header } from '../../components/Header'
import { Auth } from '../../components/Auth'

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <>
      <Header titleNavBar="Registration" />
      <main className={styles.main}>
        <Auth page="login" />
      </main>
    </>
  )
}

export default LoginPage
