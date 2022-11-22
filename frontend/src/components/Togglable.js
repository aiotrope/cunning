/* eslint-disable react/display-name */
import { useState, forwardRef, useImperativeHandle } from 'react'

export const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const toggleBlogCreateForm = () => (
    <>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility} data-testid="_createBlogBtn">
          {props.buttonLabel}
        </button>
      </span>
      <span style={showWhenVisible}>
        <h5>Create Blog</h5>
        <button onClick={toggleVisibility} className="mb-3">{props.close}</button>
        {props.children}
      </span>
    </>
  )

  const buttonLabel = props.buttonLabel

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return buttonLabel === 'create new blog'
    ? toggleBlogCreateForm()
    : null
})

