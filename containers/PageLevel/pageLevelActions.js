import { REMOVE_PAGE_LEVEL, SET_PAGE_LEVEL } from '@/containers/PageLevel/pageLevelActionTypes'

export const setPageLevel = (payload) => ({
  type: SET_PAGE_LEVEL,
  payload
})

export const removePageLevel = () => ({
  type: REMOVE_PAGE_LEVEL
})
