import Router from 'next/router'
import { isEqual, isNil, omitBy, map, reduce, xor, isObject, isArray } from 'lodash'

import { mapIndexToNextStep } from '@/components/Steps/constants'

export const removeEqualElements = (givenArray, referenceArray) => (
  isArray(givenArray)
    ? xor(givenArray, referenceArray).length === 0
      ? undefined
      : givenArray
    : isEqual(givenArray, referenceArray) ? undefined : givenArray
)

export const mapFilters = (searchFilters, defaultFilters) => reduce(
  defaultFilters,
  (prev, curr, key) => {
    const equalEls = removeEqualElements(searchFilters[key], curr)

    return ({
      ...prev,
      [key]: isArray(equalEls) ? equalEls.join?.(',') : equalEls
    })
  }, {}
)

export const queryActiveFilters = (searchFields = {}, defaultFilters) => omitBy(
  mapFilters(searchFields, defaultFilters),
  value => isNil(value) || value.length === 0
)

export const getNextStepFromCart = (accessoriesList) => {
  return mapIndexToNextStep[accessoriesList[accessoriesList.length - 1].type]
}

export const redirectToSearch = (searchFields, defaultFilters) => {
  const query = queryActiveFilters(searchFields, defaultFilters)

  Router.push({
    pathname: '/',
    query: Router.query?.motherboardId
      ? {
        ...query,
        type: Router.query?.type || 'motherboard',
        motherboardId: Router.query?.motherboardId
      }
      : {
        ...query,
        type: Router.query?.type || 'motherboard',
      }
    ,
  })
}

export const checkIsEqual = (searchFields, defaultFields) => isEqual(
  map(searchFields, collection => isObject(collection) ? collection?.sort() : collection),
  map(defaultFields, collection => isObject(collection) ? collection?.sort() : collection)
)
