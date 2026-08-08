// import React, { useState } from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { motion } from 'framer-motion'
// import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
// import AuthLayout from '../../layouts/AuthLayout.jsx'
// import { useAuth } from '../../hooks/useAuth.js'
// import petalandLogo from '../../assets/logo/logo.jpeg'

// function Login() {
//   const { login } = useAuth()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const [formData, setFormData] = useState({ email: '', password: '' })
//   const [showPassword, setShowPassword] = useState(false)
//   const [rememberMe, setRememberMe] = useState(true)
//   const [errors, setErrors] = useState({})
//   const [isLoading, setIsLoading] = useState(false)
//   const [serverError, setServerError] = useState('')

//   const redirectTo = location.state?.from?.pathname || '/dashboard'

//   const validate = () => {
//     const newErrors = {}
//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required'
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
//       newErrors.email = 'Enter a valid email address'
//     }
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     } else if (formData.password.length < 6) {
//       newErrors.password = 'Password must be at least 6 characters'
//     }
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//     setErrors((prev) => ({ ...prev, [name]: '' }))
//     setServerError('')
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setServerError('')

//     if (!validate()) return

//     setIsLoading(true)
//     try {
//       await login(formData.email, formData.password, rememberMe)
//       navigate(redirectTo, { replace: true })
//     } catch (err) {
//       setServerError(
//         err?.response?.data?.message || err?.message || 'Invalid email or password'
//       )
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <AuthLayout>
//       <motion.div
//         initial={{ opacity: 0, y: 24 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
//         className="glass-panel mx-auto w-full max-w-[420px] p-6 sm:p-8 md:p-10"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.5, delay: 0.1 }}
//           className="mb-8 flex flex-col items-center text-center"
//         >
//           <div className="mb-4 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-[#c9a24b]/20 bg-[#f5ead9]/8 p-2 shadow-[0_0_24px_rgba(201,162,75,0.18)] sm:h-28 sm:w-28">
//             <img
//               src={petalandLogo}
//               alt="PETALAND PATTERNART"
//               className="h-full w-full object-contain"
//             />
//           </div>
//           <h1 className="heading-luxury text-center text-2xl font-semibold sm:text-3xl">
//             Petaland PatternArt
//           </h1>
//           <p className="text-muted-luxury text-sm mt-1 tracking-wide uppercase">
//             Admin Panel
//           </p>
//         </motion.div>

//         {serverError && (
//           <motion.div
//             initial={{ opacity: 0, y: -8 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
//           >
//             {serverError}
//           </motion.div>
//         )}

//         <form onSubmit={handleSubmit} noValidate className="space-y-5">
//           <div>
//             <label htmlFor="email" className="block text-sm text-muted-luxury mb-2">
//               Email Address
//             </label>
//             <div className="relative">
//               <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 placeholder="admin@petaland.com"
//                 className={`input-luxury w-full pl-10 pr-4 ${
//                   errors.email ? 'border-red-500/60' : ''
//                 }`}
//               />
//             </div>
//             {errors.email && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
//             )}
//           </div>

//           <div>
//             <label htmlFor="password" className="block text-sm text-muted-luxury mb-2">
//               Password
//             </label>
//             <div className="relative">
//               <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#c9a24b]" />
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete="current-password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 placeholder="••••••••"
//                 className={`input-luxury w-full pl-10 pr-11 ${
//                   errors.password ? 'border-red-500/60' : ''
//                 }`}
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword((prev) => !prev)}
//                 className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#c9a24b]/80 hover:text-[#c9a24b] transition"
//                 tabIndex={-1}
//               >
//                 {showPassword ? (
//                   <EyeOff className="w-4 h-4" />
//                 ) : (
//                   <Eye className="w-4 h-4" />
//                 )}
//               </button>
//             </div>
//             {errors.password && (
//               <p className="text-xs text-red-400 mt-1.5">{errors.password}</p>
//             )}
//           </div>

//           <div className="flex items-center justify-between text-sm">
//             <label className="flex items-center gap-2 cursor-pointer text-muted-luxury select-none">
//               <input
//                 type="checkbox"
//                 checked={rememberMe}
//                 onChange={(e) => setRememberMe(e.target.checked)}
//                 className="w-4 h-4 rounded border-[#c9a24b]/40 accent-[#c9a24b] cursor-pointer"
//               />
//               Remember Me
//             </label>
//           </div>

//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             type="submit"
//             disabled={isLoading}
//             className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Signing in...
//               </>
//             ) : (
//               'Login'
//             )}
//           </motion.button>
//         </form>

//         <p className="text-center text-xs text-muted-luxury mt-8">
//           &copy; {new Date().getFullYear()} Petaland PatternArt. All rights reserved.
//         </p>
//       </motion.div>
//     </AuthLayout>
//   )
// }

// export default Login


// updated code 

import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import AuthLayout from '../../layouts/AuthLayout.jsx'
import { useAuth } from '../../hooks/useAuth.js'
import petalandLogo from '../../assets/logo/logo.jpeg'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [serverError, setServerError] = useState('')

  const redirectTo = location.state?.from?.pathname || '/dashboard'

  const validate = () => {
    const newErrors = {}
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email address'
    }
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    setErrors((prev) => ({ ...prev, [name]: '' }))
    setServerError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    if (!validate()) return

    setIsLoading(true)
    try {
      await login(formData.email, formData.password, rememberMe)
      navigate(redirectTo, { replace: true })
    } catch (err) {
      setServerError(
        err?.response?.data?.message || err?.message || 'Invalid email or password'
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        className="glass-panel mx-auto w-full max-w-[420px] p-6 sm:p-8 md:p-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <div className="admin-logo-circle mb-4">
            <img src={petalandLogo} alt="PETALAND PATTERNART" />
          </div>
          <h1 className="heading-luxury text-center text-2xl font-semibold sm:text-3xl">
            Petaland PatternArt
          </h1>
          <p className="text-muted-luxury text-sm mt-1 tracking-wide uppercase">
            Admin Panel
          </p>
        </motion.div>

        {serverError && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
          >
            {serverError}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm text-muted-luxury mb-2">
              Email Address
            </label>
            <div className="input-icon-field">
              <span className="field-icon">
                <Mail className="w-4 h-4" />
              </span>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@petaland.com"
                className={`input-luxury ${errors.email ? 'border-red-500/60' : ''}`}
              />
            </div>
            {errors.email && (
              <p className="text-xs text-red-400 mt-1.5">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm text-muted-luxury mb-2">
              Password
            </label>
            <div className="input-icon-field">
              <span className="field-icon">
                <Lock className="w-4 h-4" />
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`input-luxury ${errors.password ? 'border-red-500/60' : ''}`}
                style={{ paddingRight: '2.75rem' }}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="toggle-icon text-[#c9a24b]/80 hover:text-[#c9a24b] transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-red-400 mt-1.5">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer text-muted-luxury select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#c9a24b]/40 accent-[#c9a24b] cursor-pointer"
              />
              Remember Me
            </label>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
            className="btn-gold w-full flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </>
            ) : (
              'Login'
            )}
          </motion.button>
        </form>

        <p className="text-center text-xs text-muted-luxury mt-8">
          &copy; {new Date().getFullYear()} Petaland PatternArt. All rights reserved.
        </p>
      </motion.div>
    </AuthLayout>
  )
}

export default Login