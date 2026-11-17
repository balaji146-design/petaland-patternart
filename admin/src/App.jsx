// import React from 'react'
// import AppRoutes from './routes/AppRoutes.jsx'

// function App() {
//   return (
//     <div className="min-h-screen bg-[#1a1410] text-[#f5ead9] font-sans antialiased selection:bg-[#c9a24b] selection:text-[#1a1410]">
//       <AppRoutes />
//     </div>
//   )
// }

// export default App

import React, { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import AppRoutes from './routes/AppRoutes.jsx'
import Loader from './components/common/Loader.jsx'

function GlobalFallback() {
  return (
    <div className="admin-bg min-h-screen w-full flex items-center justify-center">
      <Loader label="Loading Petaland PatternArt..." />
    </div>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-white text-black font-sans antialiased selection:bg-pink-200 selection:text-black">
      <Toaster
        position="top-right"
        gutter={12}
        toastOptions={{
          duration: 3500,
          style: {
            background: 'rgba(255, 255, 255, 0.98)',
            color: '#171717',
            border: '1px solid rgba(200, 95, 131, 0.2)',
            borderRadius: '12px',
            fontSize: '14px',
            backdropFilter: 'blur(12px)',
          },
          success: {
            iconTheme: {
              primary: '#c85f83',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />

      <Suspense fallback={<GlobalFallback />}>
        <AppRoutes />
      </Suspense>
    </div>
  )
}

export default App