import axios from "axios";

const AUTH_REST_API_URL = "http://localhost:8080/api/auth";

export const registerAPICall = (registerObj) =>
  axios.post(`${AUTH_REST_API_URL}/register`, registerObj);

export const loginAPICall = (email, password) =>
  axios.post(`${AUTH_REST_API_URL}/login`, { email, password });

/* Implement Basic Auth in React */
export const storeToken = (token) => localStorage.setItem("token", token);

export const getToken = () => localStorage.getItem("token");

/* Diplay the Links as Per User Auth in the Header */
export const saveLoggedInUser = (email) =>
  sessionStorage.setItem("authenticatedUser", email);

export const isUserLoggedIn = () => {
  const email = sessionStorage.getItem("authenticatedUser");
  if (email == null) {
    return false;
  } else {
    return true;
  }
};

export const getLoggedInUser = () => {
  const email = sessionStorage.getItem("authenticatedUser");
  return email;
};

/* Logout Feature */
export const logout = () => {
  localStorage.clear();
  sessionStorage.clear();
};