import PropTypes from 'prop-types'

import styles from './Checkbox.module.scss'

const Checkbox = ({ text, onChange, checked = false }) => {

  const handleOnChange = () => {
    onChange({ text, checked })
  }

  return (
    <label className='form-control'>
      <input
        className={styles.checkbox}
        onChange={handleOnChange}
        type="checkbox"
        name="checkbox"
        checked={checked}
      />
      {text}
    </label>
  )
}

Checkbox.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default Checkbox
