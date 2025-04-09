import cx from 'classnames'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

import { mapStepToIcon, mapTypeToIndex, steps } from '@/components/Steps/constants'
import { selectCart } from '@/containers/Cart/cartSelectors'
import Modal from '@/components/Modal'
import { removeFromCart } from '@/containers/Cart/cartActions'
import { createOrder } from '@/containers/Orders/ordersActions'
import { selectUser } from '@/containers/Profile/profileSelectors'

import styles from './StepsPanel.module.scss'

const StepsPanel = () => {
  const dispatch = useDispatch()
  const { query, push } = useRouter()
  const cart = useSelector(selectCart)
  const { _id: user } = useSelector(selectUser)
  const [showModal, setShowModal] = useState(false)
  const [cartSum, setCartSum] = useState(0)

  const currentStep = mapTypeToIndex[query?.type] || 0

  const handleShowModal = () => {
    setShowModal(true)
    const sumWorker = new Worker(new URL('../../workers/sumWorker.js', import.meta.url))
    sumWorker.postMessage({ array: cart?.accessoriesList, iteratee: 'price' })

    sumWorker.onmessage = (e) => {
      setCartSum(e.data)
      sumWorker.terminate()
    }
  }

  const handleStepClick = (key) => {
    push({
      pathname: '/',
      query: {
        type: key
      }
    })
  }

  const handleSubmitCart = () => {
    dispatch(createOrder({
      user,
      accessoriesList: cart?.accessoriesList.map(({ _id }) => _id),
      date: new Date().toISOString()
    }))

    setShowModal(false)
    push('/profile')
  }

  return (
    <div className={styles.container}>
      {showModal && (
        <Modal
          title="Your cart"
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmitCart}
          disableSubmitBtn={cart?.accessoriesList?.length < 8}
          body={
            <div className={styles.cartWrapper}>
              {cart?.accessoriesList.map(({ title, price, _id }) => (
                <div key={title} className={styles.goodWrapper}>
                  <div className={styles.infoWrapper}>
                    <span>{title}</span>
                    <span>{price} ₴</span>
                  </div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    className={styles.actionBtn}
                    onClick={() => dispatch(removeFromCart({
                      cartId: cart._id,
                      accessoryId: _id
                    }))}
                  />
                </div>
              ))}
              <div className={styles.totalPrice}>
                Total price: {cartSum} ₴
              </div>
            </div>
          }
        />
      )}
      {steps.map(({ title, key }, index) => (
        <div key={key} className={styles.stepWrapper}>
          <div
            className={cx(styles.iconWrapper, {
              [styles['iconWrapper--active']]: currentStep === index,
              [styles['iconWrapper--visited']]: currentStep > index || cart?.accessoriesList?.length === 8,
            })}
            onClick={() => handleStepClick(key)}
          >
            {mapStepToIcon[key]}
          </div>
          <div className={cx(styles.iconBar, {
            [styles['iconBar--visited']]: currentStep > index,
            [styles['iconBar--last']]: key === 'fans',
          })} />
          <p>{title}</p>
        </div>
      ))}
      {cart?.accessoriesList?.length === 8 && (
        <button className={styles.orderBtn} onClick={handleShowModal}>
          Create order
        </button>
      )}
    </div>
  )
}

export default StepsPanel
