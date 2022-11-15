import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userLogin, userSelector, clearState } from "./userSlice";
import { Formik, Form, Field } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
import validator from "../../utilities/validator";
import {
  notificationSelector,
  clearNotification,
  setNotification,
} from "../notification/notificationSlice";

import { RotatingLines } from "react-loader-spinner";

export const Login = ({
  setCounter,
  setLoading,
  loading,
  setShowNotification,
  showNotification,
}) => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { isFetching, isSuccess, isError, errorMessage, name } =
    useSelector(userSelector);

  const { notification } = useSelector(notificationSelector);

  const initialValues = {
    username: "",
    password: "",
  };

  const onSubmit = async (formValue) => {
    const { username, password } = formValue;
    try {
      const originalPromiseResult = await dispatch(
        userLogin({ username, password })
      ).unwrap();
      console.log(originalPromiseResult);
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      return rejectedValueOrSerializedError;
    }
  };

  useEffect(() => {
    if (isError) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(clearState());
        setCounter((counter) => counter + 1);
        <Navigate to="/login" />;
        window.location.reload();
      }, 5000);
    }
  }, [dispatch, isError, isSuccess, navigate, setCounter, setLoading]);

  useEffect(() => {
    if (isFetching) {
      setLoading(true);
      setShowNotification(false);
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setLoading(false);
        setShowNotification(true);
      }, 2000);
    }
  }, [isFetching, setLoading, setShowNotification]);

  useEffect(() => {
    if (isSuccess) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setCounter((counter) => counter + 1);
        //setNotification(`Welcome back ${name}`);
        navigate("/");
        dispatch(clearState());
      }, 5000);
    }
  }, [dispatch, isError, isSuccess, name, navigate, setCounter, setLoading]);

  useEffect(() => {
    if (notification || errorMessage) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowNotification(true);
        setLoading(false);
        setCounter((c) => c + 1);
        dispatch(clearNotification());
      }, 5000);
    }
  }, [
    dispatch,
    errorMessage,
    isError,
    isSuccess,
    notification,
    setCounter,
    setLoading,
    setShowNotification,
  ]);

  const notify = () => (
    <>
      {notification && isSuccess && (
        <div className="panel bg-green">{notification}</div>
      )}

      {notification && errorMessage && (
        <div className="panel bg-red">{errorMessage}</div>
      )}
    </>
  );

  return (
    <div>
      <div>
        <h2>Log in to application</h2>
        <small>
          <Link to="/signup">I don't have an account</Link>
        </small>

        <div>
          {/* {name && (
            <div className="panel bg-blue">
              <p>Hi! {name} please login to your account</p>
            </div>
          )}
 */}
          {showNotification && notify()}
        </div>

        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          {({ errors, touched, isValidating }) => (
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
                    <button type="submit">
                      Login
                    </button>
                  )}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
