import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const REQUEST_TIMEOUT = 15000;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      const message =
        data?.message || data?.error || "Something went wrong. Please try again.";

      if (status === 401) {
        localStorage.removeItem("token");
      }

      return Promise.reject({
        status,
        message,
        data,
      });
    }

    if (error.request) {
      return Promise.reject({
        status: null,
        message: "Unable to reach the server. Please check your connection.",
        data: null,
      });
    }

    return Promise.reject({
      status: null,
      message: error.message || "An unexpected error occurred.",
      data: null,
    });
  }
);

export default api;