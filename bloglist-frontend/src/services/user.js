/* eslint-disable no-empty */
/* eslint-disable no-undef */
import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL;

const authHeader = () => {
  try {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (currentUser && currentUser.token) {
      return {
        Authorization: "Bearer " + currentUser.token,
      };
    } else {
      return {};
    }
  } catch (error) {}
};

const register = async (username, name, password) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const response = await axios.post(
    `${baseUrl}/users/register`,
    { username, name, password },
    config
  );
  return response.data;
};

const login = async (username, password) => {
  const config = { headers: { "Content-Type": "application/json" } };
  const response = await axios.post(
    `${baseUrl}/login`,
    { username, password },
    config
  );
  if (response.data.token) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }
  return response.data;
};

const userService = {
  login,
  authHeader,
  register,
};

export default userService;
