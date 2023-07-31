import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { isEmpty } from 'lodash'

import CardContainer from '@/components/CardContainer'
import StepsPanel from '@/components/Steps/StepsPanel'
import {
  searchAccessories,
  setDefaultFilters,
  setSearchFilters
} from '@/containers/Home/accessoriesActions'
import { getCart } from '@/containers/Cart/cartActions'
import { selectUser } from '@/containers/Profile/profileSelectors'
import { selectCartAccessories } from '@/containers/Cart/cartSelectors'
import { getNextStepFromCart } from '@/lib/helpers'

import styles from './HomePage.module.scss'

const HomePage = () => {
  const dispatch = useDispatch()
  const { query, push } = useRouter()
  const { _id: userId } = useSelector(selectUser)
  const cart = useSelector(selectCartAccessories)

  useEffect(() => {
    userId && dispatch(getCart(userId))
  }, [userId, dispatch])

  useEffect(() => {
    if (!isEmpty(cart)) {
      push({
        pathname: '/',
        query: {
          type: cart.length === 8 ? 'fans' : getNextStepFromCart(cart)
        }
      })
    }
  }, [cart]) //eslint-disable-line

  useEffect(() => {
    dispatch(setDefaultFilters({ query }))
    dispatch(setSearchFilters({ query }))
    dispatch(searchAccessories({ type: 'motherboard', ...query }))
  }, [query]) //eslint-disable-line

  return (
    <div className={styles.container}>
      <StepsPanel />
      <CardContainer />
    </div>
  )
}

export default HomePage
