import { ADD_TO_CART, GET_CART } from '@/containers/Cart/cartActionTypes'

export const initialState = {
  data: {},
  error: []
}

export const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ADD_TO_CART:
    return {
      ...state,
      data: payload?.addToCart
    }
  case GET_CART:
    return {
      ...state,
      data: {
        ...state.data,
        ...payload?.getCartById
      }
    }
  default:
    return state
  }
}

export default cartReducer
