import { axiosCall } from '@/lib/fetch'
import {
  GET_ORDERS,
  GET_ORDERS_BY_ID,
  GET_ORDERS_BY_ROLE
} from '@/containers/Orders/ordersActionTypes'
import { getCart } from '@/containers/Cart/cartActions'

export const createOrder = (orderInput) => async (dispatch) => {
  await axiosCall({
    query: `
            mutation CreateOrder(
             $user: String!
             $date: String!
             $accessoriesList: [String]
             $configuration: String
            ) { 
              createOrder(orderInput: {
              user: $user,
              date: $date,
              accessoriesList: $accessoriesList,
              configuration: $configuration
              }) {
                date
                state
              }
            }
        `,
    variables: orderInput
  })

  dispatch(getCart())
}

export const getOrdersById = () => async (dispatch, getState) => {
  const { data } = getState().user

  const result = await axiosCall({
    query: `
            mutation GetOrdersById(
             $userId: String!
            ) { 
              ordersByUserId(ordersByUserIdInput: {
                userId: $userId
              }) {
                _id
                user {
                  firstName
                }
                date
                price
                state
                configuration {
                  title
                  accessoriesList {
                   title
                   price
                }
               }
              }
            }
        `,
    variables: { userId: data._id }
  })

  dispatch({
    type: GET_ORDERS_BY_ID,
    payload: result?.data,
  })
}

export const getOrders = () => async (dispatch) => {
  const result = await axiosCall({
    query: `
      query {
        orders {
          _id
          user {
            firstName
          }
          date
          price
          state
          configuration {
            title
            accessoriesList {
             title
             price
             image
            }
          }
        }
      }
    `
  })

  dispatch({
    type: GET_ORDERS,
    payload: result?.data,
  })
}

export const getOrdersByRole = (role) => async (dispatch) => {
  const result = await axiosCall({
    query: `
      mutation GetOrdersByRole(
             $role: String!
            ) { 
              getOrdersByRole(orderByRoleInput: {
                role: $role
              }) {
                _id
                user {
                  firstName
                }
                date
                price
                state
                configuration {
                  title
                  accessoriesList {
                   title
                   price
                   image
                }
               }
              }
            }
    `,
    variables: { role }
  })

  dispatch({
    type: GET_ORDERS_BY_ROLE,
    payload: result?.data,
  })
}

export const deleteOrder = (id) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation DeleteOrder(
            $id: String!
            ) {
              deleteOrder(orderId: {
                id: $id
              }) {
                message
              }
      }
    `,
    variables: { id }
  })

  dispatch(getOrders())
}

export const editOrderState = (editInput) => async () => {
  await axiosCall({
    query: `
      mutation EditOrder(
            $id: String!
            $state: String!
            ) {
              changeStatus(editOrderInput: {
                id: $id
                state: $state
              }) {
                message
              }
      }
    `,
    variables: editInput
  })
}
