import Head from 'next/head'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { parseCookies } from 'nookies'

import Header from '@/components/Header'
import { getUserById } from '@/containers/Profile/profileActions'
import PageLevel from '@/containers/PageLevel'

import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const userId = parseCookies()['USER_ID']

    if (userId) {
      dispatch(getUserById(userId))
    }
  }, []) //eslint-disable-line

  return (
    <>
      <Head>
        <title>Computer Online Assembly</title>
        <meta name="description" />
      </Head>

      <div className={styles.container}>
        <Header />
        <main className={styles.main}>
          <PageLevel />
          {children}
        </main>
      </div>
    </>
  )
}

export default Layout
