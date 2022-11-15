/* eslint-disable no-undef */
import axios from 'axios'
import userService from './user'

const baseUrl = process.env.REACT_APP_BASE_URL

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/blogs`, {
    headers: userService.authHeader(),
  })
  return response.data
}

const create = async (obj) => {
  const response = await axios.post(`${baseUrl}/blogs`, obj, {
    headers: userService.authHeader(),
  })
  return response.data
}

const update = async (id, obj) => {
  const response = await axios.patch(`${baseUrl}/blogs/${id}`, obj, {
    headers: userService.authHeader(),
  })

  return response
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/blogs/${id}`, {
    headers: userService.authHeader(),
  })
  return response
}

const blogService = {
  getAll,
  create,
  update,
  remove,
}

export default blogService