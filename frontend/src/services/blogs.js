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


const update = async (id, obj) => {
  const response = await axios.patch(`${baseUrl}/blogs/${id}`, obj, {
    headers: authHeader(),
  })
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/anecdotes/${id}`, { headers: authHeader(), })
  return response
}

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/blogs`, {
    headers: authHeader(),
  })
  return response.data
}

const blogsService = {
  update,
  remove,
  getAll
}

export default blogsService
