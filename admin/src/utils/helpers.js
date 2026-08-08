// /**
//  * Reusable Helper Functions — Petaland PatternArt Admin
//  */

// export function formatCurrency(amount, currency = 'INR') {
//   const value = Number(amount)
//   if (Number.isNaN(value)) return ''

//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency,
//     maximumFractionDigits: 0,
//   }).format(value)
// }

// export function validateImage(file, options = {}) {
//   const {
//     maxSizeMB = 5,
//     allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
//   } = options

//   if (!file) {
//     return { valid: false, message: 'Please select an image' }
//   }

//   if (!allowedTypes.includes(file.type)) {
//     return {
//       valid: false,
//       message: 'Only JPG, PNG, or WEBP images are allowed',
//     }
//   }

//   const maxSizeBytes = maxSizeMB * 1024 * 1024
//   if (file.size > maxSizeBytes) {
//     return {
//       valid: false,
//       message: `Image must be smaller than ${maxSizeMB}MB`,
//     }
//   }

//   return { valid: true, message: '' }
// }

// export function generateSlug(text = '') {
//   return text
//     .toString()
//     .trim()
//     .toLowerCase()
//     .replace(/[^\w\s-]/g, '')
//     .replace(/\s+/g, '-')
//     .replace(/-+/g, '-')
// }

// export function formatDate(date, options = {}) {
//   if (!date) return ''
//   const d = new Date(date)
//   if (Number.isNaN(d.getTime())) return ''

//   const {
//     day = '2-digit',
//     month = 'short',
//     year = 'numeric',
//   } = options

//   return new Intl.DateTimeFormat('en-IN', { day, month, year }).format(d)
// }

// export function truncateText(text = '', maxLength = 60) {
//   if (!text) return ''
//   if (text.length <= maxLength) return text
//   return `${text.slice(0, maxLength).trim()}...`
// }

// export function fileToPreviewUrl(file) {
//   if (!file) return null
//   return URL.createObjectURL(file)
// }

// export function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }

/**
 * Reusable Helper Functions — Petaland PatternArt Admin
 */

export function formatCurrency(amount, currency = 'INR') {
  const value = Number(amount)
  if (Number.isNaN(value)) return ''

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)
}

export function formatDate(date, options = {}) {
  if (!date) return ''
  const d = new Date(date)
  if (Number.isNaN(d.getTime())) return ''

  const {
    day = '2-digit',
    month = 'short',
    year = 'numeric',
  } = options

  return new Intl.DateTimeFormat('en-IN', { day, month, year }).format(d)
}

export function generateSlug(text = '') {
  return text
    .toString()
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function truncateText(text = '', maxLength = 60) {
  if (!text) return ''
  if (text.length <= maxLength) return text
  return `${text.slice(0, maxLength).trim()}...`
}

export function validateImage(file, options = {}) {
  const {
    maxSizeMB = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'],
  } = options

  if (!file) {
    return { valid: false, message: 'Please select an image' }
  }

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      message: 'Only JPG, PNG, or WEBP images are allowed',
    }
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024
  if (file.size > maxSizeBytes) {
    return {
      valid: false,
      message: `Image must be smaller than ${maxSizeMB}MB`,
    }
  }

  return { valid: true, message: '' }
}

export function formatPhone(phone = '') {
  const digits = phone.toString().replace(/\D/g, '')

  if (digits.length === 10) {
    return `${digits.slice(0, 5)} ${digits.slice(5)}`
  }

  if (digits.length === 12 && digits.startsWith('91')) {
    const local = digits.slice(2)
    return `+91 ${local.slice(0, 5)} ${local.slice(5)}`
  }

  return phone
}

export function fileToPreviewUrl(file) {
  if (!file) return null
  return URL.createObjectURL(file)
}

export function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}