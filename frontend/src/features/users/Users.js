import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { usersSelector, retrieveUsers } from './usersSlice'
export const Users = ({ authUsername }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const users = useSelector(usersSelector)

  useEffect(() => {
    const setState = async () => {
      try {
        if (authUsername !== null) {
          const users = await dispatch(retrieveUsers()).unwrap()
          if (!users && authUsername) {
            return <Navigate to={'/'} />
          }
        }
      } catch (rejectedValueOrSerializedError) {
        console.error(rejectedValueOrSerializedError)
      }
    }
    return () => setState()
  }, [authUsername, dispatch, navigate])

  if (users.length === 0) {
    return <Navigate to={'/'} />
  }
  return (
    <div>
      <h3>Users</h3>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th scope="col">Username</th>
            <th scope="col"># blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <th scope="row">
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </th>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
