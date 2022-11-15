import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userRegister, userSelector, clearState } from "./userSlice";
import { Formik, Form, Field } from "formik";
import { useNavigate, Navigate } from "react-router-dom";
import validator from "../../utilities/validator";
//import { unwrapResult } from "@reduxjs/toolkit";
import {
  notificationSelector,
  clearNotification,
} from "../notification/notificationSlice";

import { RotatingLines } from "react-loader-spinner";

export const Signup = ({
  setCounter,
  setLoading,
  loading,
  setShowNotification,
  showNotification,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notification } = useSelector(notificationSelector);

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);

  const initialValues = {
    username: "",
    name: "",
    password: "",
  };

  useEffect(() => {
    if (isError) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(clearState());
        setCounter((counter) => counter + 1);
        return <Navigate to="/signup" />;
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
        dispatch(clearState());
        setCounter((counter) => counter + 1);
        navigate("/login");
      }, 5000);
    }
  }, [dispatch, isError, isSuccess, navigate, setCounter, setLoading]);

  useEffect(() => {
    if (notification || errorMessage) {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowNotification(true);
        setLoading(false);
        dispatch(clearNotification());
        setCounter((c) => c + 1);
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

  const onSubmit = async (formValue) => {
    const { username, name, password } = formValue;
    try {
      const originalPromiseResult = await dispatch(
        userRegister({ username, name, password })
      ).unwrap();
      //console.log(originalPromiseResult);
    } catch (rejectedValueOrSerializedError) {
      //console.log(rejectedValueOrSerializedError);
      return rejectedValueOrSerializedError;
    }
  };

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
        <h2>Register an account</h2>
        <small>
          <Link to="/login">I have an account</Link>
        </small>
      </div>

      {showNotification && notify()}

      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ errors, touched, isValidating }) => (
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
  );
};
