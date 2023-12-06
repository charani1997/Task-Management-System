import axios from "axios";
import { getToken } from "./AuthService";

const BASE_URL_API_URL = "http://localhost:8080/api/tasks";

/* Implement Basic Auth in React */
/* https://axios-http.com/docs/interceptors */

//* Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers["Authorization"] = getToken();
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export const getTasks = () => axios.get(BASE_URL_API_URL);

export const addTask = (task) => axios.post(BASE_URL_API_URL, task);

export const getTaskById = (id) => axios.get(`${BASE_URL_API_URL}/${id}`);

export const updateTask = (id, task) =>
  axios.put(`${BASE_URL_API_URL}/${id}`, task);

export const deleteTask = (id) => axios.delete(`${BASE_URL_API_URL}/${id}`);

export const completeTask = (id) =>
  axios.patch(`${BASE_URL_API_URL}/${id}/complete`);

export const incompleteTask = (id) =>
  axios.patch(`${BASE_URL_API_URL}/${id}/incomplete`);