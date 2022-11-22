import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import validator from '../../utilities/validator'
import { userRegister, userSelector, clearState } from './userSlice'
import { notificationSelector } from '../notification/notificationSlice'
import { RotatingLines } from 'react-loader-spinner'

export const Signup = ({
  setLoading,
  loading,
  setShowNotification,
  showNotification,
  authUsername,
}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const notification = useSelector(notificationSelector)
  const { isSuccess, errorMessage } = useSelector(userSelector)

  const initialValues = {
    username: '',
    name: '',
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
        navigate('/login')
      }, 4000)
    }
  }, [dispatch, isSuccess, navigate, setLoading, setShowNotification])

  useEffect(() => {
    if (errorMessage) {
      setLoading(true)
      setShowNotification(true)
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        setLoading(false)
        setShowNotification(false)
        dispatch(clearState())
      }, 4000)
    }
  }, [dispatch, errorMessage, setLoading, setShowNotification])

  const onSubmit = async (formValue) => {
    const { username, name, password } = formValue
    try {
      await dispatch(userRegister({ username, name, password })).unwrap()
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

  if (authUsername) {
    return <Navigate to={'/'} />
  }

  return (
    <div>
      <div>
        <h2>Register an account</h2>
        <small>
          <Link to="/login">I have an account</Link>
        </small>
      </div>

      <div> {showNotification && notify()}</div>

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form spellCheck="false">
            <div className="row mt-1">
              <div className="six columns">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  validate={validator.validateUsername}
                  className="u-full-width"
                />
                {errors.username && touched.username && (
                  <span className="text-danger">{errors.username}</span>
                )}
              </div>
            </div>

            <div className="row mt-1">
              <div className="six columns">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  validate={validator.validateName}
                  className="u-full-width"
                />
                {errors.name && touched.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="row mt-1">
              <div className="six columns">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  validate={validator.validatePassword}
                  className="u-full-width"
                />
                {errors.password && touched.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="three columns">
                {loading ? (
                  <>
                    <RotatingLines
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="2"
                      width="50"
                      visible={true}
                    />
                    <p>Signing up...</p>
                  </>
                ) : (
                  <button type="submit">Signup</button>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}
