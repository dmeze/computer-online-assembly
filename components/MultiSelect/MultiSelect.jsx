import cx from 'classnames'
import { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { isArray, isEqual, without } from 'lodash'

import Checkbox from '@/components/Checkbox'
import { selectDefaultFields, selectSearchFields } from '@/containers/Home/accessoriesSelectors'
import { setSearchFilters } from '@/containers/Home/accessoriesActions'

import styles from './MultiSelect.module.scss'

const MultiSelect = ({ title, options }) => {
  const dispatch = useDispatch()
  const [isOpened, setIsOpened] = useState(true)
  const searchFields = useSelector(selectSearchFields) || {}
  const defaultFields = useSelector(selectDefaultFields) || {}

  const handleGroupChange = ({ checked }) => {
    dispatch(setSearchFilters({
      filters: {
        ...searchFields,
        [title]: checked ? [] : defaultFields[title]
      }
    }))
  }

  const handleOptionChange = ({ text, checked }) => {
    dispatch(setSearchFilters({
      filters: {
        ...searchFields,
        [title]: checked ? without(searchFields[title], text) : [...searchFields[title], text]
      }
    }))
  }

  return isArray(options) && (
    <div>
      <div className={styles.selection}>
        <Checkbox
          text={title}
          checked={isEqual(searchFields[title], defaultFields[title])}
          onChange={handleGroupChange}
        />
        <i
          className={cx(styles.icon, isOpened ? 'arrow down' : 'arrow up')}
          onClick={() => setIsOpened(!isOpened)}
        />
      </div>
      {isOpened && options?.map(option => (
        <div key={option} className={styles.options}>
          <Checkbox
            text={option}
            checked={searchFields[title]?.includes(option)}
            onChange={handleOptionChange}
          />
        </div>
      ))}
    </div>
  )
}

MultiSelect.propTypes = {
  title: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.array, PropTypes.number])
}

export default MultiSelect
