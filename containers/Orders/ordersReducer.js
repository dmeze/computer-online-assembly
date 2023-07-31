import {
  GET_ORDERS_BY_ID,
  GET_ORDERS,
  GET_ORDERS_BY_ROLE
} from '@/containers/Orders/ordersActionTypes'

export const initialState = {
  data: {},
  error: []
}

export const orderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_ORDERS_BY_ID:
    return {
      ...state,
      data: payload?.ordersByUserId
    }
  case GET_ORDERS_BY_ROLE:
    return {
      ...state,
      data: payload?.getOrdersByRole
    }
  case GET_ORDERS:
    return {
      ...state,
      data: payload?.orders
    }
  default:
    return state
  }
}

export default orderReducer
