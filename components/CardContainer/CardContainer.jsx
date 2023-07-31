import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import cx from 'classnames'
import { useState } from 'react'

import Card from '@/components/CardContainer/Card'
import FiltersPanel from '@/components/CardContainer/FiltersPanel'
import { selectAccessories } from '@/containers/Home/accessoriesSelectors'
import { addToCart } from '@/containers/Cart/cartActions'
import { selectMotherBoardId } from '@/containers/Cart/cartSelectors'
import { selectUser } from '@/containers/Profile/profileSelectors'
import { Cart } from '@/components/Icons/Icons'
import Modal from '@/components/Modal'

import styles from './CardContainer.module.scss'

const CardContainer = () => {
  const dispatch = useDispatch()
  const { pathname, push, query } = useRouter()
  const { _id: userId } = useSelector(selectUser) || {}
  const motherboardId = useSelector(selectMotherBoardId)
  const accessories = useSelector(selectAccessories) || []
  const color = userId ? 'black' : 'gray'

  const [showModal, setShowModal] = useState(false)

  const handleCardBtnClick = (id) => {
    if (!motherboardId && query.type && query?.type !== 'motherboard') {
      setShowModal(true)
      return
    }

    if (userId) {
      dispatch(addToCart({ user: userId, accessoryId: id }))

      return
    }

    push('/login')
  }

  return (
    <div className={styles.container}>
      {showModal &&
        <Modal
          title="Warning"
          onSubmit={() => {
            push('')
            setShowModal(false)
          }}
          onClose={() => setShowModal(false)}
          body={<span>You should select motherboard first!</span>}
        />
      }
      <FiltersPanel />
      <div className={styles.cardsContainer}>
        {pathname === '/builds'
          ? <Card
            image={'pcBuild1.jpeg'}
            description={'Gaming PC RTX 4090 24GB I9-13400F 64GB RAM '}
            price={'60000'}
          />
          : accessories.map(({ _id, image, title, price, type, count }) => (
            <Card
              key={_id}
              image={image}
              description={title}
              price={price}
              isAvailable={count}
              actionFooter={
                <button
                  className={cx(styles.cartBtn, { [styles['cartBtn--disabled']]: !userId })}
                  onClick={() => handleCardBtnClick(_id, type)}
                >
                  <Cart color={color} />
                </button>
              }
              actionHandler={handleCardBtnClick}
            />
          ))
        }
      </div>
    </div>
  )
}

export default CardContainer
