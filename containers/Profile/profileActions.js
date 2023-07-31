import { isEmpty } from 'lodash'

import { EDIT_USER, GET_USER_BY_ID_COMPLETED, GET_USER_BY_ID_PENDING } from '@/containers/Profile/profileActionTypes'
import { axiosCall } from '@/lib/fetch'

export const getUserById = (id) => async (dispatch) => {
  dispatch({
    type: GET_USER_BY_ID_PENDING
  })

  const { data, errors } = await axiosCall({
    query: `
            mutation getUserById(
             $id: String!
            ) { 
              getUserById(userInput: {
              id: $id
              }) {
                _id
                firstName
                lastName
                role
                email
                phone
                address
              }
            }
        `,
    variables: { id }
  })

  if (!isEmpty(errors)) {
    throw new Error(errors[0].message)
  }

  dispatch({
    type: GET_USER_BY_ID_COMPLETED,
    payload: data.getUserById
  })
}

export const editUser = (userInput) => async (dispatch) => {
  const { errors } = await axiosCall({
    query: `
            mutation editUser(
             $_id: String!
             $firstName: String
             $lastName: String
             $address: String
             $email: String
             $phone: String
             $password: String
            ) { 
              editUser(userInput: {
              _id: $_id
              firstName: $firstName
              lastName: $lastName
              address: $address
              email: $email
              phone: $phone
              password: $password
              }) {
                message
              }
            }
        `,
    variables: userInput
  })

  if (!isEmpty(errors)) {
    throw new Error(errors[0].message)
  }

  dispatch({
    type: EDIT_USER,
    payload: userInput
  })
}
