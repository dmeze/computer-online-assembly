import { SET_MODAL } from '@/components/Modal/ModalActionTypes'

export const initialState = {
  data: []
}

export const modalReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_MODAL:
    return {
      ...state,
      data: payload
    }
  default:
    return state
  }
}

export default modalReducer
