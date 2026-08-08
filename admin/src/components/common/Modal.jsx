// import React from 'react'
// import { motion } from 'framer-motion'
// import { Loader2 } from 'lucide-react'

// const variantClasses = {
//   primary:
//     'bg-gradient-to-r from-[#c9a24b] to-[#e0bb63] text-[#1a1410] shadow-[0_4px_14px_rgba(201,162,75,0.35)] hover:shadow-[0_8px_22px_rgba(201,162,75,0.5)]',
//   secondary:
//     'bg-[#3e2b23] text-[#f5ead9] border border-[#c9a24b]/25 hover:bg-[#4a3329]',
//   success:
//     'bg-gradient-to-r from-emerald-600 to-emerald-500 text-white shadow-[0_4px_14px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_22px_rgba(16,185,129,0.4)]',
//   danger:
//     'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-[0_4px_14px_rgba(220,38,38,0.3)] hover:shadow-[0_8px_22px_rgba(220,38,38,0.4)]',
//   outline:
//     'bg-transparent text-[#e0bb63] border border-[#c9a24b]/50 hover:bg-[#c9a24b]/10',
// }

// const sizeClasses = {
//   sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-lg',
//   md: 'text-sm px-4 py-2.5 gap-2 rounded-xl',
//   lg: 'text-base px-6 py-3.5 gap-2.5 rounded-xl',
// }

// function Button({
//   children,
//   variant = 'primary',
//   size = 'md',
//   icon: Icon,
//   iconPosition = 'left',
//   loading = false,
//   disabled = false,
//   fullWidth = false,
//   type = 'button',
//   onClick,
//   className = '',
//   ...rest
// }) {
//   const isDisabled = disabled || loading

//   return (
//     <motion.button
//       type={type}
//       onClick={onClick}
//       disabled={isDisabled}
//       whileHover={!isDisabled ? { scale: 1.02 } : {}}
//       whileTap={!isDisabled ? { scale: 0.97 } : {}}
//       className={`
//         inline-flex items-center justify-center font-medium
//         transition-all duration-300 ease-out
//         disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none
//         ${variantClasses[variant] || variantClasses.primary}
//         ${sizeClasses[size] || sizeClasses.md}
//         ${fullWidth ? 'w-full' : ''}
//         ${className}
//       `}
//       {...rest}
//     >
//       {loading ? (
//         <>
//           <Loader2 className="w-4 h-4 animate-spin" />
//           <span>Please wait...</span>
//         </>
//       ) : (
//         <>
//           {Icon && iconPosition === 'left' && <Icon className="w-4 h-4" />}
//           <span>{children}</span>
//           {Icon && iconPosition === 'right' && <Icon className="w-4 h-4" />}
//         </>
//       )}
//     </motion.button>
//   )
// }

// export default Button


import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { X } from 'lucide-react'

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
}

function Modal({ isOpen, onClose, title, size = 'md', footer, children }) {
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (typeof document === 'undefined') return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <motion.div
            key="modal-content"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className={`glass-panel w-full ${sizeClasses[size] || sizeClasses.md} max-h-[90vh] flex flex-col overflow-hidden`}
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-4 border-b border-[#c9a24b]/15 flex-shrink-0">
              <h3 className="heading-luxury text-lg font-semibold pr-4 truncate">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="p-1.5 rounded-lg text-muted-luxury hover:bg-[#c9a24b]/10 hover:text-[#e0bb63] transition flex-shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="px-5 sm:px-6 py-5 overflow-y-auto">
              {children}
            </div>

            {footer && (
              <div className="flex items-center justify-end gap-3 px-5 sm:px-6 py-4 border-t border-[#c9a24b]/15 flex-shrink-0">
                {footer}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

export default Modal