// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from '../context/AuthContext.jsx'
// import ProtectedRoute from '../components/ProtectedRoute.jsx'

// import Login from '../pages/Login.jsx'
// import Dashboard from '../pages/Dashboard.jsx'
// import UploadDesign from '../pages/UploadDesign.jsx'
// import ManageDesigns from '../pages/ManageDesigns.jsx'
// import BannerUpload from '../pages/BannerUpload.jsx'
// import Profile from '../pages/Profile.jsx'
// import Settings from '../pages/Settings.jsx'

// function AppRoutes() {
//   return (
//     <AuthProvider>
//       <Routes>
//         <Route path="/login" element={<Login />} />

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/upload-design"
//           element={
//             <ProtectedRoute>
//               <UploadDesign />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/manage-designs"
//           element={
//             <ProtectedRoute>
//               <ManageDesigns />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/banner-upload"
//           element={
//             <ProtectedRoute>
//               <BannerUpload />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/profile"
//           element={
//             <ProtectedRoute>
//               <Profile />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/settings"
//           element={
//             <ProtectedRoute>
//               <Settings />
//             </ProtectedRoute>
//           }
//         />

//         <Route path="/" element={<Navigate to="/dashboard" replace />} />
//         <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       </Routes>
//     </AuthProvider>
//   )
// }

// export default AppRoutes


import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext.jsx'
import ProtectedRoute from '../components/common/ProtectedRoute.jsx'

import Login from '../pages/Login/Login.jsx'
import Dashboard from '../pages/Dashboard/Dashboard.jsx'
import UploadDesign from '../pages/UploadDesign/UploadDesign.jsx'
import ManageDesigns from '../pages/ManageDesigns/ManageDesigns.jsx'
import BannerUpload from '../pages/BannerUpload/BannerUpload.jsx'
import Profile from '../pages/Profile/Profile.jsx'
import Settings from '../pages/Settings/Settings.jsx'

function AppRoutes() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/upload-design"
          element={
            <ProtectedRoute>
              <UploadDesign />
            </ProtectedRoute>
          }
        />

        <Route
          path="/manage-designs"
          element={
            <ProtectedRoute>
              <ManageDesigns />
            </ProtectedRoute>
          }
        />

        <Route
          path="/banner-upload"
          element={
            <ProtectedRoute>
              <BannerUpload />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* 404 Redirect */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default AppRoutes