// import React, { useState } from 'react'
// import Header from '../components/header/Header.jsx'
// import Sidebar from '../components/sidebar/Sidebar.jsx'

// function AdminLayout({ children }) {
//   const [collapsed, setCollapsed] = useState(false)
//   const [mobileOpen, setMobileOpen] = useState(false)

//   const toggleSidebar = () => {
//     if (window.innerWidth < 1024) {
//       setMobileOpen((prev) => !prev)
//     } else {
//       setCollapsed((prev) => !prev)
//     }
//   }

//   return (
//     <div className="admin-bg min-h-screen w-full flex">
//       <Sidebar
//         collapsed={collapsed}
//         mobileOpen={mobileOpen}
//         onCloseMobile={() => setMobileOpen(false)}
//       />

//       <div className="flex-1 min-w-0 flex flex-col">
//         <Header onToggleSidebar={toggleSidebar} />
//         <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
//           {children}
//         </main>
//       </div>
//     </div>
//   )
// }

// export default AdminLayout

import React, { useState, useEffect } from 'react'
import Header from '../components/header/Header.jsx'
import Sidebar from '../components/sidebar/Sidebar.jsx'

function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileOpen((prev) => !prev)
    } else {
      setCollapsed((prev) => !prev)
    }
  }

  const closeMobileSidebar = () => setMobileOpen(false)

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024 && mobileOpen) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [mobileOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <div className="admin-bg min-h-screen w-full flex">
      <Sidebar
        collapsed={collapsed}
        mobileOpen={mobileOpen}
        onCloseMobile={closeMobileSidebar}
      />

      <div className="flex-1 min-w-0 flex flex-col">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 sm:py-8 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AdminLayout