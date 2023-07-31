import { createSelector } from 'reselect'

const rootOrders = state => state.orders

export const selectOrders = createSelector(
  rootOrders,
  orders => orders.data
)
