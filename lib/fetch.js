import axios from 'axios'
import { parseCookies } from 'nookies'

export const axiosCall = async (body) => {
  const token = parseCookies()['USER_SESSION']

  try {
    const result = await axios({
      method: 'post',
      url: 'http://localhost:8080/graphql',
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

    return result.data
  } catch (e) {
    console.log(e)
  }
}
