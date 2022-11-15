import React from "react";
import { unwrapResult } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { userLogin } from "../reducers/user";
import { setNotification } from "../reducers/notification";

//import PropTypes from 'prop-types'

const validateUsername = (value) => {
  let error;
  if (!value) {
    error = "Username is required!";
  } else if (
    !/^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{3,}$/gm.test(value)
  ) {
    error = "Invalid username";
  }
  return error;
};

const validatePassword = (value) => {
  let error;
  if (!value) {
    error = "Password is required!";
  } else if (
    !/^[a-zA-Z0-9$&+,:;=?@#|'<>.^*()%!-{}€"'ÄöäÖØÆ`~_]{3,}$/gm.test(value)
  ) {
    error = "Invalid password!";
  }
  return error;
};

export const Login = () => {
  const dispatch = useDispatch();

  const initialValues = {
    username: "",
    password: "",
  };

  const handleLogin = async (formValue) => {
    const { username, password } = formValue;
    try {
      const resultAction = await dispatch(userLogin({ username, password }));
      const originalPromiseResult = unwrapResult(resultAction);
      console.log(originalPromiseResult);
      await dispatch(setNotification(originalPromiseResult.message));
    } catch (error) {
      console.error(error.response);
    }
  };

  return (
    <div>
      <h2>log in to application</h2>
      <small>
        <Link to="/signup">I don't have an account</Link>
      </small>

      <Formik initialValues={initialValues} onSubmit={handleLogin}>
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className="row">
              <div className="six columns">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className="u-full-width"
                  validate={validateUsername}
                />
                {errors.username && touched.username && (
                  <span className="text-danger">{errors.username}</span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="six columns">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="u-full-width"
                  validate={validatePassword}
                />
                {errors.password && touched.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="two columns">
                <button type="submit">Login</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
