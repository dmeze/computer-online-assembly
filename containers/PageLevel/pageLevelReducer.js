import { SET_PAGE_LEVEL, REMOVE_PAGE_LEVEL } from '@/containers/PageLevel/pageLevelActionTypes'

export const initialState = {
  messages: [],
}

export const pageLevelReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case SET_PAGE_LEVEL:
    return {
      messages: [
        ...state.messages,
        payload
      ]
    }
  case REMOVE_PAGE_LEVEL:
    return {
      messages: [
        ...state.messages.slice(0, -1)
      ]
    }
  default:
    return state
  }
}

export default pageLevelReducer
