import { createSelector } from 'reselect'

const rootAccessories = state => state.accessories

export const selectAccessories = createSelector(
  rootAccessories,
  accessories => accessories.data
)

export const selectSearchFields = createSelector(
  rootAccessories,
  accessories => accessories.searchFilters
)

export const selectDefaultFields = createSelector(
  rootAccessories,
  accessories => accessories.defaultFilters
)
