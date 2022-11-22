/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { userLogin, userSelector, clearState } from './userSlice'
import { Formik, Form, Field } from 'formik'
import { Navigate } from 'react-router-dom'
import validator from '../../utilities/validator'
import { notificationSelector } from '../notification/notificationSlice'
import { RotatingLines } from 'react-loader-spinner'

export const Login = ({
  setLoading,
  loading,
  setShowNotification,
  showNotification,
  authUsername,
}) => {
  const dispatch = useDispatch()
  const { isSuccess, errorMessage } = useSelector(userSelector)
  const notification = useSelector(notificationSelector)

  const initialValues = {
    username: '',
    password: '',
  }

  useEffect(() => {
    if (isSuccess) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
        dispatch(clearState())
        window.location.reload()
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
        dispatch(clearState())
        setShowNotification(false)
      }, 4000)
    }
  }, [dispatch, errorMessage, setLoading, setShowNotification])

  const onSubmit = async (formValue) => {
    const { username, password } = formValue
    try {
      const originalPromiseResult = await dispatch(
        userLogin({ username, password })
      ).unwrap()
      console.log(originalPromiseResult.username)
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

  if (authUsername !== null) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <div>
        <h2>Log in to application</h2>
        <small>
          <Link to="/signup">I don't have an account</Link>
        </small>
        <div>{showNotification && notify()}</div>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ errors, touched }) => (
            <Form>
              <div className="row mt-1">
                <div className="six columns">
                  <label htmlFor="username">Username</label>
                  <Field
                    name="username"
                    type="text"
                    className="u-full-width"
                    validate={validator.validateUsername}
                  />
                  {errors.username && touched.username && (
                    <span className="text-danger">{errors.username}</span>
                  )}
                </div>
              </div>

              <div className="row mt-1">
                <div className="six columns">
                  <label htmlFor="password">Password</label>
                  <Field
                    name="password"
                    type="password"
                    className="u-full-width"
                    validate={validator.validatePassword}
                  />
                  {errors.password && touched.password && (
                    <span className="text-danger">{errors.password}</span>
                  )}
                </div>
              </div>
              <div className="row mt-2">
                <div className="two columns">
                  {loading ? (
                    <>
                      <RotatingLines
                        strokeColor="grey"
                        strokeWidth="5"
                        animationDuration="2"
                        width="50"
                        visible={true}
                      />
                      <p>Logging in</p>
                    </>
                  ) : (
                    <button type="submit">Login</button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}
