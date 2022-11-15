import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { userRegister, getLogin } from "../reducers/user";
import { Link } from "react-router-dom";
import { setNotification } from "../reducers/notification";
import { unwrapResult } from "@reduxjs/toolkit";
//import * as Yup from "yup";

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

const validateName = (value) => {
  let error;
  if (!value) {
    error = "Name is required!";
  } else if (
    !/^[a-zA-Z]{0,}[\s]?[a-zA-Z.]{0,}?[a-zA-Z]{0,}[\s]?[a-zA-Z.]{0,}?[a-zA-Z]{0,}[\s]?[a-zA-Z.]{0,}?$/gm.test(
      value
    )
  ) {
    error = "Invalid name";
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

export const Signup = () => {
  const initialValues = {
    username: "",
    name: "",
    password: "",
  };

  const dispatch = useDispatch();

  const handleSubmit = async (formValue) => {
    const { username, name, password } = formValue;

    dispatch(userRegister({ username, name, password }))
      .then(unwrapResult)
      .then((originalPromiseResult) => {
        console.log(originalPromiseResult);
      })
      .catch((rejectedValueOrSerializedError) => {
        console.log(rejectedValueOrSerializedError);
      });
  };

  return (
    <div>
      <h2>Signup</h2>
      <small>
        <Link to="/login">I have an account</Link>
      </small>

      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ errors, touched, isValidating }) => (
          <Form>
            <div className="row">
              <div className="six columns">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  validate={validateUsername}
                  className="u-full-width"
                />
                {errors.username && touched.username && (
                  <span className="text-danger">{errors.username}</span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="six columns">
                <label htmlFor="name">Name</label>
                <Field
                  name="name"
                  type="text"
                  validate={validateName}
                  className="u-full-width"
                />
                {errors.name && touched.name && (
                  <span className="text-danger">{errors.name}</span>
                )}
              </div>
            </div>

            <div className="row">
              <div className="six columns">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  validate={validatePassword}
                  className="u-full-width"
                />
                {errors.password && touched.password && (
                  <span className="text-danger">{errors.password}</span>
                )}
              </div>
            </div>
            <div className="row mt-2">
              <div className="two columns">
                <button type="submit">Signup</button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
