/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { usersSelector } from '../users/usersSlice'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { notificationSelector } from '../notification/notificationSlice'
import {
  blogFetchById,
  blogsSelector,
  getAllBlogsSelector,
  getBlogSelector,
  deleteBlog,
  incrementLikes,
  updateBlog,
  blogsFetchAll,
} from './blogsSlice'
import { CommentForm } from '../comments/CommentForm'
import { RotatingLines } from 'react-loader-spinner'

export const Blog = ({ loading, showNotification, authUsername }) => {
  const dispatch = useDispatch()
  const { id } = useParams()
  const navigate = useNavigate()

  const users = useSelector(usersSelector)
  const { isSuccess, errorMessage } = useSelector(blogsSelector)
  const blogs = useSelector(getAllBlogsSelector)
  const blog = useSelector(getBlogSelector)
  const { notification } = useSelector(notificationSelector)

  useEffect(() => {
    const setState = async () => {
      if (authUsername !== null) {
        try {
          await dispatch(blogFetchById(id)).unwrap()
          await dispatch(blogsFetchAll()).unwrap()
        } catch (rejectedValueOrSerializedError) {
          console.error(rejectedValueOrSerializedError)
        }
      }
    }
    setState()
  }, [authUsername, dispatch, id])

  const handleAddLikes = (id, likes) => {
    dispatch(incrementLikes(id))
    const targetBlog = blogs.find((b) => b.id === id)
    if (targetBlog) {
      likes = targetBlog.likes + 1
      dispatch(updateBlog(id, likes))
      window.location.reload()
    }
  }

  const handleDeleteBlog = async () => {
    try {
      await dispatch(deleteBlog(id)).unwrap()
      navigate('/')
    } catch (rejectedValueOrSerializedError) {
      console.error(rejectedValueOrSerializedError)
    }
  }

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
  const userId = JSON.parse(localStorage.getItem('user'))

  if (!blog && !users) {
    return <Navigate to={'/'} />
  }
  const blogUser = blog.user?.map((u) => u.id)
  const currentBlogUser = blogUser + []

  return (
    <div>
      <div>{notify()}</div>
      {loading && !showNotification ? (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="2"
          width="50"
          visible={true}
        />
      ) : (
        <>
          <h3>
            {blog?.title} by {blog?.author}
          </h3>
          <p>
            <a href={blog?.url}>{blog?.url}</a>
          </p>
          <span>{blog?.likes} likes</span>{' '}
          <button
            className="button bg-star"
            type="submit"
            onClick={() => handleAddLikes(blog?.id)}
          >
            Like
          </button>{' '}
          {currentBlogUser === userId.id ? (
            <button
              className="button bg-red text-initial"
              type="button"
              onClick={handleDeleteBlog}
            >
              remove
            </button>
          ) : (
            <button className="button bg-secondary" type="button" disabled>
              Can't remove this blog
            </button>
          )}
        </>
      )}
      <div className="mt-5">
        <CommentForm authUsername={authUsername} id={id} />
      </div>
    </div>
  )
}
