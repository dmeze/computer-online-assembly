import { GET_CONFIGURATIONS } from '@/containers/Builds/configurationsActionTypes'

export const initialState = {
  data: [],
  defaultFilters: {},
  searchFilters: {},
  error: []
}

export const configurationsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_CONFIGURATIONS:
    return {
      ...state,
      data: payload?.configurations
    }
  default:
    return state
  }
}

export default configurationsReducer
