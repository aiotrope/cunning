/* eslint-disable no-undef */
import axios from 'axios'

const baseUrl = process.env.REACT_APP_BASE_URL

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/anecdotes`)
  return response.data
}

const getById = async (id) => {
  const response = await axios.get(`${baseUrl}/anecdotes/${id}`)
  return response.data
}

const create = async (object) => {
  //data = { content, author, info, votes: 0 };
  const response = await axios.post(`${baseUrl}/anecdotes`, object)
  return response.data
}

const update = async (id, obj) => {
  const response = await axios.patch(`${baseUrl}/anecdotes/${id}`, obj)
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/anecdotes/${id}`)
  return response
}

const anecdoteService = {
  getAll,
  getById,
  create,
  update,
  remove,
}

export default anecdoteService
