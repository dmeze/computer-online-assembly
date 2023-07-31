import { destroyCookie, setCookie } from 'nookies'
import { isEmpty } from 'lodash'
import Router from 'next/router'

import { axiosCall } from '@/lib/fetch'
import { getUserById } from '@/containers/Profile/profileActions'
import { setPageLevel } from '@/containers/PageLevel/pageLevelActions'

export const loginUser = (loginValues) => async (dispatch) => {
  const { data, errors } = await axiosCall({
    query: `
            mutation Login(
             $email: String
             $password: String!
            ) { 
              login(userInput: {
              email: $email,
              password: $password,
              }) {
                token
                tokenExpiration
                id
              }
            }
        `,
    variables: loginValues
  })

  if (errors && !isEmpty(errors)) {
    dispatch(setPageLevel({ message: errors[0].message, type: 'error' }))
    return
  }

  setCookie(
    null,
    'USER_SESSION',
    data.login.token,
    { domain: document?.domain, maxAge: 1800 }
  )

  setCookie(
    null,
    'USER_ID',
    data.login.id,
    { domain: document?.domain, maxAge: 1800 }
  )

  dispatch(getUserById(data.login.id))
  Router.push('/')
}

export const signUpUser = (signUpValues) => async (dispatch) => {
  const { data, errors } = await axiosCall({
    query: `
            mutation SignUp(
             $firstName: String!
             $lastName: String!
             $address: String!
             $email: String!
             $phone: String!
             $password: String!
            ) { 
              signUp(userInput: {
              firstName: $firstName
              lastName: $lastName
              address: $address
              email: $email
              phone: $phone
              password: $password
              }) {
                token
                tokenExpiration
                id
              }
            }
        `,
    variables: signUpValues
  })

  if (errors && !isEmpty(errors)) {
    dispatch(setPageLevel({ message: errors[0].message, type: 'error' }))
    return
  }

  setCookie(
    null,
    'USER_SESSION',
    data.signUp.token,
    { domain: document?.domain, maxAge: 1800 }
  )

  setCookie(
    null,
    'USER_ID',
    data.signUp.id,
    { domain: document?.domain, maxAge: 1800 }
  )

  dispatch(getUserById(data.signUp.id))
  Router.push('/')
}

export const logout = () => {
  destroyCookie({}, 'USER_SESSION', { domain: document?.domain })
  destroyCookie({}, 'USER_ID', { domain: document?.domain })
}
