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

const _add = async (id, remark) => {
  const response = await axios.post(`${baseUrl}/comments/${id}`, remark, {
    headers: authHeader(),
  })

  return response.data
}

const get = async (id) => {
  const response = await axios.get(`${baseUrl}/comments/${id}`, {
    headers: authHeader(),
  })
  return response.data
}

const commentsService = {
  _add,
  get,
}

export default commentsService
