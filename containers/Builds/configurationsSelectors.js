import { createSelector } from 'reselect'

const rootConfigurations = state => state.configurations

export const selectConfigurations = createSelector(
  rootConfigurations,
  configurations => configurations.data
)
