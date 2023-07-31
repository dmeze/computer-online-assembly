import { createSelector } from 'reselect'

const rootPageLevel = state => state.pageLevel

export const selectPageLevel = createSelector(
  rootPageLevel,
  pageLevel => pageLevel?.messages
)
