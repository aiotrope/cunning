/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userSelector, getUserById } from './userSlice'
import { retrieveUsers, usersSelector } from './usersSlice'
import { Navigate, useParams, Link, useNavigate } from 'react-router-dom'

import { deleteBlog } from '../blogs/blogsSlice'

import { RotatingLines } from 'react-loader-spinner'

export const User = ({ loading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const users = useSelector(usersSelector)
  const { id } = useParams()

  useEffect(() => {
    const getUser = async () => {
      try {
        const originalPromiseResult = await dispatch(getUserById(id)).unwrap()
        await dispatch(retrieveUsers()).unwrap()
        console.log(originalPromiseResult)
      } catch (rejectedValueOrSerializedError) {
        console.log(rejectedValueOrSerializedError)
        return rejectedValueOrSerializedError
      }
    }
    getUser()
  }, [dispatch, id])

  const selectedUser = users.find((user) => user.id === id)
  //console.log(selectedUser);
  const handleDeleteBlog = async (e) => {
    try {
      const target = e.target.value
      console.log(target)
      await dispatch(deleteBlog(target)).unwrap()
      navigate('/')
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError)
    }
  }

  if (users.length === 0) {
    return <Navigate to={'/'} />
  }
  console.log(user)
  const currentUser = JSON.parse(localStorage.getItem('user'))
  return (
    <>
      {loading ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="2"
          width="50"
          visible={true}
        />
      ) : (
        <>
          <div className="pb-4">
            <h3>{selectedUser.name}</h3>
            <small>Username: {selectedUser.username}</small>
          </div>
          <div>
            <table>
              <caption>Blogs Added By User</caption>
              <thead>
                <tr>
                  <th>Blog Title</th>
                  <th scope="col">Authored By</th>
                  <th scope="col">Blog URL</th>
                  <th scope="col"># of Likes</th>
                </tr>
              </thead>
              <tbody>
                {selectedUser?.blogs?.map((blog) => (
                  <tr key={blog.id}>
                    <th scope="row">
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </th>
                    <td>{blog.author}</td>
                    <td>{blog.url}</td>
                    <td>{blog.likes}</td>
                    {selectedUser.id === currentUser.id ? (
                      <td>
                        <button
                          className="button bg-red text-initial"
                          type="submit"
                          name="_blog"
                          value={blog.id}
                          onClick={handleDeleteBlog}
                        >
                          remove
                        </button>
                      </td>
                    ) : (
                      <td>
                        <button
                          className="button bg-secondary"
                          type="button"
                          disabled
                        >
                          Can't remove this blog
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
