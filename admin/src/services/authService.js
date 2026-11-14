// import api from './api.js'

// /**
//  * Auth Service
//  * Handles Admin authentication and profile management.
//  */

// const TOKEN_KEY = 'petaland_admin_token'

// export async function login(email, password) {
//   try {
//     const response = await api.post('/auth/login', { email, password })
//     const data = response.data

//     if (data?.token) {
//       setToken(data.token)
//     }

//     return data
//   } catch (error) {
//     throw normalizeError(error, 'Invalid email or password')
//   }
// }

// export async function logout() {
//   try {
//     await api.post('/auth/logout')
//   } catch (error) {
//     // Non-blocking: clear token regardless of API response
//   } finally {
//     removeToken()
//   }
// }

// export async function getProfile() {
//   try {
//     const response = await api.get('/auth/profile')
//     return response.data
//   } catch (error) {
//     throw normalizeError(error, 'Failed to fetch profile')
//   }
// }

// export async function updateProfile(formData) {
//   try {
//     const response = await api.put('/auth/profile', formData, {
//       headers: { 'Content-Type': 'multipart/form-data' },
//     })
//     return response.data
//   } catch (error) {
//     throw normalizeError(error, 'Failed to update profile')
//   }
// }

// export async function refreshToken() {
//   try {
//     const response = await api.post('/auth/refresh-token')
//     const data = response.data

//     if (data?.token) {
//       setToken(data.token)
//     }

//     return data
//   } catch (error) {
//     throw normalizeError(error, 'Failed to refresh session')
//   }
// }

// export function setToken(token) {
//   localStorage.setItem(TOKEN_KEY, token)
// }

// export function getToken() {
//   return localStorage.getItem(TOKEN_KEY)
// }

// export function removeToken() {
//   localStorage.removeItem(TOKEN_KEY)
// }

// function normalizeError(error, fallbackMessage) {
//   const message =
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     fallbackMessage
//   const normalized = new Error(message)
//   normalized.status = error?.response?.status
//   return normalized
// }


import api from "./api.js";

export const loginAdmin = async (email, password) => {
  const response = await api.post("/auth/login", { email, password });
  return response.data;
};

export const logoutAdmin = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const fetchAdminProfile = async () => {
  const response = await api.get("/auth/profile");
  return response.data;
};

export const getProfile = fetchAdminProfile;

export const updateProfile = async (formData) => {
  const response = await api.put("/auth/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export default {
  loginAdmin,
  logoutAdmin,
  fetchAdminProfile,
  getProfile,
  updateProfile,
};