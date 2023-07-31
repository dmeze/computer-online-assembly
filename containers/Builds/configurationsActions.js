import { axiosCall } from '@/lib/fetch'
import { GET_CONFIGURATIONS } from '@/containers/Builds/configurationsActionTypes'

export const getConfigurations = () => async (dispatch) => {
  const result = await axiosCall({
    query: `
      query {
        configurations {
          _id
          title
          price
          image
          description
          quality
          accessoriesList {
            _id
            title
          }
          isAvailable
        }
      }
    `
  })

  dispatch({
    type: GET_CONFIGURATIONS,
    payload: result?.data,
  })
}

export const createConfiguration = (variables) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation CreateConfiguration(
            $title: String!,
            $description: String!
            $accessoriesList: [String]!
            $image: String!
            ) { 
              createConfiguration(configurationInput: {
              title: $title,
              description: $description
              accessoriesList: $accessoriesList
              image: $image
              }) {
                title
              }
      }
    `,
    variables
  })

  dispatch(getConfigurations())
}

export const editConfiguration = (variables) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation EditConfiguration(
            $_id: ID!
            $title: String!,
            $description: String!
            $accessoriesList: [String]!
            $image: String!
            ) { 
              editConfiguration(configurationInput: {
              _id: $_id,
              title: $title,
              description: $description
              accessoriesList: $accessoriesList
              image: $image
              }) {
                title
              }
      }
    `,
    variables
  })

  dispatch(getConfigurations())
}

export const deleteConfiguration = (id) => async (dispatch) => {
  await axiosCall({
    query: `
      mutation DeleteConfiguration(
            $id: ID!
            ) {
              deleteConfiguration(configurationInput: {
                id: $id
              }) {
                message
              }
      }
    `,
    variables: { id }
  })

  dispatch(getConfigurations())
}
