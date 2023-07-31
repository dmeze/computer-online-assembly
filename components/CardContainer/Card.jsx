import Image from 'next/image'
import PropTypes from 'prop-types'

import styles from './Card.module.scss'

const Card = ({ image, description, price, actionFooter, isAvailable }) => {

  const truncateDescription = desc => desc?.length > 50
    ? `${desc.substring(0, 50)}...`
    : desc

  return (
    <div className={styles.cardContainer}>
      {!isAvailable && (
        <div className={styles.disabledCard}>
          Not Available
        </div>
      )}
      <Image
        className={styles.cardImage}
        src={`/img/${image}`}
        alt={image}
        width={250}
        height={200}
        priority
      />
      <div className={styles.cardDescription}>{truncateDescription(description)}</div>
      <div className={styles.cardAction}>
        <p>{price} ₴</p>
        {actionFooter}
      </div>
    </div>
  )
}

Card.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  type: PropTypes.string,
  actionFooter: PropTypes.node,
  isAvailable: PropTypes.oneOfType([PropTypes.number, PropTypes.bool])
}

export default Card
