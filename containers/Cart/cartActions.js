import { isEmpty } from 'lodash'

import { axiosCall } from '@/lib/fetch'
import { ADD_TO_CART, GET_CART } from '@/containers/Cart/cartActionTypes'
import { setPageLevel } from '@/containers/PageLevel/pageLevelActions'

export const addToCart = (cartInput) => async (dispatch) => {
  const { data, errors } = await axiosCall({
    query: `
            mutation AddToCart(
             $user: String!
             $accessoryId: String!
            ) { 
              addToCart(cartInput: {
              user: $user,
              accessoryId: $accessoryId,
              }) {
                accessoriesList {
                  _id
                  title
                  type
                  price
                }
              }
            }
        `,
    variables: cartInput
  })

  if (errors && !isEmpty(errors)) {
    dispatch(setPageLevel({ message: errors[0].message, type: 'error' }))
    return
  }

  dispatch({
    type: ADD_TO_CART,
    payload: data,
  })
}

export const getCart = () => async (dispatch, getState) => {
  const { data } = getState().user

  const result = await axiosCall({
    query: `
            mutation GetCartById(
             $id: String!
            ) { 
              getCartById(cartInput: {
                id: $id
              }) {
                _id
                accessoriesList {
                  _id
                  title
                  type
                  price
                }
              }
            }
        `,
    variables: { id: data._id }
  })

  dispatch({
    type: GET_CART,
    payload: result?.data,
  })
}

export const removeFromCart = (cartInput) => async (dispatch) => {
  await axiosCall({
    query: `
            mutation RemoveFromCart(
             $cartId: String!
             $accessoryId: String!
            ) { 
              removeFromCart(removeFromCartInput: {
              cartId: $cartId,
              accessoryId: $accessoryId,
              }) {
                message
              }
            }
        `,
    variables: cartInput
  })

  dispatch(getCart())
}
