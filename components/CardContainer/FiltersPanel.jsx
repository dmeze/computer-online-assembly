import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { reduce } from 'lodash'
import { useEffect, useState } from 'react'

import MultiSelect from '@/components/MultiSelect'
import { checkIsEqual, redirectToSearch } from '@/lib/helpers'
import { setSearchFilters } from '@/containers/Home/accessoriesActions'
import { selectDefaultFields, selectSearchFields } from '@/containers/Home/accessoriesSelectors'
import { queryToFilters } from '@/lib/constants'

import styles from './FiltersPanel.module.scss'

const FiltersPanel = () => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const [minMaxPrice, setMinMaxPrice] = useState({
    minPrice: 0,
    maxPrice: 0
  })
  const searchFields = useSelector(selectSearchFields) || {}
  const defaultFields = useSelector(selectDefaultFields) || {}
  const queryFilters = query && reduce(
    queryToFilters[query.type || 'motherboard'],
    (prev, curr, key) => ({
      ...prev,
      [key]: query[key]?.split(',') || curr
    }), {})

  useEffect(() => setMinMaxPrice({
    minPrice: searchFields.minPrice,
    maxPrice: searchFields.maxPrice
  }), [searchFields])

  const handleSubmitClick = () => {
    redirectToSearch(searchFields, defaultFields)
  }

  const handleResetClick = () => {
    dispatch(setSearchFilters({ filters: defaultFields }))
    redirectToSearch(defaultFields, defaultFields)
  }

  const handleCancelClick = () => {
    dispatch(setSearchFilters({ query }))
  }

  const handlePriceChange = (e, key) => {
    setMinMaxPrice({ ...minMaxPrice, [key]: Number(e.target.value) })

    dispatch(setSearchFilters({
      filters: {
        ...searchFields,
        ...minMaxPrice,
        [key]: Number(e?.target?.value)
      }
    }))
  }

  return (
    <div className={styles.container}>
      <div className={styles.filtersContainer}>
        {Object.keys(defaultFields).map(key => (
          <MultiSelect key={key} title={key} options={defaultFields[key]} />
        ))}
        <span className={styles.filterTitle}>Price</span>
        <div className={styles.priceContainer}>
          <div className={styles.inputLabelContainer}>
            <label>Min</label>
            <input
              type="number"
              value={minMaxPrice.minPrice}
              onChange={(e) => handlePriceChange(e, 'minPrice')}
            />
          </div>
          <div className={styles.inputLabelContainer}>
            <label>Max</label>
            <input
              type="number"
              value={minMaxPrice.maxPrice}
              onChange={(e) => handlePriceChange(e, 'maxPrice')}
            />
          </div>
        </div>
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.resetFiltersBtn}
          onClick={handleResetClick}
          disabled={checkIsEqual(searchFields, {
            ...defaultFields,
            minPrice: Number(query.minPrice) || defaultFields.minPrice,
            maxPrice: Number(query.maxPrice) || defaultFields.maxPrice
          })}
        >
          Reset Filters
        </button>
        <div className={styles.subBtnContainer}>
          <button
            className={styles.cancelBtn}
            onClick={handleCancelClick}
            disabled={checkIsEqual(searchFields, {
              ...queryFilters,
              minPrice: Number(query.minPrice) || defaultFields.minPrice,
              maxPrice: Number(query.maxPrice) || defaultFields.maxPrice
            })}
          >
            Cancel
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmitClick}
            disabled={checkIsEqual(searchFields, {
              ...queryFilters,
              minPrice: Number(query.minPrice) || defaultFields.minPrice,
              maxPrice: Number(query.maxPrice) || defaultFields.maxPrice
            })}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}

export default FiltersPanel
