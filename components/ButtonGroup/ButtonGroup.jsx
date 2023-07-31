import PropTypes from 'prop-types'
import cx from 'classnames'

import styles from './ButtonGroup.module.scss'

const ButtonGroup = ({ buttons, handleClick, selected }) => (
  <div className={styles.buttonsWrapper}>
    {buttons?.map(({ title, index }) => (
      <button
        key={title}
        onClick={() => handleClick(index)}
        className={cx(styles.button, { [styles['button--selected']]: index === selected })}
      >
        {title}
      </button>
    ))}
  </div>
)

ButtonGroup.propTypes = {
  buttons: PropTypes.array,
  selected: PropTypes.string,
  handleClick: PropTypes.func
}

export default ButtonGroup
