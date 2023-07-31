import { reduce } from 'lodash'

import {
  GET_ACCESSORIES,
  SEARCH_ACCESSORIES,
  SET_DEFAULT_FILTERS,
  SET_SEARCH_FILTERS
} from '@/containers/Home/accessoriesActionTypes'
import { axiosCall } from '@/lib/fetch'
import { queryToFilters } from '@/lib/constants'
import { selectMotherBoardId } from '@/containers/Cart/cartSelectors'
import { selectAccessories } from '@/containers/Home/accessoriesSelectors'
import { getMinMaxPrice } from '@/containers/Home/helpers'

export const setDefaultFilters = ({ query }) => async (dispatch, getState) => {
  const state = getState()
  const accessories = selectAccessories(state)
  const minMaxPrice = getMinMaxPrice(accessories)

  dispatch({
    type: SET_DEFAULT_FILTERS,
    payload: {
      ...minMaxPrice,
      ...queryToFilters[query?.type || 'motherboard'],
    }
  })
}

export const setSearchFilters = ({ query, filters }) => async (dispatch, getState) => {
  const searchFilters = getState()?.accessories.defaultFilters
  const queryFilters = query && reduce(
    queryToFilters[query?.type || 'motherboard'],
    (prev, curr, key) => ({
      ...prev,
      [key]: query[key]?.split(',') || curr
    }), {})

  dispatch({
    type: SET_SEARCH_FILTERS,
    payload: filters || {
      ...queryFilters,
      minPrice: Number(query?.minPrice) || searchFilters?.minPrice,
      maxPrice: Number(query?.maxPrice) || searchFilters?.maxPrice,
    }
  })
}

export const getAccessories = () => async (dispatch) => {
  const result = await axiosCall({
    query: `
      query {
        accessories {
          _id
          title
          manufacturer
          quality
          type
          model
          price
          count
          image
          supportedInterfaces
          interface
          size
          power
          speed
          cores
          memory
        }
      }
    `
  })

  dispatch({
    type: GET_ACCESSORIES,
    payload: result?.data,
  })
}

export const createAccessories = (variables) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation CreateAccessory(
            $title: String!,
            $manufacturer: String!,
            $quality: String!,
            $type: String!,
            $model: String!,
            $price: Int!,
            $count: Int!,
            $image: String!,
            $supportedInterfaces: [String],
            $interface: String,
            $size: String,
            $power: String,
            $speed: String,
            $cores: Int,
            $memory: String
            ) { 
              createAccessory(accessoryInput: {
              title: $title,
              manufacturer: $manufacturer,
              quality: $quality,
              type: $type,
              model: $model,
              price: $price,
              count: $count,
              image: $image,
              supportedInterfaces: $supportedInterfaces,
              interface: $interface,
              size: $size,
              power: $power,
              speed: $speed,
              cores: $cores,
              memory: $memory
              }) {
                title
              }
      }
    `,
    variables
  })

  dispatch(getAccessories())
}

export const editAccessory = (variables) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation EditAccessory(
            $_id: ID!
            $title: String!,
            $manufacturer: String!,
            $quality: String!,
            $type: String!,
            $model: String!,
            $price: Int!,
            $count: Int!,
            $image: String!,
            $supportedInterfaces: [String],
            $interface: String,
            $size: String,
            $power: String,
            $speed: String,
            $cores: Int,
            $memory: String
            ) { 
              editAccessory(accessoryInput: {
              _id: $_id,
              title: $title,
              manufacturer: $manufacturer,
              quality: $quality,
              type: $type,
              model: $model,
              price: $price,
              count: $count,
              image: $image,
              supportedInterfaces: $supportedInterfaces,
              interface: $interface,
              size: $size,
              power: $power,
              speed: $speed,
              cores: $cores,
              memory: $memory
              }) {
                title
              }
      }
    `,
    variables: {
      ...variables,
      count: variables.count || 0
    }
  })

  dispatch(getAccessories())
}

export const searchAccessories = (query) => async (dispatch, getState) => {
  const state = getState()
  const motherboardId = selectMotherBoardId(state)
  const reducedQuery = reduce(query, (prev, curr, key) => ({
    ...prev,
    [key]: key === 'minPrice' || key === 'maxPrice' ? Number(curr) : curr.split(',').map(el => key === 'cores' ? Number(el) : el)
  }), {})

  const result = await axiosCall({
    query: `
            mutation SearchAccessories(
            $title: [String],
            $manufacturer: [String],
            $quality: [String],
            $type: [String],
            $model: [String],
            $interface: [String],
            $size: [String],
            $power: [String],
            $speed: [String],
            $cores: [Int],
            $memory: [String],
            $minPrice: Int,
            $maxPrice: Int,
            $isAvailable: Boolean,
            $motherboardId: String
            ) { 
              searchAccessories(accessoriesFilters: {
              title: $title,
              manufacturer: $manufacturer,
              quality: $quality,
              type: $type,
              model: $model,
              interface: $interface,
              size: $size,
              power: $power,
              speed: $speed,
              cores: $cores,
              memory: $memory,
              minPrice: $minPrice,
              maxPrice: $maxPrice,
              isAvailable: $isAvailable,
              motherboardId: $motherboardId
              }) {
                _id
                title
                manufacturer
                quality
                type
                model
                price
                count
                image
                supportedInterfaces
                interface
                size
                power
                speed
                cores
                memory
              }
            }
        `,
    variables: motherboardId
      ? { ...reducedQuery, motherboardId }
      : reducedQuery
  })

  dispatch({
    type: SEARCH_ACCESSORIES,
    payload: result?.data,
  })

  dispatch(setDefaultFilters({ query }))
  dispatch(setSearchFilters({ query }))
}

export const deleteAccessory = (id) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation DeleteAccessory(
            $id: ID!
            ) {
              deleteAccessory(accessoryInput: {
                id: $id
              }) {
                message
              }
      }
    `,
    variables: { id }
  })

  dispatch(getAccessories())
}
