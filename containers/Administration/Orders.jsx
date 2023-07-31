import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPrint } from '@fortawesome/free-solid-svg-icons'

import Table from '@/components/Profile/Table'
import { selectOrders } from '@/containers/Orders/ordersSelectors'
import { getOrdersHeader } from '@/containers/Administration/constants'
import {
  deleteOrder,
  editOrderState,
  getOrders,
  getOrdersByRole
} from '@/containers/Orders/ordersActions'
import Modal from '@/components/Modal'

import styles from './Orders.module.scss'

const Orders = ({ role }) => {
  const dispatch = useDispatch()
  const [modal, setModal] = useState({})
  const orders = useSelector(selectOrders) || []

  useEffect(() => {
    role
      ? dispatch(getOrdersByRole(role))
      : dispatch(getOrders())
  }, [dispatch])

  const handleDeleteOrder = (id) => {
    dispatch(deleteOrder(id))
  }

  const handleEditOrder = (_id, state) => {
    dispatch(editOrderState({ id: _id, state: state.value }))

    role
      ? dispatch(getOrdersByRole(role))
      : dispatch(getOrders())
  }

  return (
    <div className={styles.ordersTable}>
      {!isEmpty(modal) && <Modal
        title={modal?.configuration?.title}
        onClose={() => setModal({})}
        body={
          <div className={styles.orderWrapper}>
            {modal?.configuration?.accessoriesList.map(({ title, price, image }) => (
              <div key={title} className={styles.goodWrapper}>
                <Image
                  className={styles.cardImage}
                  src={`/img/${image}`}
                  alt={image}
                  width={50}
                  height={50}
                  priority
                />
                <span>{title}</span>
                <span>{price} ₴</span>
              </div>
            ))}
          </div>
        }
      />}
      <div className={styles.exportBtnContainer}>
        <button
          onClick={() => window.print()}
          className={styles.exportBtn}
        >
          <FontAwesomeIcon icon={faPrint}/>
        </button>
      </div>
      {!isEmpty(orders)
        ? <Table
          data={orders}
          onClick={(order) => setModal(order)}
          header={getOrdersHeader(styles, {
            onDelete: handleDeleteOrder,
            onEdit: handleEditOrder
          }, role)}
        />
        : <div>There are no orders now.</div>
      }
    </div>
  )
}

Orders.propTypes = {
  role: PropTypes.string
}

export default Orders
