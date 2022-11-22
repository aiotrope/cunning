import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import { blogsCreate, blogsSelector, clearState } from './blogsSlice'
import { notificationSelector } from '../notification/notificationSlice'
import validator from '../../utilities/validator'

export const BlogForm = ({
  setLoading,
  setShowNotification,
  showNotification,
  authUsername,
}) => {
  const { notification } = useSelector(notificationSelector)
  const dispatch = useDispatch()
  const { isSuccess, errorMessage, isError } = useSelector(blogsSelector)

  const navigate = useNavigate()

  const initialValues = {
    title: '',
    author: '',
    url: '',
  }

  useEffect(() => {
    return () => {
      dispatch(clearState())
    }
  })

  useEffect(() => {
    if (isSuccess && authUsername) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
      }, 4000)
    }
  }, [
    authUsername,
    isSuccess,
    navigate,
    notification,
    setLoading,
    setShowNotification,
  ])

  useEffect(() => {
    if (isError && authUsername) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
      }, 4000)
    }
  }, [authUsername, isError, notification, setLoading, setShowNotification])

  const onSubmit = async (formValue) => {
    const { title, author, url } = formValue
    try {
      const originalPromiseResult = await dispatch(
        blogsCreate({ title, author, url })
      ).unwrap()
      console.log(originalPromiseResult)
      if (originalPromiseResult) {
        // eslint-disable-next-line no-self-assign
        window.location.href = window.location.href
      }
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError)
      return rejectedValueOrSerializedError
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

  return (
    <div>
      {showNotification && notify()}
      <div className="mt-2">
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form spellCheck="false">
              <div className="row mt-1">
                <div className="eight columns">
                  <label htmlFor="title">Title</label>
                  <Field
                    name="title"
                    type="text"
                    placeholder="Enter your awesome blog title; this is required field"
                    validate={validator.validateTitle}
                    className="u-full-width"
                  />
                  {errors.title && touched.title && (
                    <span className="text-danger">{errors.title}</span>
                  )}
                </div>
              </div>

              <div className="row mt-1">
                <div className="eight columns">
                  <label htmlFor="author">Author</label>
                  <Field
                    name="author"
                    type="text"
                    placeholder="Author of the blog; this is required field"
                    validate={validator.validateAuthor}
                    className="u-full-width"
                  />
                  {errors.author && touched.author && (
                    <span className="text-danger">{errors.author}</span>
                  )}
                </div>
              </div>

              <div className="row mt-1">
                <div className="eight columns">
                  <label htmlFor="url">Url</label>
                  <Field
                    name="url"
                    type="text"
                    placeholder="Must be a valid url"
                    validate={validator.validateUrl}
                    className="u-full-width"
                  />
                  {errors.url && touched.url && (
                    <span className="text-danger">{errors.url}</span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="columns">
                  <button type="submit" className="button-primary">
                    Create
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
