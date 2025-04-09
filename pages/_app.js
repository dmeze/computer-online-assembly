import { useEffect } from 'react'
import { Provider } from 'react-redux'

import Layout from '@/components/Layout'

import { wrapper } from '../store'

import '@/styles/globals.scss'

const MyApp = ({ Component, ...rest }) => {
  const { store, props } = wrapper.useWrappedStore(rest)

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register(new URL('../workers/serviceWorker.js', import.meta.url))
        .then((registration) => console.log('scope is: ', registration.scope))
    }
  }, [])

  return (
    <Provider store={store}>
      <Layout>
        <Component {...props} />
      </Layout>
    </Provider>
  )
}

export default MyApp
