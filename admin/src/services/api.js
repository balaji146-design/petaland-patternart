// import axios from 'axios'

// const API_BASE_URL =
//   import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

// const TOKEN_KEY = 'petaland_admin_token'
// const AUTH_STORAGE_KEY = 'petaland_admin_auth'

// const api = axios.create({
//   baseURL: API_BASE_URL,
//   timeout: 20000,
//   headers: {
//     Accept: 'application/json',
//   },
// })

// /**
//  * Request Interceptor
//  * Attaches JWT token to every outgoing request.
//  */
// api.interceptors.request.use(
//   (config) => {
//     const token = getStoredToken()
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
//   },
//   (error) => Promise.reject(error)
// )

// /**
//  * Response Interceptor
//  * Handles common errors and 401 redirects.
//  */
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const status = error?.response?.status

//     if (status === 401) {
//       clearStoredAuth()
//       if (typeof window !== 'undefined' && window.location.pathname !== '/login') {
//         window.location.href = '/login'
//       }
//     }

//     if (status === 500) {
//       console.error('Server error:', error?.response?.data?.message || error.message)
//     }

//     if (error.code === 'ECONNABORTED') {
//       console.error('Request timeout:', error.message)
//     }

//     if (!error.response) {
//       console.error('Network error:', error.message)
//     }

//     return Promise.reject(error)
//   }
// )

// function getStoredToken() {
//   try {
//     const direct = localStorage.getItem(TOKEN_KEY)
//     if (direct) return direct

//     const raw =
//       localStorage.getItem(AUTH_STORAGE_KEY) ||
//       sessionStorage.getItem(AUTH_STORAGE_KEY)
//     if (!raw) return null

//     const parsed = JSON.parse(raw)
//     return parsed?.token || null
//   } catch {
//     return null
//   }
// }

// function clearStoredAuth() {
//   localStorage.removeItem(TOKEN_KEY)
//   localStorage.removeItem(AUTH_STORAGE_KEY)
//   sessionStorage.removeItem(AUTH_STORAGE_KEY)
// }

// export default api


// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
// const REQUEST_TIMEOUT = 15000;
// const TOKEN_KEY = "petaland_admin_token";

// const api = axios.create({
//   baseURL: BASE_URL,
//   timeout: REQUEST_TIMEOUT,
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem(TOKEN_KEY);

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response) {
//       const { status, data } = error.response;

//       const message =
//         data?.message || data?.error || "Something went wrong. Please try again.";

//       if (status === 401) {
//         localStorage.removeItem(TOKEN_KEY);
//       }

//       return Promise.reject({ status, message, data });
//     }

//     if (error.request) {
//       return Promise.reject({
//         status: null,
//         message: "Unable to reach the server. Please check your connection.",
//         data: null,
//       });
//     }

//     return Promise.reject({
//       status: null,
//       message: error.message || "An unexpected error occurred.",
//       data: null,
//     });
//   }
// );

// export { TOKEN_KEY };
// export default api;

import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const REQUEST_TIMEOUT = 15000;
const TOKEN_KEY = "petaland_admin_token";

const api = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
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
        localStorage.removeItem(TOKEN_KEY);
      }

      return Promise.reject({ status, message, data });
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

export { TOKEN_KEY };
export default api;