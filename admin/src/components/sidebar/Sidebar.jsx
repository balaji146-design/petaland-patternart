// import React from 'react'
// import { NavLink } from 'react-router-dom'
// import {
//   LayoutDashboard,
//   UploadCloud,
//   Images,
//   GalleryHorizontal,
//   UserCircle,
//   Settings,
//   X,
// } from 'lucide-react'

// const navItems = [
//   { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
//   { label: 'Upload Design', path: '/upload-design', icon: UploadCloud },
//   { label: 'Manage Designs', path: '/manage-designs', icon: Images },
//   { label: 'Banner Upload', path: '/banner-upload', icon: GalleryHorizontal },
//   { label: 'Profile', path: '/profile', icon: UserCircle },
//   { label: 'Settings', path: '/settings', icon: Settings },
// ]

// function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
//   return (
//     <>
//       {mobileOpen && (
//         <div
//           onClick={onCloseMobile}
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//         />
//       )}

//       <aside
//         className={`admin-sidebar fixed lg:sticky top-0 left-0 h-screen z-50 flex flex-col transition-all duration-300 ease-in-out
//           ${collapsed ? 'lg:w-20' : 'lg:w-64'}
//           ${mobileOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0 w-64'}
//         `}
//       >
//         <div className="flex items-center justify-between px-5 py-5 border-b border-[#c9a24b]/15">
//           <div className="flex items-center gap-2.5 overflow-hidden">
//             <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-[#c9a24b] to-[#e0bb63] flex items-center justify-center shadow-[0_0_14px_rgba(201,162,75,0.35)]">
//               <span className="heading-luxury text-sm font-bold text-[#1a1410]">P</span>
//             </div>
//             {!collapsed && (
//               <div className="leading-tight whitespace-nowrap">
//                 <p className="heading-luxury text-sm font-semibold">Petaland</p>
//                 <p className="text-[10px] tracking-widest uppercase text-muted-luxury">
//                   PatternArt
//                 </p>
//               </div>
//             )}
//           </div>

//           <button
//             onClick={onCloseMobile}
//             className="lg:hidden p-1.5 rounded-lg hover:bg-[#c9a24b]/10 text-[#c9a24b] transition"
//             aria-label="Close sidebar"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         <nav className="flex-1 overflow-y-auto px-3 py-5 space-y-1.5">
//           {navItems.map(({ label, path, icon: Icon }) => (
//             <NavLink
//               key={path}
//               to={path}
//               onClick={onCloseMobile}
//               className={({ isActive }) =>
//                 `sidebar-link ${isActive ? 'active' : ''} ${
//                   collapsed ? 'lg:justify-center' : ''
//                 }`
//               }
//               title={collapsed ? label : undefined}
//             >
//               <Icon className="w-[18px] h-[18px] flex-shrink-0" />
//               {!collapsed && <span className="whitespace-nowrap">{label}</span>}
//             </NavLink>
//           ))}
//         </nav>

//         {!collapsed && (
//           <div className="px-5 py-4 border-t border-[#c9a24b]/15">
//             <p className="text-[11px] text-muted-luxury text-center leading-relaxed">
//               &copy; {new Date().getFullYear()} Petaland PatternArt
//             </p>
//           </div>
//         )}
//       </aside>
//     </>
//   )
// }

// export default Sidebar


import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  UploadCloud,
  Images,
  GalleryHorizontal,
  UserCircle,
  Settings,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Upload Design', path: '/upload-design', icon: UploadCloud },
  { label: 'Manage Designs', path: '/manage-designs', icon: Images },
  { label: 'Banner Upload', path: '/banner-upload', icon: GalleryHorizontal },
  { label: 'Profile', path: '/profile', icon: UserCircle },
  { label: 'Settings', path: '/settings', icon: Settings },
]

function Sidebar({ collapsed, mobileOpen, onCloseMobile }) {
  useEffect(() => {
    if (!mobileOpen) return

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onCloseMobile?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [mobileOpen, onCloseMobile])

  return (
    <>
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      <aside
        aria-label="Admin navigation"
        className={`admin-sidebar fixed lg:sticky top-0 bottom-0 left-0 h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out
          w-64 max-w-[85vw] lg:max-w-none
          ${collapsed ? 'lg:w-20' : 'lg:w-64'}
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#c9a24b]/15 flex-shrink-0">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-9 h-9 flex-shrink-0 rounded-full bg-gradient-to-br from-[#c9a24b] to-[#e0bb63] flex items-center justify-center shadow-[0_0_14px_rgba(201,162,75,0.35)]">
              <span className="heading-luxury text-sm font-bold text-[#1a1410]">P</span>
            </div>
            {!collapsed && (
              <div className="leading-tight whitespace-nowrap">
                <p className="heading-luxury text-sm font-semibold">Petaland</p>
                <p className="text-[10px] tracking-widest uppercase text-muted-luxury">
                  PatternArt
                </p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-lg text-[#c9a24b] transition hover:bg-[#c9a24b]/10 focus:outline-none focus:ring-2 focus:ring-[#c9a24b]/60 lg:hidden flex-shrink-0"
            aria-label="Close sidebar"
            title="Close navigation menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-5 space-y-1.5">
          {navItems.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onCloseMobile}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''} ${
                  collapsed ? 'lg:justify-center' : ''
                }`
              }
              title={collapsed ? label : undefined}
            >
              <Icon className="w-[18px] h-[18px] flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <div className="px-5 py-4 border-t border-[#c9a24b]/15 flex-shrink-0">
            <p className="text-[11px] text-muted-luxury text-center leading-relaxed">
              &copy; {new Date().getFullYear()} Petaland PatternArt
            </p>
          </div>
        )}
      </aside>
    </>
  )
}

export default Sidebar