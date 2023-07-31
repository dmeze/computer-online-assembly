import { createSelector } from 'reselect'
import { isEmpty } from 'lodash'

const rootCart = state => state.cart

export const selectCart = createSelector(
  rootCart,
  cart => cart.data
)

export const selectCartAccessories = createSelector(
  selectCart,
  cartData => cartData?.accessoriesList
)

export const selectMotherBoardId = createSelector(
  selectCart,
  cart => !isEmpty(cart?.accessoriesList) && cart?.accessoriesList[0]._id
)
