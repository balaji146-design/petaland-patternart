// import React, { useState, useRef, useEffect } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Menu, User, LogOut, ChevronDown, Settings as SettingsIcon } from 'lucide-react'
// import petalandLogo from '../../assets/logo/logo.jpeg'
// import { useAuth } from '../../hooks/useAuth.js'

// function Header({ onToggleSidebar }) {
//   const { admin, logout } = useAuth()
//   const navigate = useNavigate()
//   const [menuOpen, setMenuOpen] = useState(false)
//   const menuRef = useRef(null)

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleLogout = () => {
//     logout()
//     navigate('/login', { replace: true })
//   }

//   const adminName = admin?.name || 'Admin'
//   const adminEmail = admin?.email || 'admin@petaland.com'
//   const initials = adminName
//     .split(' ')
//     .map((w) => w[0])
//     .join('')
//     .slice(0, 2)
//     .toUpperCase()

//   return (
//     <header className="glass-panel sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3.5 rounded-none border-x-0 border-t-0">
//       <div className="flex items-center gap-3">
//         <button
//           onClick={onToggleSidebar}
//           className="p-2 rounded-lg hover:bg-[#c9a24b]/10 text-[#c9a24b] transition lg:hidden"
//           aria-label="Toggle sidebar"
//         >
//           <Menu className="w-5 h-5" />
//         </button>

//         <Link to="/dashboard" className="flex items-center gap-2.5">
//           <div className="w-9 h-9 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_14px_rgba(201,162,75,0.35)]">
//             <img src={petalandLogo} alt="Petaland" className="w-full h-full object-cover" />
//           </div>
//           <div className="hidden sm:block leading-tight">
//             <p className="heading-luxury text-sm font-semibold">Petaland</p>
//             <p className="text-[10px] tracking-widest uppercase text-muted-luxury">
//               PatternArt
//             </p>
//           </div>
//         </Link>
//       </div>

//       <div className="relative" ref={menuRef}>
//         <button
//           onClick={() => setMenuOpen((prev) => !prev)}
//           className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-full hover:bg-[#c9a24b]/10 transition"
//         >
//           <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#3e2b23] border border-[#c9a24b]/40 flex items-center justify-center">
//             <span className="text-xs font-semibold text-[#e0bb63]">{initials}</span>
//           </div>
//           <span className="hidden sm:block text-sm text-[#f5ead9]">{adminName}</span>
//           <ChevronDown
//             className={`w-4 h-4 text-muted-luxury transition-transform ${
//               menuOpen ? 'rotate-180' : ''
//             }`}
//           />
//         </button>

//         <AnimatePresence>
//           {menuOpen && (
//             <motion.div
//               initial={{ opacity: 0, y: -8, scale: 0.96 }}
//               animate={{ opacity: 1, y: 0, scale: 1 }}
//               exit={{ opacity: 0, y: -8, scale: 0.96 }}
//               transition={{ duration: 0.18 }}
//               className="glass-panel absolute right-0 mt-2 w-56 py-2 overflow-hidden"
//             >
//               <div className="px-4 py-2.5 border-b border-[#c9a24b]/15">
//                 <p className="text-sm font-medium text-[#f5ead9] truncate">{adminName}</p>
//                 <p className="text-xs text-muted-luxury truncate">{adminEmail}</p>
//               </div>

//               <Link
//                 to="/profile"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#e8d9bd] hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
//               >
//                 <User className="w-4 h-4" />
//                 Profile
//               </Link>

//               <Link
//                 to="/settings"
//                 onClick={() => setMenuOpen(false)}
//                 className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#e8d9bd] hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
//               >
//                 <SettingsIcon className="w-4 h-4" />
//                 Settings
//               </Link>

//               <button
//                 onClick={handleLogout}
//                 className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/10 transition"
//               >
//                 <LogOut className="w-4 h-4" />
//                 Logout
//               </button>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </header>
//   )
// }

// export default Header

import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, User, LogOut, ChevronDown, Settings as SettingsIcon } from 'lucide-react'
import petalandLogo from '../../assets/logo/logo.jpeg'
import { useAuth } from '../../hooks/useAuth.js'

function Header({ onToggleSidebar }) {
  const { admin, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  const adminName = admin?.name || 'Admin'
  const adminEmail = admin?.email || 'admin@petaland.com'
  const initials = adminName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <header className="glass-panel sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 py-3.5 rounded-none border-x-0 border-t-0">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-[#c9a24b]/10 text-[#c9a24b] transition lg:hidden flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <Link to="/dashboard" className="flex items-center gap-2.5 min-w-0">
          <div className="w-9 h-9 flex-shrink-0 rounded-full overflow-hidden flex items-center justify-center shadow-[0_0_14px_rgba(201,162,75,0.35)]">
            <img src={petalandLogo} alt="Petaland" className="w-full h-full object-cover" />
          </div>
          <div className="hidden sm:block leading-tight min-w-0">
            <p className="heading-luxury text-sm font-semibold truncate">Petaland</p>
            <p className="text-[10px] tracking-widest uppercase text-muted-luxury truncate">
              PatternArt
            </p>
          </div>
        </Link>
      </div>

      <div className="relative flex-shrink-0" ref={menuRef}>
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 sm:gap-2.5 pl-2 pr-2 sm:pr-3 py-1.5 rounded-full hover:bg-[#c9a24b]/10 transition"
        >
          <div className="w-8 h-8 flex-shrink-0 rounded-full bg-gradient-to-br from-[#5c3a21] to-[#3e2b23] border border-[#c9a24b]/40 flex items-center justify-center">
            <span className="text-xs font-semibold text-[#e0bb63]">{initials}</span>
          </div>
          <span className="hidden sm:block text-sm text-[#f5ead9] max-w-[120px] truncate">
            {adminName}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-muted-luxury transition-transform flex-shrink-0 ${
              menuOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="glass-panel absolute right-0 mt-2 w-[min(14rem,calc(100vw-2rem))] py-2 overflow-hidden"
            >
              <div className="px-4 py-2.5 border-b border-[#c9a24b]/15">
                <p className="text-sm font-medium text-[#f5ead9] truncate">{adminName}</p>
                <p className="text-xs text-muted-luxury truncate">{adminEmail}</p>
              </div>

              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#e8d9bd] hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
              >
                <User className="w-4 h-4 flex-shrink-0" />
                Profile
              </Link>

              <Link
                to="/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-[#e8d9bd] hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition"
              >
                <SettingsIcon className="w-4 h-4 flex-shrink-0" />
                Settings
              </Link>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-300 hover:bg-red-500/10 transition"
              >
                <LogOut className="w-4 h-4 flex-shrink-0" />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

export default Header