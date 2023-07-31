import { maxBy, minBy } from 'lodash'

export const getMinMaxPrice = (accessories) => {
  const maxPrice = maxBy(accessories, 'price')?.price
  const minPrice = minBy(accessories, 'price')?.price

  return { minPrice, maxPrice }
}
