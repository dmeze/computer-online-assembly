import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationCircle, faTimes } from '@fortawesome/free-solid-svg-icons'

import { selectPageLevel } from '@/containers/PageLevel/pageLevelSelectors'
import { removePageLevel } from '@/containers/PageLevel/pageLevelActions'

import styles from './PageLevel.module.scss'

const PageLevel = () => {
  const dispatch = useDispatch()
  const messages = useSelector(selectPageLevel) || []

  return messages.map(({ message }) => (
    <div key={message} className={styles.pageLevelContainer}>
      <FontAwesomeIcon icon={faExclamationCircle} />
      {message}
      <FontAwesomeIcon
        icon={faTimes}
        className={styles.pageLevelCloseBtn}
        onClick={() => dispatch(removePageLevel())}
      />
    </div>
  ))
}

export default PageLevel
