/* eslint-disable no-empty */
/* eslint-disable no-undef */
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const authHeader = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem('user'))
    if (currentUser && currentUser.token) {
      return {
        Authorization: 'Bearer ' + currentUser.token,
      }
    } else {
      return {}
    }
  } catch (error) {}
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/users`, {
    headers: authHeader(),
  })
  return new Promise((resolve) =>
    setTimeout(() => resolve({ data: response.data }), 500)
  )
}

const usersService = {
  getAll,
}

export default usersService
