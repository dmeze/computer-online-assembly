import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'

import styles from './Modal.module.scss'

const Modal = ({ title, body, onSubmit, onClose, disableSubmitBtn }) => {
  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalWrapper}>
        <div className={styles.modalHeader}>
          <span className={styles.modalTitle}>{title}</span>
          <FontAwesomeIcon className={styles.closeBtn} icon={faTimes} onClick={onClose} />
        </div>
        <div className={styles.modalBody}>
          {body}
        </div>

        {onSubmit &&
          <div className={styles.modalFooter}>
            <button
              className={styles.backBtn}
              onClick={onClose}
            >
            Cancel
            </button>
            <button
              className={styles.submitBtn}
              onClick={onSubmit}
              disabled={disableSubmitBtn}
            >
            Submit
            </button>
          </div>
        }
      </div>
    </div>
  )
}

Modal.propTypes = {
  title: PropTypes.string,
  body: PropTypes.node,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
  disableSubmitBtn: PropTypes.bool
}

export default Modal
