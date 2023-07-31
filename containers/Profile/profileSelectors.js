import { createSelector } from 'reselect'

const rootUser = state => state.user

export const selectUser = createSelector(
  rootUser,
  user => user.data
)
export const selectUserPending = createSelector(
  rootUser,
  user => user.pending
)
