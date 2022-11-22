import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Link } from 'react-router-dom'
import { blogsFetchAll, getAllBlogsSelector } from './blogsSlice'
import { userSelector } from '../users/userSlice'
import { notificationSelector } from '../notification/notificationSlice'
import { Togglable } from '../../components/Togglable'
import { BlogForm } from './BlogForm'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export const Blogs = ({
  setLoading,
  loading,
  setShowNotification,
  showNotification,
  authUsername,
}) => {
  const blogs = [...useSelector(getAllBlogsSelector)].sort((a, b) => {
    return b.likes - a.likes
  })
  const { isSuccess, errorMessage } = useSelector(userSelector)
  const { notification } = useSelector(notificationSelector)
  const dispatch = useDispatch()
  const blogCreationFormRef = useRef()

  useEffect(() => {
    const setStates = async () => {
      try {
        if (authUsername !== null) {
          await dispatch(blogsFetchAll()).unwrap()
        }
      } catch (rejectedValueOrSerializedError) {
        console.error(rejectedValueOrSerializedError)
      }
    }
    setStates()
  }, [authUsername, dispatch])

  useEffect(() => {
    if (isSuccess) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
      }, 4000)
    }
  }, [dispatch, isSuccess, setLoading, setShowNotification])

  useEffect(() => {
    if (errorMessage) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
      }, 4000)
    }
  }, [errorMessage, setLoading, setShowNotification])

  const notify = () => (
    <>
      {notification && isSuccess && (
        <div className="panel bg-green">{notification}</div>
      )}

      {notification && errorMessage && (
        <div className="panel bg-red">{errorMessage}</div>
      )}
    </>
  )

  const blogCreationFormComponent = () => (
    <Togglable
      buttonLabel="create new blog"
      close="cancel"
      ref={blogCreationFormRef}
    >
      <BlogForm loading={loading} setLoading={setLoading} />
    </Togglable>
  )

  if (!authUsername) {
    return <Navigate to={'/login'} />
  }

  return (
    <div>
      {loading ? (
        <Skeleton count={blogs.length} height={50} />
      ) : (
        <>
          {' '}
          <div>
            <h3>Blog App</h3>
          </div>
          <div>{showNotification && notify()}</div>
          <div className="mt-5">{blogCreationFormComponent()}</div>
          <div className="mt-2 pb-4">
            <table>
              <thead>
                <tr>
                  <th scope="col">Blog Title</th>
                  <th scope="col">Author Name</th>
                  <th scope="col">Added By User</th>
                  <th scope="col"># likes</th>
                </tr>
              </thead>
              <tbody>
                {blogs?.map((blog) => (
                  <tr key={blog.id}>
                    <th scope="row">
                      <Link to={`/blogs/${blog.id}`}>{blog?.title}</Link>
                    </th>
                    <td>{blog?.author}</td>
                    {blog?.user?.map((u) => (
                      <td key={u.id}>
                        {u.name}—{u.username}
                      </td>
                    ))}
                    <td>{blog.likes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  )
}
