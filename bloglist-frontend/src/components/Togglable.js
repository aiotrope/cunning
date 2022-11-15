import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

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
        {props.children}
        <button onClick={toggleVisibility}>{props.close}</button>
      </span>
    </>
  )

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  const toggleBlogContent = () => (
    <span>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility} className="view" data-testid="view">
          {props.buttonLabel}
        </button>
      </span>
      <span style={showWhenVisible}>
        <button onClick={toggleVisibility} data-testid="hide">
          {props.close}
        </button>
        {props.children}
      </span>
    </span>
  )

  const buttonLabel = props.buttonLabel

  return buttonLabel === 'create new blog'
    ? toggleBlogCreateForm()
    : toggleBlogContent()
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}