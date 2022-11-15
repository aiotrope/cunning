import { useRef, useState } from 'react'
import { Togglable } from './Togglable'
import blogService from '../services/blogs'

import PropTypes from 'prop-types'

export const Blog = ({
  blog,
  setSuccessMessage,
  setErrorMessage,
  setCounter,
  isComponentMounted,
}) => {
  const [like, setLike] = useState(blog.likes)

  const blogContentRef = useRef()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const addLike = async () => {
    try {
      setLike(blog.likes + 1)
      const response = await blogService.update(blog.id, {
        likes: blog.likes + 1,
      })
      if (response && isComponentMounted) {
        setSuccessMessage(
          `You like the blog ${response.data.title} by ${response.data.author} with ${response.data.likes} likes!`
        )
        setCounter((counter) => counter + 1)
        let timer
        clearTimeout(timer)
        timer = setTimeout(() => {
          setSuccessMessage(null)
        }, 1000)
      }
    } catch (error) {
      console.error(error)
      setErrorMessage(error.response.data.error)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setErrorMessage(null)
        window.location.reload()
      }, 3000)
    }
  }

  const deleteBlog = async (event) => {
    try {
      const confirm = window.confirm(
        `Remove blog ${blog.title} by ${blog.author}`
      )
      if (confirm) {
        const response = await blogService.remove(event.target.value)
        if (response.status === 200 && isComponentMounted) {
          setSuccessMessage(response.data.message)
          let timer
          clearTimeout(timer)
          timer = setTimeout(() => {
            setSuccessMessage(null)
            window.location.reload()
          }, 1000)
        }
      }
    } catch (error) {
      setErrorMessage(error.response.data.error)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setErrorMessage(null)
        window.location.reload()
      }, 3000)
    }
  }

  return (
    <div style={blogStyle} data-testid="blog">
      <div key={blog.id}>
        <span className="blog-title">{blog.title}</span>
        <span className="blog-author"> {blog.author}</span>
        <Togglable buttonLabel="view" close="hide" ref={blogContentRef}>
          <div>
            <span className="blog-url" data-testid="url">
              {blog.url}
            </span>
          </div>
          <div>
            likes{' '}
            <span className="blog-likes" data-testid="likes" id="_likes">
              {like}
            </span>
            <button
              value={blog.likes}
              className="addLike"
              data-testid="addLike"
              onClick={addLike}
            >
              like
            </button>
          </div>

          {blog?.user?.map((u, i) => {
            return (
              <div key={i}>
                <div key={u.id}>{u.name}</div>
              </div>
            )
          })}
          <div>
            <button
              value={blog.id}
              data-testid="removeBtn"
              onClick={deleteBlog}
            >
              remove
            </button>
          </div>
        </Togglable>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setSuccessMessage: PropTypes.func,
  setErrorMessage: PropTypes.func,
  setCounter: PropTypes.func,
  isComponentMounted: PropTypes.object.isRequired,
}