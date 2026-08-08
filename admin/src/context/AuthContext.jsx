// import React, { createContext, useState, useEffect, useCallback } from 'react'
// import * as authService from '../services/authService.js'

// export const AuthContext = createContext(null)

// const STORAGE_KEY = 'petaland_admin_auth'

// function readStoredAuth() {
//   try {
//     const local = localStorage.getItem(STORAGE_KEY)
//     const session = sessionStorage.getItem(STORAGE_KEY)
//     const raw = local || session
//     if (!raw) return null
//     return JSON.parse(raw)
//   } catch {
//     return null
//   }
// }

// function persistAuth(data, rememberMe) {
//   const payload = JSON.stringify(data)
//   if (rememberMe) {
//     localStorage.setItem(STORAGE_KEY, payload)
//     sessionStorage.removeItem(STORAGE_KEY)
//   } else {
//     sessionStorage.setItem(STORAGE_KEY, payload)
//     localStorage.removeItem(STORAGE_KEY)
//   }
// }

// function clearStoredAuth() {
//   localStorage.removeItem(STORAGE_KEY)
//   sessionStorage.removeItem(STORAGE_KEY)
// }

// export function AuthProvider({ children }) {
//   const [admin, setAdmin] = useState(null)
//   const [token, setToken] = useState(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const stored = readStoredAuth()
//     if (stored?.token) {
//       setAdmin(stored.admin || null)
//       setToken(stored.token)
//     }
//     setLoading(false)
//   }, [])

//   const login = useCallback(async (email, password, rememberMe = true) => {
//     setLoading(true)
//     try {
//       const response = await authService.login(email, password)
//       const authData = {
//         admin: response.admin,
//         token: response.token,
//       }
//       setAdmin(authData.admin)
//       setToken(authData.token)
//       persistAuth(authData, rememberMe)
//       return authData
//     } finally {
//       setLoading(false)
//     }
//   }, [])

//   const logout = useCallback(() => {
//     setAdmin(null)
//     setToken(null)
//     clearStoredAuth()
//   }, [])

//   const value = {
//     admin,
//     token,
//     isAuthenticated: Boolean(token),
//     loading,
//     login,
//     logout,
//   }

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
// }

import { createContext, useCallback, useEffect, useState } from "react";
import { loginAdmin, logoutAdmin, fetchAdminProfile } from "../services/authService.js";
import { TOKEN_KEY } from "../services/api.js";

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const token = localStorage.getItem(TOKEN_KEY);

      if (!token) {
        if (isMounted) setLoading(false);
        return;
      }

      try {
        const response = await fetchAdminProfile();
        const profile = response?.data || response;

        if (isMounted) {
          setAdmin(profile);
          setIsAuthenticated(true);
        }
      } catch (error) {
        localStorage.removeItem(TOKEN_KEY);
        if (isMounted) {
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const login = useCallback(async (email, password) => {
    const response = await loginAdmin(email, password);
    const { token, admin: adminData } = response?.data || {};

    if (!token || !adminData) {
      throw new Error("Invalid response from server");
    }

    localStorage.setItem(TOKEN_KEY, token);
    setAdmin(adminData);
    setIsAuthenticated(true);

    return adminData;
  }, []);

  const logout = useCallback(async () => {
    try {
      await logoutAdmin();
    } catch (error) {
      // ignore network errors on logout, clear local session regardless
    } finally {
      localStorage.removeItem(TOKEN_KEY);
      setAdmin(null);
      setIsAuthenticated(false);
    }
  }, []);

  const value = {
    admin,
    isAuthenticated,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;