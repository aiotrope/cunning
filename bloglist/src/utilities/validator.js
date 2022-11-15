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

const validator = {
  validateName,
  validatePassword,
  validateUsername,
};

export default validator;
