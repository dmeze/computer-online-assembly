import {
  GET_ACCESSORIES,
  SEARCH_ACCESSORIES,
  SET_DEFAULT_FILTERS,
  SET_SEARCH_FILTERS
} from './accessoriesActionTypes'

export const initialState = {
  data: [],
  defaultFilters: {},
  searchFilters: {},
  error: []
}

export const accessoriesReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_ACCESSORIES:
    return {
      ...state,
      data: payload?.accessories
    }
  case SEARCH_ACCESSORIES:
    return {
      ...state,
      data: payload?.searchAccessories
    }
  case SET_DEFAULT_FILTERS:
    return {
      ...state,
      defaultFilters: payload
    }
  case SET_SEARCH_FILTERS:
    return {
      ...state,
      searchFilters: payload
    }
  default:
    return state
  }
}

export default accessoriesReducer
