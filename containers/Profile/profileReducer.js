import { EDIT_USER, GET_USER_BY_ID_PENDING, GET_USER_BY_ID_COMPLETED } from '@/containers/Profile/profileActionTypes'

export const initialState = {
  data: {},
  error: [],
  pending: false
}

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_USER_BY_ID_PENDING:
    return {
      ...state,
      pending: true
    }
  case GET_USER_BY_ID_COMPLETED:
    return {
      ...state,
      data: payload,
      pending: false
    }
  case EDIT_USER:
    return {
      ...state,
      data: {
        ...state.data,
        ...payload
      }
    }
  default:
    return state
  }
}

export default profileReducer
