import PropTypes from 'prop-types'

import styles from './Input.module.scss'

const Input = ({ isEditMode, value }) => {
  return isEditMode
    ? <input
      className={ styles.editModeWrapper}
      value={value}
    />
    : <div className={styles.editWrapper}>
      {value}
    </div>
}

Input.propTypes = {
  isEditMode: PropTypes.bool,
  value: PropTypes.string
}

export default Input
